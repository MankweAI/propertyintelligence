export interface AgentSuburbProfile {
    priority: number; // 1 = Top Feature, 2 = Strong Alternative
    badge?: string; // "High Velocity Specialist", "Cluster Expert", etc.
    quote?: string; // Suburb-specific flair
}

export interface Agent {
    id: string;
    name: string;
    agency: string;
    slug: string;
    image: string;
    // New Weighted Territory Map
    suburbs: {
        [suburbSlug: string]: AgentSuburbProfile;
    };
    // Legacy support (optional, can be derived)
    areas: string[];

    rating: number; // Internal quality score 1-5
    status: 'active' | 'inactive';
    whyRecommended: string[]; // Generic highlights
    hungerSignal?: string; // The "Why them?" specific evidence

    stats: {
        yearsExperience: number;
        recentSales: number; // Last 12 months (Total or representative)
        avgPrice: string;
        estDaysOnMarket?: string; // The "Velocity" metric
    };
    contacts: {
        phone: string;
        email: string;
        whatsapp?: string;
    };
    social?: {
        instagram?: string;
        linkedin?: string;
        youtube?: string;
        tiktok?: string;
        website?: string;
        facebook?: string;
        profileLink?: string; // Direct link to primary profile
    };
    classification?: {
        tier: string;
        languages?: string[];
    };
}

export const recommendedAgents: Agent[] = [
    // --- RISING STAR - BRYANSTON EAST LEADER ---
    {
        id: "ag_garon_kolman",
        name: "Garon Kolman",
        agency: "Limestone Residential",
        slug: "garon-kolman",
        image: "/images/agents/garon-kolman.jpg",
        areas: ["bryanston"],
        suburbs: {
            "bryanston": { priority: 1, badge: "Cinematic Specialist" }
        },
        rating: 4.9,
        status: "active",
        whyRecommended: [
            "High-end cinematic video tours",
            "Specializes in modern luxury clusters",
            "Consistent high-quality production"
        ],
        hungerSignal: "High-end cinematic content; utilizes professional video tours with specialized creators like dirXtope; focuses on modern luxury clusters.",
        stats: { yearsExperience: 6, recentSales: 18, avgPrice: "R6.5m", estDaysOnMarket: "45 days" },
        contacts: { phone: "+27 82 000 0001", email: "garon@limestone.co.za" },
        social: { instagram: "https://www.instagram.com/limestonesa/", profileLink: "https://www.instagram.com/limestonesa/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - BRYANSTON VOLUME ---
    {
        id: "ag_charlene_negus",
        name: "Charlene Negus",
        agency: "Firzt Realty Company",
        slug: "charlene-negus",
        image: "/images/agents/charlene-negus.jpg",
        areas: ["bryanston"],
        suburbs: {
            "bryanston": { priority: 1, badge: "Video Volumist" }
        },
        rating: 4.9,
        status: "active",
        whyRecommended: [
            "Massive listing volume",
            "Video walkthrough for every listing",
            "Active across multiple price segments"
        ],
        hungerSignal: "Massive listing volume; nearly every listing features a high-quality video walkthrough; extremely active across multiple pricing segments.",
        stats: { yearsExperience: 8, recentSales: 35, avgPrice: "R4.2m", estDaysOnMarket: "40 days" },
        contacts: { phone: "+27 82 000 0002", email: "charlene@firzt.co.za" },
        social: { website: "https://www.property24.com/estate-agents/charlene-negus/123456", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - SANDTON LUXURY INFLUENCER ---
    {
        id: "ag_nuno_brizido",
        name: "Nuno Brizido",
        agency: "Chas Everitt",
        slug: "nuno-brizido",
        image: "/images/agents/nuno-brizido.jpg",
        areas: ["sandown", "sandhurst", "morningside", "hyde-park"],
        suburbs: {
            "sandown": { priority: 1, badge: "Global Marketer" },
            "sandhurst": { priority: 2, badge: "Mega Mansion Pro" },
            "morningside": { priority: 2, badge: "Luxury Showcase" },
            "hyde-park": { priority: 2, badge: "Luxury Showcase" }
        },
        rating: 5.0,
        status: "active",
        whyRecommended: [
            "21.7k+ Instagram Followers",
            "Targeting global investors",
            "High-production 'Mega Mansion' tours"
        ],
        hungerSignal: "21.7k IG followers; high-production 'Mega Mansion' video tours; digital marketing specialist targeting global investors.",
        stats: { yearsExperience: 10, recentSales: 12, avgPrice: "R15.0m", estDaysOnMarket: "90 days" },
        contacts: { phone: "+27 82 000 0003", email: "nuno@everitt.co.za" },
        social: { instagram: "https://www.instagram.com/nunobrizido/", profileLink: "https://www.instagram.com/nunobrizido/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - EXP SANDTON POWERHOUSE ---
    {
        id: "ag_james_conor",
        name: "James Conor",
        agency: "eXp South Africa",
        slug: "james-conor",
        image: "/images/agents/james-conor.jpg",
        areas: ["sandton-cbd", "sandown"],
        suburbs: {
            "sandton-cbd": { priority: 1, badge: "High Volume Scaler" },
            "sandown": { priority: 2, badge: "Team Leader" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Led team to 156 units/year",
            "Aggressive growth mindset",
            "eXp Model Power User"
        ],
        hungerSignal: "Led a team to achieve 156 units sold in a single year; embodies the aggressive growth and high-volume mindset of the eXp model.",
        stats: { yearsExperience: 7, recentSales: 156, avgPrice: "R2.5m", estDaysOnMarket: "30 days" },
        contacts: { phone: "+27 82 000 0004", email: "james.conor@expsouthafrica.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - RE/MAX RISING STAR ---
    {
        id: "ag_lucky_malahlela",
        name: "Lucky Malahlela",
        agency: "RE/MAX",
        slug: "lucky-malahlela",
        image: "/images/agents/lucky-malahlela.jpg",
        areas: ["sandown", "kelvin", "marlboro"],
        suburbs: {
            "sandown": { priority: 3, badge: "Hospitality Service" },
            "kelvin": { priority: 1, badge: "Rising Star Award" },
            "marlboro": { priority: 1, badge: "Emerging Market Pro" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "2024 Rising Star Award Winner",
            "Hospitality background = Elite Service",
            "High entrepreneurial drive"
        ],
        hungerSignal: "2024 Rising Star award winner; high entrepreneurial drive; leverages hospitality background for premium client engagement.",
        stats: { yearsExperience: 3, recentSales: 20, avgPrice: "R1.8m", estDaysOnMarket: "42 days" },
        contacts: { phone: "+27 82 000 0005", email: "lucky@remax.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - VERTICAL LIVING SPECIALIST ---
    {
        id: "ag_kgaogelo_sedibeng",
        name: "Kgaogelo Sedibeng",
        agency: "Dunamis Properties",
        slug: "kgaogelo-sedibeng",
        image: "/images/agents/kgaogelo-sedibeng.jpg",
        areas: ["sandown", "sandton-cbd"],
        suburbs: {
            "sandown": { priority: 1, badge: "Vertical Living Pro" },
            "sandton-cbd": { priority: 1, badge: "BlackBrick Specialist" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Specialist in BlackBrick/Vertical living",
            "Tech-focused investor outreach",
            "Urban studio expert"
        ],
        hungerSignal: "Specialist in modern vertical living (BlackBrick); tech-focused investor outreach; high activity in urban studio segments.",
        stats: { yearsExperience: 4, recentSales: 25, avgPrice: "R1.2m", estDaysOnMarket: "28 days" },
        contacts: { phone: "+27 82 000 0006", email: "kgaogelo@dunamis.co.za" },
        social: { website: "https://www.property24.com/", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - SUNNINGHILL DIGITAL ---
    {
        id: "ag_jay_modikoane",
        name: "Jay Modikoane",
        agency: "Firzt Realty Company",
        slug: "jay-modikoane",
        image: "/images/agents/jay-modikoane.jpg",
        areas: ["sunninghill", "paulshof"],
        suburbs: {
            "sunninghill": { priority: 1, badge: "High Frequency Lister" },
            "paulshof": { priority: 2, badge: "Complex Specialist" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "Candidate with high listing frequency",
            "Proactive digital presence",
            "Focus on high-demand complexes"
        ],
        hungerSignal: "Candidate practitioner with high listing frequency; proactive digital presence; focuses on high-demand modern complexes.",
        stats: { yearsExperience: 2, recentSales: 15, avgPrice: "R1.5m", estDaysOnMarket: "38 days" },
        contacts: { phone: "+27 82 000 0007", email: "jay@firzt.co.za" },
        social: { website: "https://www.property24.com/", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - RETIREMENT & LIFESTYLE ---
    {
        id: "ag_andreas_reichert",
        name: "Andreas Reichert",
        agency: "Pam Golding",
        slug: "andreas-reichert",
        image: "/images/agents/andreas-reichert.jpg",
        areas: ["bryanston", "douglasdale"],
        suburbs: {
            "bryanston": { priority: 2, badge: "Lifestyle Expert" },
            "douglasdale": { priority: 2, badge: "Retirement Focus" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Aggressive activity in lifestyle developments",
            "Consistent use of video promotion",
            "Modern retirement specialist"
        ],
        hungerSignal: "Aggressive listing activity in modern retirement and lifestyle developments; consistent use of video and social promotions.",
        stats: { yearsExperience: 5, recentSales: 12, avgPrice: "R3.0m", estDaysOnMarket: "50 days" },
        contacts: { phone: "+27 82 000 0008", email: "andreas@pamgolding.co.za" },
        social: { website: "https://www.property24.com/", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - INVESTOR INNOVATOR ---
    {
        id: "ag_liezel_williams",
        name: "Liezel Williams",
        agency: "IGrow Wealth",
        slug: "liezel-williams",
        image: "/images/agents/liezel-williams.jpg",
        areas: ["sandton-cbd"],
        suburbs: {
            "sandton-cbd": { priority: 1, badge: "Innovative Living" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Specialist in 'Innovative Urban Living'",
            "Focuses on Digital Nomad profiles",
            "Investor-centric savvy"
        ],
        hungerSignal: "Specialist in 'innovative urban living'; focuses on digital nomad and savvy investor profiles for BlackBrick 1.",
        stats: { yearsExperience: 6, recentSales: 30, avgPrice: "R1.1m", estDaysOnMarket: "35 days" },
        contacts: { phone: "+27 82 000 0009", email: "liezel@igrow.co.za" },
        social: { website: "https://www.property24.com/", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - MICRO INFLUENCER ---
    {
        id: "ag_sibiya_sibiya",
        name: "Sibiya Sibiya",
        agency: "LetsPropIn Realty",
        slug: "sibiya-sibiya",
        image: "/images/agents/sibiya-sibiya.jpg",
        areas: ["sandown", "morningside"],
        suburbs: {
            "sandown": { priority: 2, badge: "Luxury Influencer" },
            "morningside": { priority: 3, badge: "Boutique Founder" }
        },
        rating: 4.9,
        status: "active",
        whyRecommended: [
            "47.7k Instagram Followers",
            "Co-founder of digital-first boutique firm",
            "Micro-influencer model"
        ],
        hungerSignal: "47.7k IG followers; micro-influencer agent model; co-founder of a digital-first boutique firm focusing on luxury developments.",
        stats: { yearsExperience: 5, recentSales: 10, avgPrice: "R4.5m", estDaysOnMarket: "60 days" },
        contacts: { phone: "+27 82 000 0010", email: "sibiya@letshropin.co.za" },
        social: { instagram: "https://www.instagram.com/sibiya/", profileLink: "https://www.instagram.com/sibiya/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - COMMUNITY BUILDER ---
    {
        id: "ag_jaco_van_zyl",
        name: "Jaco Van Zyl",
        agency: "Keller Williams",
        slug: "jaco-van-zyl",
        image: "/images/agents/jaco-van-zyl.jpg",
        areas: ["bryanston"], // Mapped from Blairgowrie/Randburg based on potential overlap/expansion
        suburbs: {
            "bryanston": { priority: 3, badge: "Community Branch" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "Passionate personal branding",
            "Community-driven marketing",
            "Modernization of suburban nodes"
        ],
        hungerSignal: "Passionate personal branding; focuses on community-driven marketing and modernization of suburban nodes.",
        stats: { yearsExperience: 4, recentSales: 16, avgPrice: "R2.8m", estDaysOnMarket: "45 days" },
        contacts: { phone: "+27 82 000 0011", email: "jaco@kw.co.za" },
        social: { website: "https://www.thevirtualagent.co.za/agent/bryanston-west/", profileLink: "https://www.thevirtualagent.co.za/agent/bryanston-west/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - ICON AGENT ---
    {
        id: "ag_lizna_nel",
        name: "Lizna Nel",
        agency: "eXp South Africa",
        slug: "lizna-nel",
        image: "/images/agents/lizna-nel.jpg",
        areas: ["fourways", "douglasdale", "lonehill"], // Sandton North mapping
        suburbs: {
            "fourways": { priority: 1, badge: "ICON Agent" },
            "douglasdale": { priority: 1, badge: "Mentor Leader" },
            "lonehill": { priority: 1, badge: "High Volume" }
        },
        rating: 5.0,
        status: "active",
        whyRecommended: [
            "First female ICON agent in SA",
            "High-volume mentor and speaker",
            "Aggressive digital lead gen strategy"
        ],
        hungerSignal: "First female ICON agent in SA; high-volume mentor and speaker; aggressive digital lead generation strategy.",
        stats: { yearsExperience: 9, recentSales: 45, avgPrice: "R2.2m", estDaysOnMarket: "32 days" },
        contacts: { phone: "+27 82 000 0012", email: "lizna@expsouthafrica.co.za" },
        social: { instagram: "https://www.instagram.com/liznanel/", profileLink: "https://www.instagram.com/liznanel/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - LONEHILL SPECIALIST ---
    {
        id: "ag_marlon_pretorius",
        name: "Marlon Pretorius",
        agency: "Only Realty 360",
        slug: "marlon-pretorius",
        image: "/images/agents/marlon-pretorius.jpg",
        areas: ["lonehill", "sunninghill"],
        suburbs: {
            "lonehill": { priority: 1, badge: "Complex Pro" },
            "sunninghill": { priority: 2, badge: "Rental/Sales Hybrid" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Specializes in high-demand modern complexes",
            "Active in both rentals and sales",
            "Targets young professionals"
        ],
        hungerSignal: "Specializes in high-demand modern complexes; extremely active in both rentals and sales for young professionals.",
        stats: { yearsExperience: 3, recentSales: 22, avgPrice: "R1.4m", estDaysOnMarket: "30 days" },
        contacts: { phone: "+27 82 000 0013", email: "marlon@onlyrealty.co.za" },
        social: { website: "https://www.property24.com/", profileLink: "https://www.property24.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - IAGENT MODEL ---
    {
        id: "ag_teresa_turner",
        name: "Teresa Turner",
        agency: "Meridian Realty",
        slug: "teresa-turner",
        image: "/images/agents/teresa-turner.jpg",
        areas: ["fourways", "broadacres"],
        suburbs: {
            "fourways": { priority: 2, badge: "iAgent Model" },
            "broadacres": { priority: 1, badge: "Virtual Platform Pro" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Digital-first 'iAgent' model",
            "Leverages virtual platform tools",
            "High-efficiency client service"
        ],
        hungerSignal: "Digital-first 'iAgent' model; leverages virtual platform tools for high-efficiency client service and modern listings.",
        stats: { yearsExperience: 5, recentSales: 16, avgPrice: "R2.0m", estDaysOnMarket: "40 days" },
        contacts: { phone: "+27 82 000 0014", email: "teresa@meridianrealty.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - TECH FORWARD PRO ---
    {
        id: "ag_piet_van_dyk",
        name: "Piet Van Dyk",
        agency: "Keller Williams",
        slug: "piet-van-dyk",
        image: "/images/agents/piet-van-dyk.jpg",
        areas: ["bryanston"], // Mapped from Kensington B/Randburg
        suburbs: {
            "bryanston": { priority: 3, badge: "Tech Service" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "Full-status professional",
            "Tech-forward, service-oriented philosophy",
            "Proactive community marketing"
        ],
        hungerSignal: "Full-status professional with a tech-forward, service-oriented philosophy; proactive community-focused marketing.",
        stats: { yearsExperience: 6, recentSales: 12, avgPrice: "R2.1m", estDaysOnMarket: "45 days" },
        contacts: { phone: "+27 82 000 0015", email: "piet@kw.co.za" },
        social: { website: "https://www.thevirtualagent.co.za/agent/bryanston-west/", profileLink: "https://www.thevirtualagent.co.za/agent/bryanston-west/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - CLUSTER SPECIALIST ---
    {
        id: "ag_tumisang_matlholwa",
        name: "Tumisang Matlholwa",
        agency: "Private Property",
        slug: "tumisang-matlholwa",
        image: "/images/agents/tumisang-matlholwa.jpg",
        areas: ["hurlingham", "sandhurst"],
        suburbs: {
            "hurlingham": { priority: 1, badge: "High-Value Cluster" },
            "sandhurst": { priority: 3, badge: "Digital Outreach" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Specialist in high-value clusters",
            "Early adopter of digital listing promotions",
            "Social media outreach pro"
        ],
        hungerSignal: "Specialist in high-value clusters; early adopter of digital listing promotions and social media outreach.",
        stats: { yearsExperience: 4, recentSales: 10, avgPrice: "R5.5m", estDaysOnMarket: "55 days" },
        contacts: { phone: "+27 82 000 0016", email: "tumisang@privateproperty.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - YOUNG PROFESSIONAL FOCUS ---
    {
        id: "ag_sharyce_stilwell",
        name: "Sharyce Stilwell",
        agency: "Private Property",
        slug: "sharyce-stilwell",
        image: "/images/agents/sharyce-stilwell.jpg",
        areas: ["fourways", "douglasdale"], // Pineslopes mapping
        suburbs: {
            "fourways": { priority: 2, badge: "Young Prof Market" },
            "douglasdale": { priority: 2, badge: "Tech Block Specialist" }
        },
        rating: 4.8,
        status: "active",
        whyRecommended: [
            "Focuses on young professional market",
            "High conversion in tech-heavy residential blocks",
            "Personalized video updates"
        ],
        hungerSignal: "Focuses on young professional market; high conversion in tech-heavy residential blocks; uses personalized video updates.",
        stats: { yearsExperience: 3, recentSales: 18, avgPrice: "R1.3m", estDaysOnMarket: "35 days" },
        contacts: { phone: "+27 82 000 0017", email: "sharyce@privateproperty.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - ESTATE SPECIALIST ---
    {
        id: "ag_lerato_zako",
        name: "Lerato Zako",
        agency: "Private Property",
        slug: "lerato-zako",
        image: "/images/agents/lerato-zako.jpg",
        areas: ["fourways", "woodmead"],
        suburbs: {
            "fourways": { priority: 2, badge: "Estate Specialist" },
            "woodmead": { priority: 2, badge: "Secure Dev Pro" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "High-energy estate specialist",
            "Focus on developments like The Woodlands",
            "Aggressive digital prospecting"
        ],
        hungerSignal: "High-energy estate specialist; focuses on modern secure developments like The Woodlands; aggressive digital prospecting.",
        stats: { yearsExperience: 4, recentSales: 14, avgPrice: "R2.4m", estDaysOnMarket: "42 days" },
        contacts: { phone: "+27 82 000 0018", email: "lerato@privateproperty.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - APARTMENT EXPERT ---
    {
        id: "ag_anil_nanan",
        name: "Anil Nanan",
        agency: "Onlyon Private Prop",
        slug: "anil-nanan",
        image: "/images/agents/anil-nanan.jpg",
        areas: ["paulshof", "sunninghill"],
        suburbs: {
            "paulshof": { priority: 1, badge: "High Activity Aaprtments" },
            "sunninghill": { priority: 3, badge: "Tech Worker Focus" }
        },
        rating: 4.7,
        status: "active",
        whyRecommended: [
            "Expert in high-activity apartment segments",
            "Proactive engagement with first-time buyers",
            "Targeting young tech workers"
        ],
        hungerSignal: "Expert in high-activity apartment segments; proactive engagement with first-time buyers and young tech workers.",
        stats: { yearsExperience: 3, recentSales: 20, avgPrice: "R1.1m", estDaysOnMarket: "30 days" },
        contacts: { phone: "+27 82 000 0019", email: "anil@onlyon.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    },
    // --- RISING STAR - LIFESTYLE MARKETER ---
    {
        id: "ag_lola_da_silva",
        name: "Lola Da Silva",
        agency: "Private Property",
        slug: "lola-da-silva",
        image: "/images/agents/lola-da-silva.jpg",
        areas: ["fourways", "lainhill"],
        suburbs: {
            "fourways": { priority: 1, badge: "Lifestyle Complex" }
        },
        rating: 4.9,
        status: "active",
        whyRecommended: [
            "Modern lifestyle complex specialist",
            "High-frequency digital native marketing",
            "Focus on 'The William' and similar"
        ],
        hungerSignal: "Strong focus on modern lifestyle complexes like 'The William'; high-frequency digital native marketing style.",
        stats: { yearsExperience: 5, recentSales: 28, avgPrice: "R1.6m", estDaysOnMarket: "33 days" },
        contacts: { phone: "+27 82 000 0020", email: "lola@privateproperty.co.za" },
        social: { linkedin: "https://www.linkedin.com/", profileLink: "https://www.linkedin.com/" },
        classification: { tier: "Rising Star" }
    }
];

export function getAgentsForSuburb(suburbSlug: string): Agent[] {
    // 1. Filter agents who have a specific profile for this suburb
    let matches = recommendedAgents.filter(a => a.suburbs && a.suburbs[suburbSlug]);

    // 2. Sort by Priority (Low number = High Priority)
    matches.sort((a, b) => {
        const pA = a.suburbs[suburbSlug].priority || 99;
        const pB = b.suburbs[suburbSlug].priority || 99;
        return pA - pB;
    });

    // 3. Fallback: If < 3 agents, find "Sandton Generalists" (High Velocity ones)
    // We define generalists as those with > 10 recent sales and < 60 days estDaysOnMarket
    if (matches.length < 3) {
        const generalists = recommendedAgents.filter(a =>
            !matches.find(m => m.id === a.id) && // Not already matched
            (a.stats?.recentSales > 10 || a.agency.includes("Byron Thomas") || a.agency.includes("Fine & Country")) // Agencies with good overlap
        ).sort((a, b) => (b.stats?.recentSales || 0) - (a.stats?.recentSales || 0));

        matches = [...matches, ...generalists];
    }

    // 4. Return top 3 (or up to 6 if we want options, but UI handles 3 well)
    return matches.slice(0, 3);
}
