import React from 'react';
import { 
  Building2, Mail, Phone, MapPin, Linkedin, 
  Eye, Edit, Copy, Clock, CheckCircle, 
  AlertCircle, ExternalLink 
} from 'lucide-react';

const ContactCard = ({ contact, isSelected, onSelect, onView }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'enriched':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'manual':
        return '✋';
      case 'csv-upload':
        return '📄';
      case 'api':
        return '🔗';
      default:
        return '❓';
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return null;
    
    const now = new Date();
    const enrichedDate = new Date(date);
    const diffInMinutes = Math.floor((now - enrichedDate) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log(`${type} copied to clipboard: ${text}`);
  };

  const getDataCompleteness = () => {
    const fields = [
      contact.email,
      contact.phone,
      contact.linkedinUrl,
      contact.jobTitle,
      contact.location
    ];
    const filledFields = fields.filter(field => field && field.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
      isSelected 
        ? 'border-blue-500 shadow-md' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`}>
      
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 pt-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {contact.firstName[0]}{contact.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {contact.firstName} {contact.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {contact.jobTitle || 'No job title'}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
              {contact.status}
            </span>
            {contact.confidence > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {contact.confidence}% confident
              </span>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          {/* Company */}
          <div className="flex items-center space-x-2 text-sm">
            <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 truncate">
              {contact.company || 'No company'}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
            {contact.email ? (
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {contact.email}
                </span>
                <button
                  onClick={() => copyToClipboard(contact.email, 'Email')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <span className="text-gray-400 italic">No email</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
            {contact.phone ? (
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {contact.phone}
                </span>
                <button
                  onClick={() => copyToClipboard(contact.phone, 'Phone')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <span className="text-gray-400 italic">No phone</span>
            )}
          </div>

          {/* Location */}
          {contact.location && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 truncate">
                {contact.location}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {contact.tags && contact.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {contact.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
              >
                {tag}
              </span>
            ))}
            {contact.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                +{contact.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Data Completeness Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Data Completeness</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{getDataCompleteness()}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${getDataCompleteness()}%` }}
            ></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Source and Time */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <span className="text-sm">{getSourceIcon(contact.source)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {contact.source?.replace('-', ' ')}
              </span>
            </div>
            
            {contact.enrichedAt && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(contact.enrichedAt)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {contact.linkedinUrl && (
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="View LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            
            <button
              onClick={onView}
              className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit Contact"
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        {contact.status === 'enriched' && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
        
        {contact.status === 'pending' && (
          <div className="absolute top-2 right-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
