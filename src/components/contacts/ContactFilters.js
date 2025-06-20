import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const ContactFilters = ({ filters, setFilters }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearFilters = () => {
    setFilters({
      status: 'all',
      source: 'all',
      hasEmail: 'all',
      hasPhone: 'all'
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== 'all');
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors ${
          hasActiveFilters()
            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm">Filters</span>
        {hasActiveFilters() && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
            {Object.values(filters).filter(value => value !== 'all').length}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </button>

      {/* Advanced Filters Dropdown */}
      {showAdvanced && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Advanced Filters
              </h3>
              <div className="flex items-center space-x-2">
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowAdvanced(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enrichment Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="enriched">✅ Enriched</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="failed">❌ Failed</option>
                </select>
              </div>

              {/* Source Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Source
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Sources</option>
                  <option value="manual">✋ Manual Entry</option>
                  <option value="csv-upload">📄 CSV Upload</option>
                  <option value="api">🔗 API Import</option>
                </select>
              </div>

              {/* Email Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Availability
                </label>
                <select
                  value={filters.hasEmail}
                  onChange={(e) => setFilters(prev => ({ ...prev, hasEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Contacts</option>
                  <option value="yes">📧 Has Email</option>
                  <option value="no">❌ Missing Email</option>
                </select>
              </div>

              {/* Phone Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Availability
                </label>
                <select
                  value={filters.hasPhone}
                  onChange={(e) => setFilters(prev => ({ ...prev, hasPhone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Contacts</option>
                  <option value="yes">📞 Has Phone</option>
                  <option value="no">❌ Missing Phone</option>
                </select>
              </div>
            </div>

            {/* Filter Summary */}
            {hasActiveFilters() && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Active Filters:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(filters).map(([key, value]) => {
                    if (value === 'all') return null;
                    
                    const filterLabels = {
                      status: {
                        enriched: 'Enriched',
                        pending: 'Pending',
                        failed: 'Failed'
                      },
                      source: {
                        manual: 'Manual',
                        'csv-upload': 'CSV',
                        api: 'API'
                      },
                      hasEmail: {
                        yes: 'Has Email',
                        no: 'No Email'
                      },
                      hasPhone: {
                        yes: 'Has Phone',
                        no: 'No Phone'
                      }
                    };

                    const label = filterLabels[key]?.[value] || value;

                    return (
                      <span
                        key={key}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                      >
                        <span>{label}</span>
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                          className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Filter Presets */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Filters:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFilters({ status: 'pending', source: 'all', hasEmail: 'no', hasPhone: 'all' })}
                  className="px-3 py-2 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                >
                  🔍 Needs Email
                </button>
                <button
                  onClick={() => setFilters({ status: 'pending', source: 'all', hasEmail: 'all', hasPhone: 'no' })}
                  className="px-3 py-2 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  📞 Needs Phone
                </button>
                <button
                  onClick={() => setFilters({ status: 'enriched', source: 'all', hasEmail: 'yes', hasPhone: 'yes' })}
                  className="px-3 py-2 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  ✅ Complete
                </button>
                <button
                  onClick={() => setFilters({ status: 'all', source: 'csv-upload', hasEmail: 'all', hasPhone: 'all' })}
                  className="px-3 py-2 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  📄 CSV Imports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFilters;
