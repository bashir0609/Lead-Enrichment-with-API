// API Provider configurations for LeadFlow

export const CONTACT_PROVIDERS = [
  {
    id: 'surfe',
    name: 'Surfe',
    description: 'Contact enrichment and email finder',
    specialty: 'B2B Contact Data',
    successRate: 94,
    avgResponseTime: '1.2s',
    pricing: '$0.15 per contact',
    baseUrl: 'https://api.surfe.com',
    features: [
      'Email discovery',
      'Phone numbers',
      'LinkedIn profiles',
      'Job details',
      'European data coverage'
    ],
    apiKeyRequired: true,
    documentation: 'https://docs.surfe.com',
    status: 'active'
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    description: 'B2B contact and company database',
    specialty: 'Contact Database',
    successRate: 91,
    avgResponseTime: '2.1s',
    pricing: '$0.20 per contact',
    baseUrl: 'https://api.apollo.io',
    features: [
      'Contact database',
      'Email finder',
      'Company data',
      'Technographics',
      'Job changes tracking'
    ],
    apiKeyRequired: true,
    documentation: 'https://apolloio.github.io/apollo-api-docs/',
    status: 'active'
  },
  {
    id: 'hunter',
    name: 'Hunter.io',
    description: 'Email finder and verification',
    specialty: 'Email Discovery',
    successRate: 87,
    avgResponseTime: '1.5s',
    pricing: '$0.12 per email',
    baseUrl: 'https://api.hunter.io',
    features: [
      'Email finder',
      'Email verification',
      'Domain search',
      'Author finder',
      'Bulk processing'
    ],
    apiKeyRequired: true,
    documentation: 'https://hunter.io/api-documentation',
    status: 'active'
  },
  {
    id: 'clearbit',
    name: 'Clearbit',
    description: 'Person and company enrichment',
    specialty: 'Data Quality',
    successRate: 89,
    avgResponseTime: '0.8s',
    pricing: '$0.25 per contact',
    baseUrl: 'https://person.clearbit.com',
    features: [
      'High data quality',
      'Social profiles',
      'Demographics',
      'Company data',
      'Real-time enrichment'
    ],
    apiKeyRequired: true,
    documentation: 'https://clearbit.com/docs',
    status: 'active'
  },
  {
    id: 'zoominfo',
    name: 'ZoomInfo',
    description: 'Enterprise contact database',
    specialty: 'Enterprise Contacts',
    successRate: 89,
    avgResponseTime: '1.8s',
    pricing: '$0.25 per contact',
    baseUrl: 'https://api.zoominfo.com',
    features: [
      'Contact database',
      'Intent data',
      'Org charts',
      'Direct dials',
      'Enterprise focus'
    ],
    apiKeyRequired: true,
    documentation: 'https://api-docs.zoominfo.com/',
    status: 'active'
  }
];

export const COMPANY_PROVIDERS = [
  {
    id: 'clearbit',
    name: 'Clearbit',
    description: 'Company enrichment and firmographic data',
    specialty: 'Company Intelligence',
    successRate: 96,
    avgResponseTime: '0.8s',
    pricing: '$0.50 per company',
    baseUrl: 'https://company.clearbit.com',
    features: [
      'Company data',
      'Technographics',
      'Funding info',
      'Employee count',
      'High accuracy'
    ],
    apiKeyRequired: true,
    documentation: 'https://clearbit.com/docs#enrichment-api',
    status: 'active'
  },
  {
    id: 'apollo-company',
    name: 'Apollo.io',
    description: 'Company database and insights',
    specialty: 'Company Database',
    successRate: 88,
    avgResponseTime: '2.1s',
    pricing: '$0.30 per company',
    baseUrl: 'https://api.apollo.io',
    features: [
      'Company profiles',
      'Employee data',
      'Revenue info',
      'Growth signals',
      'Technology stack'
    ],
    apiKeyRequired: true,
    documentation: 'https://apolloio.github.io/apollo-api-docs/',
    status: 'active'
  },
  {
    id: 'builtwith',
    name: 'BuiltWith',
    description: 'Technology stack and web analytics',
    specialty: 'Tech Stack Data',
    successRate: 94,
    avgResponseTime: '1.5s',
    pricing: '$0.20 per lookup',
    baseUrl: 'https://api.builtwith.com',
    features: [
      'Technology stack',
      'Web analytics',
      'E-commerce data',
      'Lead generation',
      'Historical data'
    ],
    apiKeyRequired: true,
    documentation: 'https://api.builtwith.com/domain-api',
    status: 'active'
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase',
    description: 'Funding and investment data',
    specialty: 'Funding Data',
    successRate: 85,
    avgResponseTime: '1.8s',
    pricing: '$0.40 per company',
    baseUrl: 'https://api.crunchbase.com',
    features: [
      'Funding data',
      'Investor info',
      'Company news',
      'Market analysis',
      'Startup focus'
    ],
    apiKeyRequired: true,
    documentation: 'https://data.crunchbase.com/docs',
    status: 'active'
  }
];

export const LOOKALIKE_PROVIDERS = [
  {
    id: 'surfe-lookalikes',
    name: 'Surfe Lookalikes',
    description: 'Company lookalikes and similar companies',
    specialty: 'Company Lookalikes',
    successRate: 92,
    avgResponseTime: '2.5s',
    pricing: '$0.40 per search',
    baseUrl: 'https://api.surfe.com/lookalikes',
    features: [
      'Lookalike finder',
      'Similar companies',
      'Market analysis',
      'Competitor data',
      'Industry insights'
    ],
    apiKeyRequired: true,
    documentation: 'https://docs.surfe.com/lookalikes',
    status: 'active'
  }
];

// Provider status constants
export const PROVIDER_STATUS = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  BETA: 'beta',
  MAINTENANCE: 'maintenance'
};

// API endpoint configurations
export const API_ENDPOINTS = {
  CONTACT_ENRICHMENT: '/api/v1/contacts/enrich',
  COMPANY_ENRICHMENT: '/api/v1/companies/enrich',
  LOOKALIKE_SEARCH: '/api/v1/companies/lookalikes',
  BULK_ENRICHMENT: '/api/v1/bulk/enrich',
  VERIFICATION: '/api/v1/verify'
};

// Credit costs for different operations
export const CREDIT_COSTS = {
  CONTACT_EMAIL: 1,
  CONTACT_PHONE: 2,
  CONTACT_LINKEDIN: 1,
  CONTACT_FULL: 3,
  COMPANY_BASIC: 2,
  COMPANY_TECH_STACK: 3,
  COMPANY_FUNDING: 2,
  COMPANY_CONTACTS: 5,
  LOOKALIKE_SEARCH: 4,
  EMAIL_VERIFICATION: 0.5
};

// Rate limits (requests per minute)
export const RATE_LIMITS = {
  surfe: 100,
  apollo: 60,
  hunter: 100,
  clearbit: 600,
  zoominfo: 50,
  builtwith: 200,
  crunchbase: 50
};

// Error codes and messages
export const API_ERRORS = {
  INVALID_API_KEY: 'Invalid API key provided',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please try again later.',
  INSUFFICIENT_CREDITS: 'Insufficient credits to complete this operation',
  INVALID_INPUT: 'Invalid input data provided',
  PROVIDER_UNAVAILABLE: 'Provider service is currently unavailable',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred'
};

// Default configurations
export const DEFAULT_CONFIG = {
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  batchSize: 50,
  maxConcurrentRequests: 5
};

// Data quality thresholds
export const QUALITY_THRESHOLDS = {
  EMAIL_CONFIDENCE: 80,
  PHONE_CONFIDENCE: 75,
  COMPANY_MATCH: 85,
  OVERALL_QUALITY: 70
};

// Export helper function to get provider by ID
export const getProviderById = (providerId, type = 'contact') => {
  const providers = type === 'contact' ? CONTACT_PROVIDERS : 
                   type === 'company' ? COMPANY_PROVIDERS : 
                   LOOKALIKE_PROVIDERS;
  
  return providers.find(provider => provider.id === providerId);
};

// Export helper function to get all active providers
export const getActiveProviders = (type = 'contact') => {
  const providers = type === 'contact' ? CONTACT_PROVIDERS : 
                   type === 'company' ? COMPANY_PROVIDERS : 
                   LOOKALIKE_PROVIDERS;
  
  return providers.filter(provider => provider.status === PROVIDER_STATUS.ACTIVE);
};

// Export helper function to calculate estimated credits
export const calculateCredits = (operation, count = 1) => {
  return (CREDIT_COSTS[operation] || 1) * count;
};

// Export helper function to validate API key format
export const validateApiKey = (providerId, apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  // Basic validation patterns for different providers
  const patterns = {
    surfe: /^sk_[a-zA-Z0-9]{32,}$/,
    apollo: /^[a-zA-Z0-9]{40,}$/,
    hunter: /^[a-f0-9]{40}$/,
    clearbit: /^sk_[a-f0-9]{32}$/,
    zoominfo: /^[A-Za-z0-9]{20,}$/,
    builtwith: /^[a-f0-9-]{36}$/,
    crunchbase: /^[a-f0-9]{32}$/
  };

  const pattern = patterns[providerId];
  return pattern ? pattern.test(apiKey) : apiKey.length >= 20;
};
