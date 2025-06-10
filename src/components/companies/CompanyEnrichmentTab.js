import React, { useState } from 'react';
import { 
  Building2, Upload, Plus, Loader, CheckCircle, X, 
  Download, Eye, Copy, AlertCircle, Zap, Search,
  Target, TrendingUp, Globe, Users, DollarSign
} from 'lucide-react';

const CompanyEnrichmentTab = ({
  companies,
  loading,
  setShowUploadModal,
  apiSettings,
  setApiSettings
}) => {
  const [enrichmentSettings, setEnrichmentSettings] = useState({
    includeRevenue: true,
    includeEmployeeCount: true,
    includeTechnologies: true,
    includeFunding: false,
    includeContacts: false,
    includeSimilarCompanies: false
  });

  const [selectedProvider, setSelectedProvider] = useState('clearbit');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const pendingCompanies = companies?.filter(c => !c.enriched) || [];
  const recentEnrichments = companies?.filter(c => c.enriched)
    .sort((a, b) => new Date(b.enrichedAt || 0) - new Date(a.enrichedAt || 0))
    .slice(0, 10) || [];

  const calculateCredits = () => {
    let totalCredits = 0;
    if (enrichmentSettings.includeRevenue) totalCredits += pendingCompanies.length * 2;
    if (enrichmentSettings.includeEmployeeCount) totalCredits += pendingCompanies.length * 1;
    if (enrichmentSettings.includeTechnologies) totalCredits += pendingCompanies.length * 3;
    if (enrichmentSettings.includeFunding) totalCredits += pendingCompanies.length * 2;
    if (enrichmentSettings.includeContacts) totalCredits += pendingCompanies.length * 5;
    if (enrichmentSettings.includeSimilarCompanies) totalCredits += pendingCompanies.length * 4;
    return totalCredits;
  };

  const providers = [
    {
      id: 'clearbit',
      name: 'Clearbit',
      description: 'Company enrichment and firmographic data',
      successRate: '96%',
      avgResponseTime: '0.8s',
      strengths: ['High data quality', 'Technographics', 'Funding info']
    },
    {
      id: 'apollo-company',
      name: 'Apollo.io',
      description: 'Company database and insights',
      successRate: '88%',
      avgResponseTime: '2.1s',
      strengths: ['Employee data', 'Revenue info', 'Growth signals']
    },
    {
      id: 'builtwith',
      name: 'BuiltWith',
      description: 'Technology stack and web analytics',
      successRate: '94%',
      avgResponseTime: '1.5s',
      strengths: ['Tech stack', 'Web analytics', 'E-commerce data']
    },
    {
      id: 'crunchbase',
      name: 'Crunchbase',
      description: 'Funding and investment data',
      successRate: '85%',
      avgResponseTime: '1.8s',
      strengths: ['Funding data', 'Investor info', 'Company news']
    }
  ];

  const handleEnrichPendingCompanies = () => {
    const pendingIds = pendingCompanies.map(c => c.id);
    // enrichCompanies(pendingIds);
    console.log('Enriching companies:', pendingIds);
  };

  const handleCompanySearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for company:', searchQuery);
      // Implement company search/lookalike functionality
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Enrichment</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enhance your company data with revenue, employee count, technologies, and more
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{pendingCompanies.length}</div>
            <div className="text-sm text-gray-500">companies pending</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Queue</div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {pendingCompanies.length}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-green-600 dark:text-green-400 text-sm font-medium">Enriched Today</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {recentEnrichments.filter(c => 
                new Date(c.enrichedAt || 0).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">Est. Credits</div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {calculateCredits()}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Success Rate</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">96%</div>
          </div>
        </div>
      </div>

      {/* Main Enrichment Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Search & Lookalikes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Find Similar Companies
            </h3>
            
            <div className="flex space-x-3 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter company name or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={handleCompanySearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <Target className="h-5 w-5 text-blue-600 mb-2" />
                <div className="font-medium text-gray-900 dark:text-white text-sm">Similar Companies</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Find lookalikes</div>
              </button>
              
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <TrendingUp className="h-5 w-5 text-green-600 mb-2" />
                <div className="font-medium text-gray-900 dark:text-white text-sm">Market Analysis</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Industry insights</div>
              </button>
              
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <Globe className="h-5 w-5 text-purple-600 mb-2" />
                <div className="font-medium text-gray-900 dark:text-white text-sm">Tech Stack</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Technology analysis</div>
              </button>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Choose Enrichment Provider
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedProvider === provider.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{provider.successRate}</div>
                      <div className="text-xs text-gray-500">{provider.avgResponseTime}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {provider.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {provider.strengths.map((strength, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* API Key Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key for {providers.find(p => p.id === selectedProvider)?.name}
              </label>
              <input
                type="password"
                value={apiSettings[`${selectedProvider}ApiKey`] || ''}
                onChange={(e) => setApiSettings(prev => ({
                  ...prev,
                  [`${selectedProvider}ApiKey`]: e.target.value
                }))}
                placeholder={`Enter your ${selectedProvider} API key`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Data Fields Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Data to Enrich
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'includeRevenue', label: 'Revenue Data', icon: '💰', credits: 2, description: 'Annual revenue and financial info' },
                { key: 'includeEmployeeCount', label: 'Employee Count', icon: '👥', credits: 1, description: 'Current employee headcount' },
                { key: 'includeTechnologies', label: 'Technology Stack', icon: '⚡', credits: 3, description: 'Tech stack and tools used' },
                { key: 'includeFunding', label: 'Funding Information', icon: '🏦', credits: 2, description: 'Investment and funding history' },
                { key: 'includeContacts', label: 'Key Contacts', icon: '📇', credits: 5, description: 'Decision makers and contacts' },
                { key: 'includeSimilarCompanies', label: 'Similar Companies', icon: '🔍', credits: 4, description: 'Lookalike company suggestions' }
              ].map((field) => (
                <label key={field.key} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enrichmentSettings[field.key]}
                    onChange={(e) => setEnrichmentSettings(prev => ({
                      ...prev,
                      [field.key]: e.target.checked
                    }))}
                    className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{field.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{field.label}</span>
                      <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded">
                        {field.credits} credit{field.credits > 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {field.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Company Input Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Companies for Enrichment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white">Upload CSV</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bulk import companies</div>
                </div>
              </button>
              
              <button className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <Plus className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white">Add Manually</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Enter individual companies</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enrichment Summary & Controls */}
        <div className="space-y-6">
          {/* Enrichment Queue Summary */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enrichment Summary
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Companies in Queue:</span>
                <span className="font-medium text-gray-900 dark:text-white">{pendingCompanies.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Credits:</span>
                <span className="font-medium text-gray-900 dark:text-white">{calculateCredits()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                <span className="font-medium text-green-600">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Est. Completion:</span>
                <span className="font-medium text-gray-900 dark:text-white">~3 minutes</span>
              </div>
            </div>

            <button
              onClick={handleEnrichPendingCompanies}
              disabled={loading || pendingCompanies.length === 0}
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
              <span>
                {loading ? 'Enriching...' : `Enrich ${pendingCompanies.length} Companies`}
              </span>
            </button>

            {loading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Processing companies...</span>
                  <span>Step 1 of 3</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '33%' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Enrichments
            </h3>
            
            {recentEnrichments.length === 0 ? (
              <div className="text-center py-6">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No recent enrichments
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentEnrichments.slice(0, 5).map((company) => (
                  <div key={company.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {company.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {company.industry} • {company.size} employees
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {company.enrichedAt ? new Date(company.enrichedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Just now'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Market Intelligence */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Market Intelligence
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Growth Companies
                  </span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  15 fast-growing companies in your target market
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">
                    Similar Companies
                  </span>
                </div>
                <p className="text-xs text-green-800 dark:text-green-200">
                  23 companies similar to your best customers
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Tech Adopters
                  </span>
                </div>
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  42 companies using your target technologies
                </p>
              </div>
            </div>
            
            <button className="w-full mt-4 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 font-medium">
              Explore Market Intelligence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEnrichmentTab;
