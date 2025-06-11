// src/utils/enrichmentSystem.js - Complete enrichment logic and API simulation

/**
 * Simulated API responses for different providers
 */
const API_RESPONSES = {
  surfe: {
    baseDelay: 1200,
    successRate: 0.94,
    generateContact: (input) => ({
      email: input.email || `${input.firstName?.toLowerCase()}.${input.lastName?.toLowerCase()}@${input.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
      linkedinUrl: `https://linkedin.com/in/${input.firstName?.toLowerCase()}${input.lastName?.toLowerCase()}`,
      confidence: Math.floor(Math.random() * 15) + 85,
      source: 'surfe'
    })
  },
  apollo: {
    baseDelay: 2100,
    successRate: 0.91,
    generateContact: (input) => ({
      email: input.email || `${input.firstName?.toLowerCase()}.${input.lastName?.toLowerCase()}@${input.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      linkedinUrl: `https://linkedin.com/in/${input.firstName?.toLowerCase()}${input.lastName?.toLowerCase()}`,
      jobLevel: Math.random() > 0.5 ? 'Senior' : 'Manager',
      confidence: Math.floor(Math.random() * 15) + 80,
      source: 'apollo'
    })
  },
  hunter: {
    baseDelay: 1500,
    successRate: 0.87,
    generateContact: (input) => ({
      email: input.email || `${input.firstName?.toLowerCase()}.${input.lastName?.toLowerCase()}@${input.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      emailVerified: Math.random() > 0.1,
      confidence: Math.floor(Math.random() * 20) + 75,
      source: 'hunter'
    })
  },
  clearbit: {
    baseDelay: 800,
    successRate: 0.89,
    generateContact: (input) => ({
      email: input.email || `${input.firstName?.toLowerCase()}.${input.lastName?.toLowerCase()}@${input.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
      linkedinUrl: `https://linkedin.com/in/${input.firstName?.toLowerCase()}${input.lastName?.toLowerCase()}`,
      location: input.location || ['New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Austin, TX'][Math.floor(Math.random() * 4)],
      timezone: 'America/New_York',
      confidence: Math.floor(Math.random() * 10) + 85,
      source: 'clearbit'
    })
  },
  zoominfo: {
    baseDelay: 1800,
    successRate: 0.89,
    generateContact: (input) => ({
      email: input.email || `${input.firstName?.toLowerCase()}.${input.lastName?.toLowerCase()}@${input.company?.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      directPhone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
      linkedinUrl: `https://linkedin.com/in/${input.firstName?.toLowerCase()}${input.lastName?.toLowerCase()}`,
      seniority: ['C-Level', 'VP', 'Director', 'Manager'][Math.floor(Math.random() * 4)],
      confidence: Math.floor(Math.random() * 15) + 80,
      source: 'zoominfo'
    })
  }
};

/**
 * Company enrichment API responses
 */
const COMPANY_API_RESPONSES = {
  clearbit: {
    baseDelay: 800,
    successRate: 0.96,
    generateCompany: (input) => ({
      industry: input.industry || ['Software', 'Technology', 'Consulting', 'Healthcare', 'Finance'][Math.floor(Math.random() * 5)],
      size: `${Math.floor(Math.random() * 500) + 50}-${Math.floor(Math.random() * 500) + 200}`,
      revenue: `${Math.floor(Math.random() * 100) + 10}M-${Math.floor(Math.random() * 100) + 50}M`,
      foundedYear: Math.floor(Math.random() * 30) + 1990,
      employees: Math.floor(Math.random() * 1000) + 100,
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'].slice(0, Math.floor(Math.random() * 3) + 2),
      funding: `Series ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
      confidence: Math.floor(Math.random() * 10) + 90,
      source: 'clearbit'
    })
  },
  apollo: {
    baseDelay: 2100,
    successRate: 0.88,
    generateCompany: (input) => ({
      industry: input.industry || ['Software', 'Technology', 'Consulting'][Math.floor(Math.random() * 3)],
      size: `${Math.floor(Math.random() * 300) + 50}-${Math.floor(Math.random() * 300) + 150}`,
      revenue: `${Math.floor(Math.random() * 50) + 5}M-${Math.floor(Math.random() * 50) + 25}M`,
      growthRate: `${Math.floor(Math.random() * 50) + 10}%`,
      confidence: Math.floor(Math.random() * 15) + 80,
      source: 'apollo'
    })
  },
  builtwith: {
    baseDelay: 1500,
    successRate: 0.94,
    generateCompany: (input) => ({
      technologies: [
        'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 
        'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes',
        'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'
      ].slice(0, Math.floor(Math.random() * 8) + 3),
      ecommerce: Math.random() > 0.7,
      cms: ['WordPress', 'Shopify', 'Magento', 'Custom'][Math.floor(Math.random() * 4)],
      analytics: ['Google Analytics', 'Mixpanel', 'Segment'][Math.floor(Math.random() * 3)],
      confidence: Math.floor(Math.random() * 10) + 85,
      source: 'builtwith'
    })
  }
};

/**
 * Credit costs for different enrichment operations
 */
export const CREDIT_COSTS = {
  CONTACT_EMAIL: 1,
  CONTACT_PHONE: 2,
  CONTACT_LINKEDIN: 1,
  CONTACT_FULL: 3,
  COMPANY_BASIC: 2,
  COMPANY_TECH_STACK: 3,
  COMPANY_FUNDING: 2,
  COMPANY_FULL: 5
};

/**
 * Simulate API call with realistic delays and success rates
 */
const simulateAPICall = async (provider, type = 'contact') => {
  const config = type === 'contact' ? API_RESPONSES[provider] : COMPANY_API_RESPONSES[provider];
  
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  // Add random variance to delay (±30%)
  const variance = 0.3;
  const delay = config.baseDelay * (1 + (Math.random() - 0.5) * variance);
  
  await new Promise(resolve => setTimeout(resolve, delay));

  // Simulate failures based on success rate
  if (Math.random() > config.successRate) {
    throw new Error(`API call failed for ${provider}`);
  }

  return config;
};

/**
 * Enrich a single contact using specified provider
 */
export const enrichContact = async (contact, provider = 'surfe', options = {}) => {
  try {
    const config = await simulateAPICall(provider, 'contact');
    const enrichedData = config.generateContact(contact);
    
    // Calculate credits used based on what data was found
    let creditsUsed = 0;
    if (enrichedData.email && !contact.email) creditsUsed += CREDIT_COSTS.CONTACT_EMAIL;
    if (enrichedData.phone && !contact.phone) creditsUsed += CREDIT_COSTS.CONTACT_PHONE;
    if (enrichedData.linkedinUrl && !contact.linkedinUrl) creditsUsed += CREDIT_COSTS.CONTACT_LINKEDIN;

    return {
      success: true,
      data: {
        ...contact,
        ...enrichedData,
        status: 'enriched',
        enrichedAt: new Date(),
        enrichedBy: provider,
        creditsUsed
      },
      creditsUsed,
      provider,
      confidence: enrichedData.confidence
    };
  } catch (error) {
    return {
      success: false,
      data: {
        ...contact,
        status: 'failed',
        enrichedAt: new Date(),
        enrichedBy: provider,
        error: error.message
      },
      creditsUsed: 1, // Still charge minimal credits for failed attempts
      provider,
      error: error.message
    };
  }
};

/**
 * Enrich a single company using specified provider
 */
export const enrichCompany = async (company, provider = 'clearbit', options = {}) => {
  try {
    const config = await simulateAPICall(provider, 'company');
    const enrichedData = config.generateCompany(company);
    
    // Calculate credits used
    const creditsUsed = CREDIT_COSTS.COMPANY_FULL;

    return {
      success: true,
      data: {
        ...company,
        ...enrichedData,
        enriched: true,
        enrichedAt: new Date(),
        enrichedBy: provider
      },
      creditsUsed,
      provider,
      confidence: enrichedData.confidence
    };
  } catch (error) {
    return {
      success: false,
      data: {
        ...company,
        enriched: false,
        enrichedAt: new Date(),
        enrichedBy: provider,
        error: error.message
      },
      creditsUsed: 1,
      provider,
      error: error.message
    };
  }
};

/**
 * Bulk enrich contacts with progress tracking
 */
export const bulkEnrichContacts = async (contacts, provider = 'surfe', options = {}) => {
  const {
    onProgress,
    batchSize = 5,
    maxConcurrent = 3,
    stopOnError = false
  } = options;

  const results = [];
  const totalContacts = contacts.length;
  let processed = 0;
  let totalCreditsUsed = 0;

  // Process in batches to avoid overwhelming the API
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    
    // Process batch with limited concurrency
    const batchPromises = batch.map(async (contact, index) => {
      try {
        const result = await enrichContact(contact, provider, options);
        totalCreditsUsed += result.creditsUsed;
        
        processed++;
        
        if (onProgress) {
          onProgress({
            processed,
            total: totalContacts,
            percentage: Math.round((processed / totalContacts) * 100),
            currentContact: contact,
            result,
            creditsUsed: totalCreditsUsed
          });
        }

        return result;
      } catch (error) {
        const failedResult = {
          success: false,
          data: { ...contact, status: 'failed', error: error.message },
          creditsUsed: 1,
          provider,
          error: error.message
        };

        processed++;
        if (onProgress) {
          onProgress({
            processed,
            total: totalContacts,
            percentage: Math.round((processed / totalContacts) * 100),
            currentContact: contact,
            result: failedResult,
            creditsUsed: totalCreditsUsed
          });
        }

        if (stopOnError) {
          throw error;
        }

        return failedResult;
      }
    });

    // Wait for current batch to complete
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Add small delay between batches to be respectful to APIs
    if (i + batchSize < contacts.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  return {
    results,
    summary: {
      total: totalContacts,
      successful: successful.length,
      failed: failed.length,
      successRate: Math.round((successful.length / totalContacts) * 100),
      totalCreditsUsed,
      avgCreditsPerContact: Math.round(totalCreditsUsed / totalContacts * 100) / 100
    },
    data: results.map(r => r.data)
  };
};

/**
 * Bulk enrich companies with progress tracking
 */
export const bulkEnrichCompanies = async (companies, provider = 'clearbit', options = {}) => {
  const {
    onProgress,
    batchSize = 3,
    maxConcurrent = 2,
    stopOnError = false
  } = options;

  const results = [];
  const totalCompanies = companies.length;
  let processed = 0;
  let totalCreditsUsed = 0;

  for (let i = 0; i < companies.length; i += batchSize) {
    const batch = companies.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (company) => {
      try {
        const result = await enrichCompany(company, provider, options);
        totalCreditsUsed += result.creditsUsed;
        
        processed++;
        
        if (onProgress) {
          onProgress({
            processed,
            total: totalCompanies,
            percentage: Math.round((processed / totalCompanies) * 100),
            currentCompany: company,
            result,
            creditsUsed: totalCreditsUsed
          });
        }

        return result;
      } catch (error) {
        const failedResult = {
          success: false,
          data: { ...company, enriched: false, error: error.message },
          creditsUsed: 1,
          provider,
          error: error.message
        };

        processed++;
        if (onProgress) {
          onProgress({
            processed,
            total: totalCompanies,
            percentage: Math.round((processed / totalCompanies) * 100),
            currentCompany: company,
            result: failedResult,
            creditsUsed: totalCreditsUsed
          });
        }

        if (stopOnError) {
          throw error;
        }

        return failedResult;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    if (i + batchSize < companies.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  return {
    results,
    summary: {
      total: totalCompanies,
      successful: successful.length,
      failed: failed.length,
      successRate: Math.round((successful.length / totalCompanies) * 100),
      totalCreditsUsed,
      avgCreditsPerCompany: Math.round(totalCreditsUsed / totalCompanies * 100) / 100
    },
    data: results.map(r => r.data)
  };
};

/**
 * Find similar companies (lookalike search)
 */
export const findSimilarCompanies = async (baseCompany, options = {}) => {
  const { limit = 10, provider = 'clearbit' } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate similar companies
    const industries = ['Software', 'Technology', 'SaaS', 'Consulting', 'Data Analytics'];
    const sizes = ['11-50', '51-200', '201-500', '501-1000'];
    const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA'];

    const similarCompanies = Array.from({ length: limit }, (_, index) => ({
      id: `similar-${Date.now()}-${index}`,
      name: `${['Tech', 'Data', 'Cloud', 'Smart', 'Digital'][Math.floor(Math.random() * 5)]} ${['Solutions', 'Systems', 'Corp', 'Inc', 'Labs'][Math.floor(Math.random() * 5)]}`,
      domain: `${['tech', 'data', 'cloud', 'smart', 'digital'][Math.floor(Math.random() * 5)]}${['corp', 'sys', 'lab'][Math.floor(Math.random() * 3)]}.com`,
      industry: baseCompany.industry || industries[Math.floor(Math.random() * industries.length)],
      size: baseCompany.size || sizes[Math.floor(Math.random() * sizes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      similarity: Math.floor(Math.random() * 30) + 70, // 70-100% similarity
      matchReasons: [
        'Same industry',
        'Similar company size',
        'Geographic proximity',
        'Technology stack overlap',
        'Business model similarity'
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      confidence: Math.floor(Math.random() * 20) + 80,
      revenue: `${Math.floor(Math.random() * 50) + 5}M-${Math.floor(Math.random() * 50) + 25}M`,
      employees: Math.floor(Math.random() * 500) + 50,
      foundedYear: Math.floor(Math.random() * 15) + 2005
    }));

    return {
      success: true,
      data: similarCompanies.sort((a, b) => b.similarity - a.similarity),
      creditsUsed: 4,
      baseCompany,
      searchCriteria: {
        industry: baseCompany.industry,
        size: baseCompany.size,
        location: baseCompany.location
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      creditsUsed: 1
    };
  }
};

/**
 * Validate API key format for different providers
 */
export const validateApiKey = (provider, apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return { valid: false, message: 'API key is required' };
  }

  const patterns = {
    surfe: /^sk_[a-zA-Z0-9]{32,}$/,
    apollo: /^[a-zA-Z0-9]{40,}$/,
    hunter: /^[a-f0-9]{40}$/,
    clearbit: /^sk_[a-f0-9]{32}$/,
    zoominfo: /^[A-Za-z0-9]{20,}$/
  };

  const pattern = patterns[provider];
  
  if (!pattern) {
    return { valid: apiKey.length >= 20, message: 'Unknown provider pattern' };
  }

  const isValid = pattern.test(apiKey);
  
  return {
    valid: isValid,
    message: isValid ? 'Valid API key format' : `Invalid ${provider} API key format`
  };
};

/**
 * Test API key by making a test call
 */
export const testApiKey = async (provider, apiKey) => {
  try {
    // Validate format first
    const formatValidation = validateApiKey(provider, apiKey);
    if (!formatValidation.valid) {
      throw new Error(formatValidation.message);
    }

    // Simulate API test call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random failures for demo (10% failure rate)
    if (Math.random() < 0.1) {
      throw new Error('API key authentication failed');
    }

    return {
      success: true,
      provider,
      message: 'API key is valid and working',
      lastTested: new Date(),
      rateLimitRemaining: Math.floor(Math.random() * 1000) + 500
    };
  } catch (error) {
    return {
      success: false,
      provider,
      error: error.message,
      lastTested: new Date()
    };
  }
};

/**
 * Get provider statistics and recommendations
 */
export const getProviderStats = () => {
  return Object.entries(API_RESPONSES).map(([provider, config]) => ({
    provider,
    successRate: Math.round(config.successRate * 100),
    avgResponseTime: `${config.baseDelay}ms`,
    cost: 'Variable',
    recommendation: config.successRate > 0.9 ? 'Highly Recommended' : 'Good',
    strengths: {
      surfe: ['High success rate', 'European data', 'Fast response'],
      apollo: ['Large database', 'Job tracking', 'Company insights'],
      hunter: ['Email verification', 'Domain search', 'Bulk processing'],
      clearbit: ['Data quality', 'Real-time', 'Social profiles'],
      zoominfo: ['Enterprise focus', 'Direct dials', 'Org charts']
    }[provider] || ['Good coverage', 'Reliable API', 'Fair pricing']
  }));
};

/**
 * Calculate enrichment cost estimate
 */
export const calculateEnrichmentCost = (contacts, companies, settings = {}) => {
  const {
    includeEmail = true,
    includePhone = true,
    includeLinkedIn = false,
    includeCompanyData = true,
    includeTechStack = false
  } = settings;

  let contactCredits = 0;
  let companyCredits = 0;

  // Contact enrichment costs
  contacts.forEach(contact => {
    if (!contact.email && includeEmail) contactCredits += CREDIT_COSTS.CONTACT_EMAIL;
    if (!contact.phone && includePhone) contactCredits += CREDIT_COSTS.CONTACT_PHONE;
    if (!contact.linkedinUrl && includeLinkedIn) contactCredits += CREDIT_COSTS.CONTACT_LINKEDIN;
  });

  // Company enrichment costs
  companies.forEach(company => {
    if (!company.enriched && includeCompanyData) companyCredits += CREDIT_COSTS.COMPANY_BASIC;
    if (includeTechStack) companyCredits += CREDIT_COSTS.COMPANY_TECH_STACK;
  });

  return {
    contactCredits,
    companyCredits,
    totalCredits: contactCredits + companyCredits,
    estimatedCost: (contactCredits + companyCredits) * 0.10, // $0.10 per credit
    breakdown: {
      contacts: {
        count: contacts.length,
        credits: contactCredits,
        avgPerContact: contacts.length > 0 ? Math.round(contactCredits / contacts.length * 100) / 100 : 0
      },
      companies: {
        count: companies.length,
        credits: companyCredits,
        avgPerCompany: companies.length > 0 ? Math.round(companyCredits / companies.length * 100) / 100 : 0
      }
    }
  };
};

// Export all functions
export default {
  enrichContact,
  enrichCompany,
  bulkEnrichContacts,
  bulkEnrichCompanies,
  findSimilarCompanies,
  validateApiKey,
  testApiKey,
  getProviderStats,
  calculateEnrichmentCost,
  CREDIT_COSTS
};
