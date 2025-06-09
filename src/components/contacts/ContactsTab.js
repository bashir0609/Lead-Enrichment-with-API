import React from 'react';
import { Search, Upload, Zap, Loader, Filter } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactFilters from './ContactFilters';

const ContactsTab = ({
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  enrichContacts,
  loading,
  setShowUploadModal,
  setSelectedContact,
  setShowContactModal
}) => {
  
  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const handleContactSelect = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    } else {
      setSelectedContacts(prev => [...prev, contactId]);
    }
  };

  const pendingContacts = filteredContacts.filter(contact => contact.status === 'pending');
  const enrichedContacts = filteredContacts.filter(contact => contact.status === 'enriched');

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
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
            />
          </div>

          {/* Quick Filters */}
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="enriched">Enriched</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filters.source}
            onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Sources</option>
            <option value="manual">Manual</option>
            <option value="csv-upload">CSV Upload</option>
            <option value="api">API</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Bulk Actions */}
          {selectedContacts.length > 0 && (
            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedContacts.length} selected
              </span>
              <button
                onClick={() => enrichContacts(selectedContacts)}
                disabled={loading}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {loading ? <Loader className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
                <span>Enrich</span>
              </button>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredContacts.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Contacts</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600">
            {enrichedContacts.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Enriched</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {pendingContacts.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filteredContacts.length > 0 ? Math.round((enrichedContacts.length / filteredContacts.length) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
        </div>
      </div>

      {/* Bulk Selection Controls */}
      {filteredContacts.length > 0 && (
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Select All ({filteredContacts.length})
              </span>
            </label>
            
            {pendingContacts.length > 0 && (
              <button
                onClick={() => setSelectedContacts(pendingContacts.map(c => c.id))}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                Select Pending ({pendingContacts.length})
              </button>
            )}
          </div>

          <ContactFilters filters={filters} setFilters={setFilters} />
        </div>
      )}

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No contacts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filters.status !== 'all' || filters.source !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Upload a CSV file or add contacts manually to get started'
            }
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Contacts</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={selectedContacts.includes(contact.id)}
              onSelect={() => handleContactSelect(contact.id)}
              onView={() => {
                setSelectedContact(contact);
                setShowContactModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Load More / Pagination */}
      {filteredContacts.length > 12 && (
        <div className="text-center pt-6">
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Load More Contacts
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
