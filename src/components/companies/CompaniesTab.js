import React, { useState } from 'react';
import { 
  Search, Upload, Building2, Filter, MoreVertical,
  MapPin, Users, DollarSign, Globe, ExternalLink,
  Eye, Edit, Trash2, Plus
} from 'lucide-react';

const CompaniesTab = ({ 
  companies, 
  contacts,
  setShowUploadModal,
  searchTerm,
  setSearchTerm 
}) => {
  const [filters, setFilters] = useState({
    industry: 'all',
    size: 'all',
    location: 'all',
    revenue: 'all'
  });

  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Get unique filter options
  const industries = [...new Set(companies?.map(c => c.industry) || [])];
  const sizes = [...new Set(companies?.map(c => c.size) || [])];
  const locations = [...new Set(companies?.map(c => c.location) || [])];

  // Filter companies
  const filteredCompanies = companies?.filter(company => {
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = filters.industry === 'all' || company.industry === filters.industry;
    const matchesSize = filters.size === 'all' || company.size === filters.size;
    const matchesLocation = filters.location === 'all' || company.location.includes(filters.location);

    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  }) || [];

  const getCompanyContacts = (companyName) => {
    return contacts?.filter(contact => 
      contact.company.toLowerCase() === companyName.toLowerCase()
    ) || [];
  };

  const getSizeColor = (size) => {
    const sizeNum = parseInt(size.split('-')[0]);
    if (sizeNum < 50) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (sizeNum < 200) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (sizeNum < 1000) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  };

  const getIndustryIcon = (industry) => {
    switch (industry.toLowerCase()) {
      case 'software':
      case 'technology':
        return '💻';
      case 'consulting':
        return '🏢';
      case 'saas':
        return '☁️';
      default:
        return '🏭';
    }
  };

  const CompanyCard = ({ company }) => {
    const companyContacts = getCompanyContacts(company.name);
    const enrichedCount = companyContacts.filter(c => c.status === 'enriched').length;
    const successRate = companyContacts.length > 0 ? 
      Math.round((enrichedCount / companyContacts.length) * 100) : 0;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {company.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {company.name}
              </h3>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                >
                  {company.domain}
                </a>
                <ExternalLink className="h-3 w-3 text-gray-400 hover:text-blue-600 flex-shrink-0" />
              </div>
            </div>
          </div>
          
          {/* Industry Badge */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            <span className="text-sm">{getIndustryIcon(company.industry)}</span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {company.industry}
            </span>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSizeColor(company.size)}`}>
                {company.size}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {company.location}
              </span>
            </div>
          </div>

          {company.revenue && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {company.revenue} revenue
              </span>
            </div>
          )}

          {company.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {company.description}
            </p>
          )}
        </div>

        {/* Contact Stats */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Contact Data</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {companyContacts.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">
                {enrichedCount}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Enriched</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">
                {successRate}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Success</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        {company.technologies && company.technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Tech Stack</h4>
            <div className="flex flex-wrap gap-1">
              {company.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                >
                  {tech}
                </span>
              ))}
              {company.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                  +{company.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Founded {company.foundedYear}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
            />
          </div>

          {/* Quick Filters */}
          <select
            value={filters.industry}
            onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={filters.size}
            onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Sizes</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size} employees</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload CSV</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredCompanies.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Companies</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {industries.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Industries</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {filteredCompanies.reduce((total, company) => {
              return total + getCompanyContacts(company.name).length;
            }, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Contacts</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(filteredCompanies.reduce((total, company) => {
              const companyContacts = getCompanyContacts(company.name);
              const enrichedCount = companyContacts.filter(c => c.status === 'enriched').length;
              return total + (companyContacts.length > 0 ? (enrichedCount / companyContacts.length) * 100 : 0);
            }, 0) / (filteredCompanies.length || 1))}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Success Rate</div>
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No companies found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || Object.values(filters).some(f => f !== 'all')
              ? 'Try adjusting your search or filters'
              : 'Upload a CSV file or add companies manually to get started'
            }
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Companies</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredCompanies.length > 12 && (
        <div className="text-center pt-6">
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Load More Companies
          </button>
        </div>
      )}
    </div>
  );
};

export default CompaniesTab;
