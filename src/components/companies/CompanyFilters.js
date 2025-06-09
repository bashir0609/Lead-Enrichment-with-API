import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const CompanyFilters = ({ filters, setFilters, industries, sizes }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearFilters = () => {
    setFilters({
      industry: 'all',
      size: 'all',
      location: 'all',
      revenue: 'all'
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== 'all');
  };

  const revenueRanges = [
    '$0-$1M',
    '$1M-$10M', 
    '$10M-$50M',
    '$50M-$100M',
    '$100M-$500M',
    '$500M+'
  ];

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors ${
          hasActiveFilters()
            ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm">Filters</span>
        {hasActiveFilters() && (
          <span className="bg-purple-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
            {Object.values(filters).filter(value => value !== 'all').length}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </button>

      {/* Advanced Filters Dropdown */}
      {showAdvanced && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Company Filters
              </h3>
              <div className="flex items-center space-x-2">
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
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
            <div className="grid grid-cols-2 gap-4">
              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Company Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Size
                </label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Sizes</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size} employees</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location === 'all' ? '' : filters.location}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    location: e.target.value || 'all' 
                  }))}
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Revenue Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Revenue Range
                </label>
                <select
                  value={filters.revenue}
                  onChange={(e) => setFilters(prev => ({ ...prev, revenue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Revenue</option>
                  {revenueRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters() && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Active Filters:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(filters).map(([key, value]) => {
                    if (value === 'all') return null;
                    
                    const filterLabels = {
                      industry: value,
                      size: `${value} employees`,
                      location: value,
                      revenue: value
                    };

                    const label = filterLabels[key] || value;

                    return (
                      <span
                        key={key}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-xs"
                      >
                        <span>{label}</span>
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                          className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
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
                  onClick={() => setFilters({ industry: 'Software', size: 'all', location: 'all', revenue: 'all' })}
                  className="px-3 py-2 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  💻 Software Companies
                </button>
                <button
                  onClick={() => setFilters({ industry: 'all', size: '11-50', location: 'all', revenue: 'all' })}
                  className="px-3 py-2 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  🚀 Startups
                </button>
                <button
                  onClick={() => setFilters({ industry: 'all', size: 'all', location: 'all', revenue: '$100M-$500M' })}
                  className="px-3 py-2 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  🏢 Enterprise
                </button>
                <button
                  onClick={() => setFilters({ industry: 'Technology', size: 'all', location: 'all', revenue: '$10M-$50M' })}
                  className="px-3 py-2 text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                >
                  ⚡ Growth Stage
                </button>
              </div>
            </div>

            {/* Filter Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Filter matches will be shown in real-time as you adjust criteria
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFilters;
