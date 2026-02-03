import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { sellerData } from '../src/lib/seller-data'; // Direct import of TS data

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PROJECT_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// NOTE: For seeding, ideally we use SERVICE_ROLE_KEY if RLS blocks us, 
// but since we enabled public read/write or service role write, anon might work if policies allow,
// OR if user disabled RLS. 
// If this fails, we ask user to temporarily disable RLS again or provide service role key.
// UPDATE: The user was asked to run policies allowing "service_role". 
// But we only have anon key in .env.local usually. 
// Let's try with what we have. If it fails, we ask user to disable RLS or assume they did.

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedMarketData() {
    console.log('🌱 Starting Market Data Seed...');

    // 1. Read suburbs.json
    const suburbsJsonPath = path.resolve(process.cwd(), 'data/suburbs.json');
    const suburbsData = JSON.parse(fs.readFileSync(suburbsJsonPath, 'utf-8'));

    console.log(`Found ${suburbsData.suburbs.length} suburbs in JSON.`);

    let successCount = 0;
    let failCount = 0;

    for (const suburb of suburbsData.suburbs) {
        const slug = suburb.slug;
        console.log(`Processing ${slug}...`);

        // 2. Find matching seller report
        const report = sellerData[slug];
        if (!report) {
            console.warn(`⚠️ No seller report found for ${slug} in seller-data.ts`);
        } else {
            console.log(`   + Combined with seller report`);
        }

        // 3. Construct Row
        const row = {
            slug: suburb.slug,
            name: suburb.name,
            city: suburbsData.city || 'Sandton',
            province: suburbsData.province || 'Gauteng',
            centroid: suburb.centroid,
            overview: {
                dataPoints: suburb.dataPoints,
                imagePlan: suburb.imagePlan,
                summary: suburb.summary,
            },
            related_suburbs: suburb.relatedSuburbs,
            seller_report: report || null, // Can be null if missing
            updated_at: new Date().toISOString()
        };

        // 4. Upsert (Insert or Update)
        const { error } = await supabase
            .from('suburbs')
            .upsert(row, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Failed to seed ${slug}:`, error.message);
            failCount++;
        } else {
            console.log(`✅ Seeded ${slug}`);
            successCount++;
        }
    }

    console.log(`\n🎉 Seeding Complete. Success: ${successCount}, Failed: ${failCount}`);
}

seedMarketData();
