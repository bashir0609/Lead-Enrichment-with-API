import React from 'react';
import { 
  Building2, Users, MapPin, Briefcase, DollarSign, 
  Globe, ExternalLink, Eye, TrendingUp, Target,
  Calendar, Phone, Mail, Linkedin
} from 'lucide-react';

const CompanyCard = ({ company, contacts, onViewContacts }) => {
  
  const getCompanyContacts = () => {
    return contacts?.filter(contact => 
      contact.company.toLowerCase() === company.name.toLowerCase()
    ) || [];
  };

  const companyContacts = getCompanyContacts();
  const enrichedCount = companyContacts.filter(c => c.status === 'enriched').length;
  const successRate = companyContacts.length > 0 ? 
    Math.round((enrichedCount / companyContacts.length) * 100) : 0;

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
      case 'data analytics':
        return '📊';
      case 'finance':
        return '💰';
      case 'healthcare':
        return '🏥';
      case 'education':
        return '🎓';
      case 'retail':
        return '🛍️';
      default:
        return '🏭';
    }
  };

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
        {/* Size and Location */}
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

        {/* Revenue */}
        {company.revenue && (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {company.revenue} revenue
            </span>
          </div>
        )}

        {/* Description */}
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
          <button
            onClick={onViewContacts}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium"
          >
            View All
          </button>
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

        {/* Progress Bar */}
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

      {/* Key Contacts Preview */}
      {companyContacts.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Key Contacts</h4>
          <div className="space-y-2">
            {companyContacts.slice(0, 2).map((contact, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {contact.firstName} {contact.lastName}
                  </span>
                  {contact.jobTitle && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      • {contact.jobTitle}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {contact.email && <Mail className="h-3 w-3 text-green-500" />}
                  {contact.phone && <Phone className="h-3 w-3 text-blue-500" />}
                  {contact.linkedinUrl && <Linkedin className="h-3 w-3 text-blue-600" />}
                </div>
              </div>
            ))}
            {companyContacts.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{companyContacts.length - 2} more contacts
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {company.foundedYear && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date().getFullYear() - company.foundedYear}
              </div>
              <div className="text-xs text-gray-500">years old</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {Math.floor(Math.random() * 50) + 50}
            </div>
            <div className="text-xs text-gray-500">lead score</div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Social Links */
