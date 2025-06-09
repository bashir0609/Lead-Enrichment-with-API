import React from 'react';
import { Building2, Mail, Phone, ExternalLink, Clock } from 'lucide-react';

const RecentContacts = ({ contacts }) => {
  const formatTimeAgo = (date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const enrichedDate = new Date(date);
    const diffInMinutes = Math.floor((now - enrichedDate) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Contacts
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
          View All
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No contacts yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Upload a CSV file or add contacts manually to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate">{contact.company}</span>
                  </div>
                  
                  {contact.email && (
                    <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                      <Mail className="h-3 w-3" />
                      <span>Email</span>
                    </div>
                  )}
                  
                  {contact.phone && (
                    <div className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400">
                      <Phone className="h-3 w-3" />
                      <span>Phone</span>
                    </div>
                  )}
                </div>

                {/* Enrichment Info */}
                {contact.enrichedAt && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Enriched {formatTimeAgo(contact.enrichedAt)}
                    </span>
                    {contact.confidence > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        • {contact.confidence}% confidence
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {contacts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Showing {contacts.length} recent contacts
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 dark:text-green-400">
                {contacts.filter(c => c.status === 'enriched').length} enriched
              </span>
              <span className="text-yellow-600 dark:text-yellow-400">
                {contacts.filter(c => c.status === 'pending').length} pending
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentContacts;
