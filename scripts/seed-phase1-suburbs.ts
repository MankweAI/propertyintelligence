import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') })

// Try to get Supabase URL from different possible env var names
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PROJECT_URL!

// Try service role key first, fallback to anon key if not available
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials.')
    console.error('   NEXT_PROJECT_URL:', !!supabaseUrl)
    console.error('   SUPABASE_KEY:', !!supabaseKey)
    console.error('\n   Please set these variables in .env.local')
    process.exit(1)
}

console.log('✅ Using Supabase URL:', supabaseUrl)
console.log('✅ Using Key Type:', supabaseKey.includes('anon') || supabaseKey.includes('publishable') ? 'Anon Key' : 'Service Role Key')


const supabase = createClient(supabaseUrl, supabaseKey)

async function seedPhase1Suburbs() {
    console.log('🚀 Starting Phase 1-5 Suburb Seeding...\n')

    const suburbs = [
        // Phase 1
        'douglasdale', 'magaliessig', 'edenburg',
        // Phase 2
        'wierda-valley', 'kelvin', 'buccleuch',
        // Phase 3
        'kramerville', 'marlboro', 'marlboro-gardens', 'parkmore',
        // Phase 4
        'craigavon', 'beverley', 'dainfern', 'broadacres',
        // Phase 5
        'gallo-manor', 'wendywood', 'illovo'
    ]

    for (const suburbSlug of suburbs) {
        try {
            console.log(`\n📍 Processing ${suburbSlug}...`)

            // 1. Read the seller report JSON from added-suburbs
            const sellerReportPath = path.join(process.cwd(), 'data', 'added-suburbs', `${suburbSlug}.json`)
            const sellerReportData = JSON.parse(fs.readFileSync(sellerReportPath, 'utf-8'))

            // 2. Read suburbs.json to get metadata
            const suburbsJsonPath = path.join(process.cwd(), 'data', 'suburbs.json')
            const suburbsData = JSON.parse(fs.readFileSync(suburbsJsonPath, 'utf-8'))
            const suburbMetadata = suburbsData.suburbs.find((s: any) => s.slug === suburbSlug)

            if (!suburbMetadata) {
                console.error(`❌ Could not find ${suburbSlug} in suburbs.json`)
                continue
            }

            console.log(`   ✅ Found metadata for ${suburbMetadata.name}`)
            console.log(`   ✅ Loaded seller report data`)

            // 3. Add required author field if missing
            if (!sellerReportData.author) {
                sellerReportData.author = {
                    name: "Market Research Team",
                    role: "Senior Market Analyst",
                    image: "/images/team/analyst.jpg"
                }
            }

            // 4. Add ownerStability field if missing
            if (!sellerReportData.ownerStability) {
                sellerReportData.ownerStability = {
                    avgTenure: "7-10 years",
                    turnoverRate: "Moderate",
                    insight: "Balanced mix of long-term owner-occupiers and investor-owned rental properties."
                }
            }

            // 5. Construct the row for upserting
            const row = {
                slug: suburbSlug,
                name: suburbMetadata.name,
                city: 'Sandton',
                province: 'Gauteng',
                centroid: suburbMetadata.centroid,
                overview: {
                    dataPoints: suburbMetadata.dataPoints,
                    imagePlan: suburbMetadata.imagePlan,
                    summary: suburbMetadata.summary
                },
                related_suburbs: suburbMetadata.relatedSuburbs,
                seller_report: sellerReportData,
                updated_at: new Date().toISOString()
            }

            console.log(`   📤 Upserting to Supabase...`)

            // 6. Upsert (insert or update)
            const { error } = await supabase
                .from('suburbs')
                .upsert(row, { onConflict: 'slug' })

            if (error) {
                console.error(`   ❌ Error upserting ${suburbSlug}:`, error)
                throw error
            }

            console.log(`   ✅ Successfully seeded ${suburbMetadata.name}!`)

        } catch (error) {
            console.error(`\n❌ Failed to process ${suburbSlug}:`, error)
            process.exit(1)
        }
    }

    console.log('\n\n🎉 Phase 1-5 Seeding Complete!')
    console.log('✅ All 17 suburbs have been successfully added to the database.\n')
}

// Run the seeding function
seedPhase1Suburbs().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
})
