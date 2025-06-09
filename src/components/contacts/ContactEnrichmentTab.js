import React, { useState } from 'react';
import { 
  UserPlus, Upload, Plus, Loader, CheckCircle, X, 
  Download, Eye, Copy, AlertCircle, Zap 
} from 'lucide-react';

const ContactEnrichmentTab = ({
  contacts,
  loading,
  enrichContacts,
  setShowUploadModal,
  apiSettings,
  setApiSettings
}) => {
  const [enrichmentSettings, setEnrichmentSettings] = useState({
    includeEmail: true,
    includeMobile: true,
    includeLinkedIn: false,
    includeJobDetails: false,
    includeLocation: false,
    includeSocialProfiles: false
  });

  const [selectedProvider, setSelectedProvider] = useState('surfe');

  const pendingContacts = contacts.filter(c => c.status === 'pending');
  const recentEnrichments = contacts
    .filter(c => c.status === 'enriched')
    .sort((a, b) => new Date(b.enrichedAt) - new Date(a.enrichedAt))
    .slice(0, 10);

  const calculateCredits = () => {
    let totalCredits = 0;
    if (enrichmentSettings.includeEmail) totalCredits += pendingContacts.length * 1;
    if (enrichmentSettings.includeMobile) totalCredits += pendingContacts.length * 2;
    if (enrichmentSettings.includeLinkedIn) totalCredits += pendingContacts.length * 1;
    if (enrichmentSettings.includeJobDetails) totalCredits += pendingContacts.length * 1;
    return totalCredits;
  };

  const providers = [
    {
      id: 'surfe',
      name: 'Surfe',
      description: 'Contact enrichment and email finder',
      successRate: '94%',
      avgResponseTime: '1.2s',
      strengths: ['High email accuracy', 'LinkedIn matching', 'European data']
    },
    {
      id: 'apollo',
      name: 'Apollo.io',
      description: 'B2B contact and company database',
      successRate: '91%',
      avgResponseTime: '2.1s',
      strengths: ['Large database', 'Job changes tracking', 'Intent data']
    },
    {
      id: 'hunter',
      name: 'Hunter.io',
      description: 'Email finder and verification',
      successRate: '87%',
      avgResponseTime: '1.5s',
      strengths: ['Email verification', 'Domain patterns', 'Bulk processing']
    },
    {
      id: 'clearbit',
      name: 'Clearbit',
      description: 'Person and company enrichment',
      successRate: '89%',
      avgResponseTime: '0.8s',
      strengths: ['Data quality', 'Social profiles', 'Demographics']
    }
  ];

  const handleEnrichPendingContacts = () => {
    const pendingIds = pendingContacts.map(c => c.id);
    enrichContacts(pendingIds);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Enrichment</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enhance your contact data with emails, phone numbers, and professional information
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{pendingContacts.length}</div>
            <div className="text-sm text-gray-500">contacts pending</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Queue</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {pendingContacts.length}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-green-600 dark:text-green-400 text-sm font-medium">Enriched Today</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {recentEnrichments.filter(c => 
                new Date(c.enrichedAt).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">Est. Credits</div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {calculateCredits()}
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">Success Rate</div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">94%</div>
          </div>
        </div>
      </div>

      {/* Main Enrichment Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
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
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
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
                { key: 'includeEmail', label: 'Email Addresses', icon: '📧', credits: 1, description: 'Professional email addresses' },
                { key: 'includeMobile', label: 'Phone Numbers', icon: '📱', credits: 2, description: 'Mobile and direct phone numbers' },
                { key: 'includeLinkedIn', label: 'LinkedIn Profiles', icon: '💼', credits: 1, description: 'Professional LinkedIn profiles' },
                { key: 'includeJobDetails', label: 'Job Details', icon: '🏢', credits: 1, description: 'Job title, seniority, department' },
                { key: 'includeLocation', label: 'Location Data', icon: '📍', credits: 1, description: 'City, state, country information' },
                { key: 'includeSocialProfiles', label: 'Social Profiles', icon: '🔗', credits: 1, description: 'Twitter, Facebook, other socials' }
              ].map((field) => (
                <label key={field.key} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enrichmentSettings[field.key]}
                    onChange={(e) => setEnrichmentSettings(prev => ({
                      ...prev,
                      [field.key]: e.target.checked
                    }))}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{field.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{field.label}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
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

          {/* Contact Input Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Contacts for Enrichment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white">Upload CSV</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bulk import contacts</div>
                </div>
              </button>
              
              <button className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                <Plus className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white">Add Manually</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Enter individual contacts</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enrichment Summary & Controls */}
        <div className="space-y-6">
          {/* Enrichment Queue Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enrichment Summary
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Contacts in Queue:</span>
                <span className="font-medium text-gray-900 dark:text-white">{pendingContacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Credits:</span>
                <span className="font-medium text-gray-900 dark:text-white">{calculateCredits()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Est. Completion:</span>
                <span className="font-medium text-gray-900 dark:text-white">~2 minutes</span>
              </div>
            </div>

            <button
              onClick={handleEnrichPendingContacts}
              disabled={loading || pendingContacts.length === 0}
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
              <span>
                {loading ? 'Enriching...' : `Enrich ${pendingContacts.length} Contacts`}
              </span>
            </button>

            {/* Progress indicator when loading */}
            {loading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Processing contacts...</span>
                  <span>Step 1 of 3</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '33%' }}></div>
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
                <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No recent enrichments
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentEnrichments.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {contact.company} • {contact.confidence}% confident
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(contact.enrichedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEnrichmentTab;
