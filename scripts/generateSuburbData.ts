import * as fs from 'fs';
import * as path from 'path';

interface SourceNote {
  label: string;
  url: string;
}

interface PriceBand {
  min: number;
  max: number;
  currency: string;
}

interface DataPoints {
  priceBand: PriceBand;
  propertyTypes: string[];
  commuteAnchors: string[];
  lifestyleTags: string[];
  schoolsNote: string;
  safetyNote: string;
  walkability: string;
  investmentPotential: string;
  sourceNotes: SourceNote[];
}

interface ImagePlan {
  hero: { alt: string };
  snapshotTiles: string[]; // Labels for standard snapshots
  lifestyleGalleryCount: number;
  amenities: {
    schools: number;
    clinics: number;
    shopping: number;
  };
  transportGalleryCount: number;
}

interface Suburb {
  slug: string;
  name: string;
  summary: string;
  centroid: { lat: number; lng: number };
  dataPoints: DataPoints;
  imagePlan: ImagePlan;
  relatedSuburbs: string[];
}

interface SuburbsData {
  city: string;
  province: string;
  suburbs: Suburb[];
}

const suburbs: Suburb[] = [
  {
    slug: 'sandown',
    name: 'Sandown',
    summary: 'An upmarket suburb offering a mix of corporate offices and luxury residences, ideal for executives who want to work and live in the same area.',
    centroid: { lat: -26.1050, lng: 28.0572 },
    dataPoints: {
      priceBand: { min: 3500000, max: 8000000, currency: 'ZAR' },
      propertyTypes: ['apartments', 'luxury apartments', 'penthouses'],
      commuteAnchors: ['Sandton CBD (2 min)', 'Gautrain Sandton Station (5 min)', 'OR Tambo (25 min)'],
      lifestyleTags: ['executive', 'corporate', 'convenience'],
      schoolsNote: 'Close to Crawford College Sandton and Redhill School.',
      safetyNote: 'Well-patrolled area with 24-hour security in most complexes and estates.',
      walkability: 'High walkability to Sandton City and Nelson Mandela Square.',
      investmentPotential: 'Strong rental demand from corporate tenants and expats.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Lifestyle scene in Sandown, Sandton (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['sandton-cbd', 'morningside', 'hyde-park']
  },
  {
    slug: 'sandton-cbd',
    name: 'Sandton CBD',
    summary: 'The financial heart of South Africa, home to the JSE and major corporate headquarters. Premium high-rise living with world-class amenities.',
    centroid: { lat: -26.1076, lng: 28.0567 },
    dataPoints: {
      priceBand: { min: 2000000, max: 15000000, currency: 'ZAR' },
      propertyTypes: ['apartments', 'penthouses', 'luxury apartments'],
      commuteAnchors: ['Gautrain Sandton Station (2 min walk)', 'OR Tambo (25 min)', 'Rosebank (10 min)'],
      lifestyleTags: ['urban', 'corporate', 'luxury', 'nightlife'],
      schoolsNote: 'Several top schools within 10km including St Stithians and Crawford.',
      safetyNote: 'High security presence with CCTV coverage and private security patrols.',
      walkability: 'Excellent - Sandton City, restaurants, and offices all walkable.',
      investmentPotential: 'Prime investment area with consistent capital growth and high rental yields.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Skyline view of Sandton CBD (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 10,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['sandown', 'morningside', 'rivonia']
  },
  {
    slug: 'hurlingham',
    name: 'Hurlingham',
    summary: 'A leafy, established suburb popular with families seeking a quieter lifestyle while remaining close to Sandton amenities.',
    centroid: { lat: -26.1167, lng: 28.0333 },
    dataPoints: {
      priceBand: { min: 2500000, max: 6000000, currency: 'ZAR' },
      propertyTypes: ['houses', 'townhouses', 'clusters'],
      commuteAnchors: ['Sandton CBD (8 min)', 'Rosebank (10 min)', 'Gautrain Rosebank (12 min)'],
      lifestyleTags: ['family', 'quiet', 'established', 'leafy'],
      schoolsNote: 'Home to Brescia House School and close to St Marys School.',
      safetyNote: 'Active community policing forum with good neighbourhood watch presence.',
      walkability: 'Moderate - some local shops and restaurants within walking distance.',
      investmentPotential: 'Stable market with steady appreciation, popular for family rentals.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Leafy suburban street in Hurlingham (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['hyde-park', 'morningside', 'craighall-park']
  },
  {
    slug: 'bryanston',
    name: 'Bryanston',
    summary: 'One of Sandton\'s largest suburbs offering spacious properties on large stands, popular with families seeking space and excellent schools.',
    centroid: { lat: -26.0667, lng: 28.0167 },
    dataPoints: {
      priceBand: { min: 3000000, max: 12000000, currency: 'ZAR' },
      propertyTypes: ['houses', 'estates', 'clusters', 'smallholdings'],
      commuteAnchors: ['Sandton CBD (12 min)', 'Fourways Mall (8 min)', 'N1 Highway (5 min)'],
      lifestyleTags: ['family', 'spacious', 'equestrian', 'schools'],
      schoolsNote: 'Excellent schools including Bryanston High, St Stithians, and Michael Mount.',
      safetyNote: 'Mix of open stands and security estates. Community security initiatives active.',
      walkability: 'Low - car-dependent suburb with scattered amenities.',
      investmentPotential: 'Large properties attract long-term family buyers. Good value retention.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Spacious garden home in Bryanston (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 4, clinics: 2, shopping: 3 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['fourways', 'rivonia', 'hyde-park']
  },
  {
    slug: 'hyde-park',
    name: 'Hyde Park',
    summary: 'An exclusive, prestigious suburb known for luxury homes, top schools, and the upmarket Hyde Park Corner shopping centre.',
    centroid: { lat: -26.1167, lng: 28.0333 },
    dataPoints: {
      priceBand: { min: 5000000, max: 25000000, currency: 'ZAR' },
      propertyTypes: ['houses', 'luxury houses', 'estates'],
      commuteAnchors: ['Sandton CBD (5 min)', 'Rosebank (8 min)', 'Gautrain Sandton (8 min)'],
      lifestyleTags: ['luxury', 'exclusive', 'prestigious', 'family'],
      schoolsNote: 'Home to Hyde Park High School and near St Marys, Redhill, and Crawford.',
      safetyNote: 'One of the best-secured suburbs with boom gates and 24-hour patrols.',
      walkability: 'Moderate - Hyde Park Corner and Jan Smuts shops accessible.',
      investmentPotential: 'Blue-chip suburb with strong capital appreciation over decades.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Luxury estate in Hyde Park (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['sandown', 'hurlingham', 'morningside']
  },
  {
    slug: 'morningside',
    name: 'Morningside',
    summary: 'A vibrant suburb with excellent shopping, dining, and entertainment options along Rivonia Road, attracting young professionals and families.',
    centroid: { lat: -26.0833, lng: 28.0500 },
    dataPoints: {
      priceBand: { min: 2500000, max: 7000000, currency: 'ZAR' },
      propertyTypes: ['apartments', 'townhouses', 'houses', 'clusters'],
      commuteAnchors: ['Sandton CBD (5 min)', 'Gautrain Sandton (8 min)', 'Rivonia (5 min)'],
      lifestyleTags: ['trendy', 'restaurants', 'shopping', 'young professionals'],
      schoolsNote: 'Close to Redhill School, Crawford College, and Brescia House.',
      safetyNote: 'Active security presence with community patrols and boom-controlled access.',
      walkability: 'High - Morningside Shopping Centre and restaurants along Rivonia Road.',
      investmentPotential: 'Popular rental area for young professionals. Strong rental yields.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Morningside cafe lifestyle (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 9,
      amenities: { schools: 3, clinics: 2, shopping: 3 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['sandton-cbd', 'rivonia', 'sandown']
  },
  {
    slug: 'fourways',
    name: 'Fourways',
    summary: 'A rapidly developing hub in northern Johannesburg offering modern estates, excellent malls, and growing infrastructure.',
    centroid: { lat: -26.0167, lng: 28.0000 },
    dataPoints: {
      priceBand: { min: 1800000, max: 6000000, currency: 'ZAR' },
      propertyTypes: ['houses', 'clusters', 'townhouses', 'estates'],
      commuteAnchors: ['Sandton CBD (15 min)', 'N1 Highway (5 min)', 'Lanseria Airport (20 min)'],
      lifestyleTags: ['family', 'modern', 'malls', 'growing'],
      schoolsNote: 'Dainfern College, Fourways High, and several private schools in the area.',
      safetyNote: 'Many gated communities and security estates. Variable security on open stands.',
      walkability: 'Low to moderate - Fourways Mall accessible, otherwise car-dependent.',
      investmentPotential: 'High growth area with new developments. Good for capital appreciation.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Estate living in Fourways (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 3 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['bryanston', 'woodmead', 'rivonia']
  },
  {
    slug: 'rivonia',
    name: 'Rivonia',
    summary: 'A well-established commercial and residential suburb known for its village atmosphere, excellent restaurants, and business park.',
    centroid: { lat: -26.0500, lng: 28.0600 },
    dataPoints: {
      priceBand: { min: 2000000, max: 8000000, currency: 'ZAR' },
      propertyTypes: ['houses', 'townhouses', 'apartments', 'clusters'],
      commuteAnchors: ['Sandton CBD (8 min)', 'N1 Highway (5 min)', 'Gautrain Sandton (12 min)'],
      lifestyleTags: ['village', 'restaurants', 'business', 'established'],
      schoolsNote: 'Close to Redhill School and several Montessori and pre-primary options.',
      safetyNote: 'Community policing active. Mix of secure complexes and open residential areas.',
      walkability: 'Moderate - Rivonia Village and restaurants accessible on foot.',
      investmentPotential: 'Stable residential area with commercial uplift from business park.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Rivonia Village atmosphere (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 3 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['morningside', 'sandton-cbd', 'fourways']
  },
  {
    slug: 'craighall-park',
    name: 'Craighall Park',
    summary: 'A charming, tree-lined suburb with a mix of old Johannesburg character homes and modern developments, close to Rosebank.',
    centroid: { lat: -26.1333, lng: 28.0167 },
    dataPoints: {
      priceBand: { min: 2200000, max: 5500000, currency: 'ZAR' },
      propertyTypes: ['houses', 'townhouses', 'apartments'],
      commuteAnchors: ['Sandton CBD (10 min)', 'Rosebank (5 min)', 'Gautrain Rosebank (8 min)'],
      lifestyleTags: ['charming', 'character', 'leafy', 'artistic'],
      schoolsNote: 'Near St Marys School, Auckland Park schools, and UJ.',
      safetyNote: 'Active residents association with neighbourhood watch programmes.',
      walkability: 'Moderate - local cafes and shops, Rosebank nearby.',
      investmentPotential: 'Popular with young buyers seeking character. Steady market.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Character home in Craighall Park (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['hurlingham', 'hyde-park', 'morningside']
  },
  {
    slug: 'inanda',
    name: 'Inanda',
    summary: 'An exclusive enclave home to the prestigious Inanda Country Base, offering large properties and a semi-rural lifestyle minutes from Sandton.',
    centroid: { lat: -26.0333, lng: 28.0333 },
    dataPoints: {
      priceBand: { min: 5000000, max: 20000000, currency: 'ZAR' },
      propertyTypes: ['estates', 'luxury houses', 'equestrian properties'],
      commuteAnchors: ['Sandton CBD (12 min)', 'Fourways (8 min)', 'N1 Highway (10 min)'],
      lifestyleTags: ['exclusive', 'equestrian', 'country', 'luxury'],
      schoolsNote: 'St Stithians College is located in Inanda. Close to Dainfern College.',
      safetyNote: 'Secure estate living with controlled access and 24-hour security.',
      walkability: 'Low - estate living, car required for all amenities.',
      investmentPotential: 'Trophy properties with long-term capital appreciation.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Equestrian lifestyle in Inanda (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['bryanston', 'fourways', 'hyde-park']
  },
  {
    slug: 'woodmead',
    name: 'Woodmead',
    summary: 'A mixed-use suburb combining residential areas with major office parks and retail centres, offering convenience for work-from-home professionals.',
    centroid: { lat: -26.0500, lng: 28.0900 },
    dataPoints: {
      priceBand: { min: 1500000, max: 4500000, currency: 'ZAR' },
      propertyTypes: ['townhouses', 'clusters', 'apartments', 'houses'],
      commuteAnchors: ['Sandton CBD (10 min)', 'N1 Highway (3 min)', 'OR Tambo (20 min)'],
      lifestyleTags: ['convenient', 'business park', 'accessible', 'value'],
      schoolsNote: 'Close to The Hill School and several pre-primary options.',
      safetyNote: 'Security estates and complexes offer good protection. Variable on open stands.',
      walkability: 'Low to moderate - Woodmead Retail Park accessible.',
      investmentPotential: 'Good entry point for first-time buyers. Steady rental demand.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Woodmead office and retail park (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['fourways', 'rivonia', 'sandton-cbd']
  },
  {
    slug: 'benmore-gardens',
    name: 'Benmore Gardens',
    summary: 'An upmarket residential area adjacent to Benmore Gardens shopping centre, offering easy access to Sandton CBD and excellent amenities.',
    centroid: { lat: -26.0950, lng: 28.0400 },
    dataPoints: {
      priceBand: { min: 2800000, max: 7500000, currency: 'ZAR' },
      propertyTypes: ['houses', 'townhouses', 'luxury apartments'],
      commuteAnchors: ['Sandton CBD (5 min)', 'Gautrain Sandton (10 min)', 'Benmore Gardens Mall (2 min)'],
      lifestyleTags: ['upmarket', 'convenient', 'shopping', 'established'],
      schoolsNote: 'Close to Redhill School and Crawford College Sandton.',
      safetyNote: 'Well-maintained suburb with active security and boom access.',
      walkability: 'High - Benmore Gardens centre offers shops, restaurants, and services.',
      investmentPotential: 'Solid investment with consistent demand from professionals.',
      sourceNotes: [
        { label: 'Property24 Sandton Values', url: 'https://www.property24.com/property-values/sandton/gauteng/109' }
      ]
    },
    imagePlan: {
      hero: { alt: 'Benmore Gardens residential (placeholder)' },
      snapshotTiles: ['Coffee shops', 'Shopping', 'Parks', 'Schools', 'Clinics', 'Transport'],
      lifestyleGalleryCount: 8,
      amenities: { schools: 3, clinics: 2, shopping: 2 },
      transportGalleryCount: 4
    },
    relatedSuburbs: ['sandown', 'morningside', 'bryanston']
  }
];

const suburbsData: SuburbsData = {
  city: 'sandton',
  province: 'gauteng',
  suburbs
};

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write suburbs.json
const outputPath = path.join(dataDir, 'suburbs.json');
fs.writeFileSync(outputPath, JSON.stringify(suburbsData, null, 2));
console.log(`✅ Generated ${outputPath} with ${suburbs.length} suburbs`);
