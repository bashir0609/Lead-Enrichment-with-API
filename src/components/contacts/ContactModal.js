import React, { useState } from 'react';
import { 
  X, Edit, Save, Copy, ExternalLink, Mail, Phone, 
  Linkedin, MapPin, Building2, Briefcase, Clock, 
  Star, Tag, Plus, Trash2, CheckCircle, AlertCircle,
  User, Calendar, Activity, TrendingUp
} from 'lucide-react';

const ContactModal = ({ contact, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });
  const [activeTab, setActiveTab] = useState('details');
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(editedContact);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContact({ ...contact });
    setIsEditing(false);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log(`${type} copied to clipboard: ${text}`);
  };

  const addTag = () => {
    if (newTag.trim() && !editedContact.tags?.includes(newTag.trim())) {
      setEditedContact(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEditedContact(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
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

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDataCompleteness = () => {
    const fields = [
      editedContact.email,
      editedContact.phone,
      editedContact.linkedinUrl,
      editedContact.jobTitle,
      editedContact.location
    ];
    const filledFields = fields.filter(field => field && field.trim()).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const tabs = [
    { id: 'details', label: 'Contact Details', icon: User },
    { id: 'activity', label: 'Activity History', icon: Activity },
    { id: 'enrichment', label: 'Enrichment Data', icon: TrendingUp }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {contact.firstName[0]}{contact.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {contact.firstName} {contact.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{contact.jobTitle || 'No job title'}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                {contact.confidence > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.confidence}% confidence
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Contact Details Tab */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedContact.firstName}
                          onChange={(e) => setEditedContact(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{contact.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedContact.lastName}
                          onChange={(e) => setEditedContact(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{contact.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Job Title
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedContact.jobTitle || ''}
                          onChange={(e) => setEditedContact(prev => ({ ...prev, jobTitle: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{contact.jobTitle || 'Not specified'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedContact.company}
                          onChange={(e) => setEditedContact(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{contact.company}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedContact.email || ''}
                            onChange={(e) => setEditedContact(prev => ({ ...prev, email: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <p className="flex-1 text-gray-900 dark:text-white">
                            {contact.email || 'Not available'}
                          </p>
                        )}
                        {contact.email && !isEditing && (
                          <>
                            <button
                              onClick={() => copyToClipboard(contact.email, 'Email')}
                              className="p-2 text-gray-500 hover:text-gray-700 rounded"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <a
                              href={`mailto:${contact.email}`}
                              className="p-2 text-blue-600 hover:text-blue-800 rounded"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedContact.phone || ''}
                            onChange={(e) => setEditedContact(prev => ({ ...prev, phone: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <p className="flex-1 text-gray-900 dark:text-white">
                            {contact.phone || 'Not available'}
                          </p>
                        )}
                        {contact.phone && !isEditing && (
                          <>
                            <button
                              onClick={() => copyToClipboard(contact.phone, 'Phone')}
                              className="p-2 text-gray-500 hover:text-gray-700 rounded"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <a
                              href={`tel:${contact.phone}`}
                              className="p-2 text-blue-600 hover:text-blue-800 rounded"
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        LinkedIn Profile
                      </label>
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <input
                            type="url"
                            value={editedContact.linkedinUrl || ''}
                            onChange={(e) => setEditedContact(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <p className="flex-1 text-gray-900 dark:text-white truncate">
                            {contact.linkedinUrl || 'Not available'}
                          </p>
                        )}
                        {contact.linkedinUrl && !isEditing && (
                          <a
                            href={contact.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:text-blue-800 rounded"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedContact.location || ''}
                          onChange={(e) => setEditedContact(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{contact.location || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tags
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(editedContact.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm"
                      >
                        <span>{tag}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeTag(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      />
                      <button
                        onClick={addTag}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Data Completeness */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Data Completeness
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600">{getDataCompleteness()}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getDataCompleteness()}%` }}
                    ></div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      {contact.email ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={contact.email ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
                        Email Address
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {contact.phone ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={contact.phone ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
                        Phone Number
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {contact.linkedinUrl ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={contact.linkedinUrl ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
                        LinkedIn Profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Metadata */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Metadata
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Contact ID:</span>
                      <span className="ml-2 text-gray-900 dark:text-white font-mono text-xs">
                        {contact.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity History Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Activity Timeline
                </h3>

                <div className="space-y-4">
                  {/* Sample activity items */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Contact Enriched</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Email and phone number successfully found via {apiSettings?.activeProvider || 'Surfe'} API
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(contact.enrichedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Contact Added</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Contact added via {contact.source?.replace('-', ' ')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(contact.createdAt || Date.now() - 86400000)}
                      </p>
                    </div>
                  </div>

                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Tag className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Tags Applied</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Tagged as: {contact.tags.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(contact.updatedAt || Date.now() - 3600000)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Engagement Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Engagement Summary
                </h3>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Emails Sent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calls Made</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Meetings</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enrichment Data Tab */}
          {activeTab === 'enrichment' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Enrichment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Data Quality Scores */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Data Quality</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Overall Confidence</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {contact.confidence || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${contact.confidence || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {contact.email && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Email Accuracy</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">95%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                      )}

                      {contact.phone && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Phone Accuracy</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">88%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enrichment Source */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Enrichment Source</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {apiSettings?.activeProvider || 'Surfe'} API
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Primary enrichment source</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>

                      {contact.status === 'enriched' && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>• Email discovered via domain pattern matching</p>
                          <p>• Phone number found in professional database</p>
                          <p>• LinkedIn profile matched via name + company</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw Data */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Raw Contact Data
                </h3>
                
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {JSON.stringify(contact, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 className="h-4 w-4" />
              <span>Delete Contact</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </a>
            )}
            
            {contact.linkedinUrl && (
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>View LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;Source:</span>
                      <span className="ml-2 text-gray-900 dark:text-white capitalize">
                        {contact.source?.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Added:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {formatDate(contact.createdAt || Date.now())}
                      </span>
                    </div>
                    {contact.enrichedAt && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Enriched:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {formatDate(contact.enrichedAt)}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
