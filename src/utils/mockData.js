// utils/mockData.js - Sample data for development and demo

export const initializeSampleData = () => {
  const sampleContacts = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-555-0123',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      company: 'TechCorp Solutions',
      jobTitle: 'VP of Sales',
      location: 'San Francisco, CA',
      status: 'enriched',
      source: 'manual',
      enrichedAt: new Date(Date.now() - 86400000), // 1 day ago
      confidence: 95,
      tags: ['qualified', 'hot-lead']
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: '',
      phone: '',
      linkedinUrl: 'https://linkedin.com/in/michaelchen',
      company: 'StartupXYZ',
      jobTitle: 'CTO',
      location: 'New York, NY',
      status: 'pending',
      source: 'csv-upload',
      enrichedAt: null,
      confidence: 0,
      tags: ['startup', 'tech']
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@globalinc.com',
      phone: '+1-555-0456',
      linkedinUrl: '',
      company: 'Global Inc',
      jobTitle: 'Marketing Director',
      location: 'Chicago, IL',
      status: 'enriched',
      source: 'api',
      enrichedAt: new Date(Date.now() - 172800000), // 2 days ago
      confidence: 88,
      tags: ['enterprise', 'decision-maker']
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@innovate.io',
      phone: '+1-555-0789',
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      company: 'Innovate.io',
      jobTitle: 'Product Manager',
      location: 'Austin, TX',
      status: 'enriched',
      source: 'manual',
      enrichedAt: new Date(Date.now() - 3600000), // 1 hour ago
      confidence: 92,
      tags: ['product', 'saas']
    },
    {
      id: 5,
      firstName: 'Lisa',
      lastName: 'Thompson',
      email: '',
      phone: '',
      linkedinUrl: '',
      company: 'DataFlow Corp',
      jobTitle: 'Head of Operations',
      location: 'Seattle, WA',
      status: 'pending',
      source: 'csv-upload',
      enrichedAt: null,
      confidence: 0,
      tags: ['enterprise']
    }
  ];

  const sampleCompanies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      domain: 'techcorp.com',
      industry: 'Software',
      size: '201-500',
      location: 'San Francisco, CA',
      revenue: '$50M-$100M',
      contacts: 5,
      enrichedContacts: 4,
      foundedYear: 2015,
      description: 'Enterprise software solutions for modern businesses',
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/company/techcorp-solutions',
        twitter: 'https://twitter.com/techcorp'
      }
    },
    {
      id: 2,
      name: 'StartupXYZ',
      domain: 'startupxyz.com',
      industry: 'Technology',
      size: '11-50',
      location: 'New York, NY',
      revenue: '$1M-$10M',
      contacts: 2,
      enrichedContacts: 1,
      foundedYear: 2020,
      description: 'AI-powered analytics platform for e-commerce',
      technologies: ['Python', 'TensorFlow', 'Docker', 'PostgreSQL'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/company/startupxyz',
        twitter: 'https://twitter.com/startupxyz'
      }
    },
    {
      id: 3,
      name: 'Global Inc',
      domain: 'globalinc.com',
      industry: 'Consulting',
      size: '1001-5000',
      location: 'Chicago, IL',
      revenue: '$500M+',
      contacts: 12,
      enrichedContacts: 10,
      foundedYear: 1995,
      description: 'Global management consulting and technology services',
      technologies: ['Salesforce', 'Microsoft', 'SAP', 'Oracle'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/company/global-inc',
        twitter: 'https://twitter.com/globalinc'
      }
    },
    {
      id: 4,
      name: 'Innovate.io',
      domain: 'innovate.io',
      industry: 'SaaS',
      size: '51-200',
      location: 'Austin, TX',
      revenue: '$10M-$50M',
      contacts: 8,
      enrichedContacts: 7,
      foundedYear: 2018,
      description: 'Product management and innovation platform',
      technologies: ['Vue.js', 'GraphQL', 'Kubernetes', 'Redis'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/company/innovate-io',
        twitter: 'https://twitter.com/innovateio'
      }
    },
    {
      id: 5,
      name: 'DataFlow Corp',
      domain: 'dataflow.com',
      industry: 'Data Analytics',
      size: '501-1000',
      location: 'Seattle, WA',
      revenue: '$100M-$500M',
      contacts: 15,
      enrichedContacts: 12,
      foundedYear: 2012,
      description: 'Big data analytics and business intelligence solutions',
      technologies: ['Apache Spark', 'Tableau', 'Snowflake', 'Kafka'],
      socialProfiles: {
        linkedin: 'https://linkedin.com/company/dataflow-corp',
        twitter: 'https://twitter.com/dataflowcorp'
      }
    }
  ];

  return { sampleContacts, sampleCompanies };
};

// API Provider configurations
export const apiProviders = {
  contact: [
    {
      id: 'surfe',
      name: 'Surfe',
      description: 'Contact enrichment and email finder',
      specialty: 'B2B Contact Data',
      successRate: '94%',
      pricing: '$0.15 per contact',
      features: ['Email discovery', 'Phone numbers', 'LinkedIn profiles', 'Job details']
    },
    {
      id: 'apollo',
      name: 'Apollo.io',
      description: 'B2B contact and company database',
      specialty: 'Contact Database',
      successRate: '91%',
      pricing: '$0.20 per contact',
      features: ['Contact database', 'Email finder', 'Company data', 'Technographics']
    },
    {
      id: 'hunter',
      name: 'Hunter.io',
      description: 'Email finder and verification',
      specialty: 'Email Discovery',
      successRate: '87%',
      pricing: '$0.12 per email',
      features: ['Email finder', 'Email verification', 'Domain search', 'Author finder']
    },
    {
      id: 'zoominfo',
      name: 'ZoomInfo',
      description: 'Enterprise contact database',
      specialty: 'Enterprise Contacts',
      successRate: '89%',
      pricing: '$0.25 per contact',
      features: ['Contact database', 'Intent data', 'Org charts', 'Direct dials']
    }
  ],
  company: [
    {
      id: 'clearbit',
      name: 'Clearbit',
      description: 'Company enrichment and firmographic data',
      specialty: 'Company Intelligence',
      successRate: '96%',
      pricing: '$0.50 per company',
      features: ['Company data', 'Technographics', 'Funding info', 'Employee count']
    },
    {
      id: 'apollo-company',
      name: 'Apollo.io',
      description: 'Company database and insights',
      specialty: 'Company Database',
      successRate: '88%',
      pricing: '$0.30 per company',
      features: ['Company profiles', 'Employee data', 'Revenue info', 'Growth signals']
    },
    {
      id: 'surfe-lookalikes',
      name: 'Surfe',
      description: 'Company lookalikes and similar companies',
      specialty: 'Company Lookalikes',
      successRate: '92%',
      pricing: '$0.40 per search',
      features: ['Lookalike finder', 'Similar companies', 'Market analysis', 'Competitor data']
    },
    {
      id: 'builtwith',
      name: 'BuiltWith',
      description: 'Technology stack and web analytics',
      specialty: 'Tech Stack Data',
      successRate: '94%',
      pricing: '$0.20 per lookup',
      features: ['Technology stack', 'Web analytics', 'E-commerce data', 'Lead generation']
    }
  ]
};

// Sample enrichment results for demo
export const generateSampleEnrichmentResult = (contact) => {
  const emailDomains = ['gmail.com', 'company.com', 'business.co', 'corp.net'];
  const phonePrefixes = ['+1-555', '+1-646', '+1-415', '+1-212'];
  
  return {
    ...contact,
    email: contact.email || `${contact.firstName.toLowerCase()}.${contact.lastName.toLowerCase()}@${contact.company.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: contact.phone || `${phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)]}-${Math.floor(Math.random() * 9000) + 1000}`,
    linkedinUrl: contact.linkedinUrl || `https://linkedin.com/in/${contact.firstName.toLowerCase()}${contact.lastName.toLowerCase()}`,
    status: 'enriched',
    enrichedAt: new Date(),
    confidence: Math.floor(Math.random() * 20) + 80,
    source: contact.source || 'api'
  };
};

// Sample analytics data
export const getAnalyticsData = () => {
  return {
    contactEnrichment: {
      emailDiscoveryRate: 92,
      phoneDiscoveryRate: 78,
      linkedinMatchRate: 96,
      overallSuccessRate: 92
    },
    companyEnrichment: {
      dataAccuracy: 95,
      industryClassification: 88,
      revenueDataFound: 76,
      overallSuccessRate: 88
    },
    weeklyUsage: {
      contactsThisWeek: 145,
      contactsLastWeek: 128,
      companiesThisWeek: 23,
      companiesLastWeek: 18,
      contactGrowth: 13.3,
      companyGrowth: 27.8
    },
    providerPerformance: [
      {
        provider: 'Surfe',
        type: 'Contact',
        successRate: 94,
        avgResponseTime: '1.2s',
        creditsUsed: 156,
        costPerLead: '$0.15'
      },
      {
        provider: 'Apollo.io',
        type: 'Contact',
        successRate: 91,
        avgResponseTime: '2.1s',
        creditsUsed: 89,
        costPerLead: '$0.20'
      },
      {
        provider: 'Clearbit',
        type: 'Company',
        successRate: 96,
        avgResponseTime: '0.8s',
        creditsUsed: 45,
        costPerLead: '$0.50'
      },
      {
        provider: 'Hunter.io',
        type: 'Email',
        successRate: 87,
        avgResponseTime: '1.5s',
        creditsUsed: 67,
        costPerLead: '$0.12'
      }
    ]
  };
};
