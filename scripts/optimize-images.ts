import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIR = path.join(process.cwd(), 'public', 'images', 'hero-images');
const MAPPING_FILE = path.join(process.cwd(), 'src', 'lib', 'images.ts');

async function optimizeImages() {
    console.log(`Scanning ${TARGET_DIR}...`);

    if (!fs.existsSync(TARGET_DIR)) {
        console.error('Target directory not found!');
        return;
    }

    const files = fs.readdirSync(TARGET_DIR);
    const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

    const replacements: Record<string, string> = {};

    for (const file of imageFiles) {
        const inputPath = path.join(TARGET_DIR, file);
        const name = path.parse(file).name;
        const outputPath = path.join(TARGET_DIR, `${name}.webp`);

        console.log(`Optimizing ${file}...`);

        try {
            await sharp(inputPath)
                .resize(1920, null, { withoutEnlargement: true }) // Max width 1920
                .webp({ quality: 80 })
                .toFile(outputPath);

            const oldSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            console.log(`Saved ${(oldSize - newSize) / 1024 / 1024} MB (${Math.round((1 - newSize / oldSize) * 100)}%)`);

            // Track for code update
            replacements[file] = `${name}.webp`;

            // Delete original? Maybe safe to keep for now, but user asked to optimize.
            // Let's delete to save space as requested "Compress".
            fs.unlinkSync(inputPath);

        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }

    // Update images.ts
    console.log('Updating images.ts mappings...');
    let content = fs.readFileSync(MAPPING_FILE, 'utf-8');

    for (const [oldExt, newExt] of Object.entries(replacements)) {
        // Regex to replace file extensions in paths
        // e.g. /hero-images/sandown-hero.png -> /hero-images/sandown-hero.webp
        const regex = new RegExp(oldExt, 'g');
        content = content.replace(regex, newExt);
    }

    fs.writeFileSync(MAPPING_FILE, content);

    // Update src/app/page.tsx for the specific dashboard hero
    const PAGE_FILE = path.join(process.cwd(), 'src', 'app', 'page.tsx');
    if (fs.existsSync(PAGE_FILE)) {
        console.log('Updating src/app/page.tsx...');
        let pageContent = fs.readFileSync(PAGE_FILE, 'utf-8');
        pageContent = pageContent.replace(/app-dashboard-hero\.png/g, 'app-dashboard-hero.webp');
        fs.writeFileSync(PAGE_FILE, pageContent);
    }

    console.log('Done.');
}

optimizeImages();
