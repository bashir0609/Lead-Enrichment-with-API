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
      foundedYear: 2015,
      description: 'Enterprise software solutions for modern businesses',
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB']
    },
    {
      id: 2,
      name: 'StartupXYZ',
      domain: 'startupxyz.com',
      industry: 'Technology',
      size: '11-50',
      location: 'New York, NY',
      revenue: '$1M-$10M',
      foundedYear: 2020,
      description: 'AI-powered analytics platform for e-commerce',
      technologies: ['Python', 'TensorFlow', 'Docker', 'PostgreSQL']
    },
    {
      id: 3,
      name: 'Global Inc',
      domain: 'globalinc.com',
      industry: 'Consulting',
      size: '1001-5000',
      location: 'Chicago, IL',
      revenue: '$500M+',
      foundedYear: 1995,
      description: 'Global management consulting and technology services',
      technologies: ['Salesforce', 'Microsoft', 'SAP', 'Oracle']
    }
  ];

  return { sampleContacts, sampleCompanies };
};
