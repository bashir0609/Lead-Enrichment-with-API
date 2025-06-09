{/* Contact Enrichment Tab */}
            {activeTab === 'contact-enrichment' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Enrichment</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Contact Enrichment Provider
                          </label>
                          <select
                            value={apiSettings.activeProvider}
                            onChange={(e) => setApiSettings(prev => ({ ...prev, activeProvider: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                          >
                            <option value="surfe">Surfe - Contact Data</option>
                            <option value="apollo">Apollo.io - B2B Contacts</option>
                            <option value="hunter">Hunter.io - Email Finder</option>
                            <option value="clearbit">Clearbit - Person API</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            API Key for {apiSettings.activeProvider}
                          </label>
                          <input
                            type="password"
                            value={apiSettings[`${apiSettings.activeProvider}ApiKey`]}
                            onChange={(e) => setApiSettings(prev => ({ 
                              ...prev, 
                              [`${apiSettings.activeProvider}ApiKey`]: e.target.value 
                            }))}
                            placeholder={`Enter your ${apiSettings.activeProvider} API key`}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Contact Data to Enrich</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">Email Addresses</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">Phone Numbers</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">LinkedIn Profiles</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">Job Details</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">Location Data</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                              <span className="text-sm text-blue-800 dark:text-blue-200">Social Profiles</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Contact CSV</span>
                          </button>
                          <span className="text-sm text-gray-500">or</span>
                          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Plus className="h-4 w-4" />
                            <span>Add Individual Contact</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Enrichment Queue</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Pending Contacts:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {contacts.filter(c => c.status === 'pending').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Email Credits:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {contacts.filter(c => c.status === 'pending').length * 1}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Phone Credits:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {contacts.filter(c => c.status === 'pending').length * 2}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                          <span className="font-medium text-green-600">92%</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => enrichContacts(contacts.filter(c => c.status === 'pending').map(c => c.id))}
                        disabled={loading || contacts.filter(c => c.status === 'pending').length === 0}
                        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                        <span>Enrich Contacts</span>
                      </button>

                      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Recent Activity</div>
                        <div className="text-sm text-gray-900 dark:text-white">3 contacts enriched</div>
                        <div className="text-xs text-gray-500">2 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Enrichment Results */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Contact Enrichments</h3>
                    <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                      <Download className="h-4 w-4" />
                      <span>Export Results</span>
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email Found</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Phone Found</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Confidence</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts
                          .filter(c => c.status === 'enriched')
                          .slice(0, 5)
                          .map((contact) => (
                            <tr key={contact.id} className="border-b border-gray-100 dark:border-gray-700">
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                    {contact.firstName[0]}{contact.lastName[0]}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                      {contact.firstName} {contact.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">{contact.company}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  {contact.email ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="text-sm text-gray-900 dark:text-white">Found</span>
                                    </>
                                  ) : (
                                    <>
                                      <X className="h-4 w-4 text-red-500" />
                                      <span className="text-sm text-gray-500">Not found</span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  {contact.phone ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="text-sm text-gray-900 dark:text-white">Found</span>
                                    </>
                                  ) : (
                                    <>
                                      <X className="h-4 w-4 text-red-500" />
                                      <span className="text-sm text-gray-500">Not found</span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {contact.confidence}%
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                  Enriched
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <button className="p-1 text-gray-500 hover:text-gray-700">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 text-gray-500 hover:text-gray-700">
                                    <Copy className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Company Enrichment Tab */}
            {activeTab === 'company-enrichment' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Company Enrichment</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Company Enrichment Provider
                          </label>
                          <select
                            value={apiSettings.activeProvider}
                            onChange={(e) => setApiSettings(prev => ({ ...prev, activeProvider: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                          >
                            <option value="clearbit">Clearbit - Company API</option>
                            <option value="apollo">Apollo.io - Company Database</option>
                            <option value="surfe">Surfe - Company Lookalikes</option>
                            <option value="hunter">Hunter.io - Domain Search</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company Input Method
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                              <input type="radio" name="input-method" defaultChecked className="text-blue-600" />
                              <span className="text-sm text-gray-900 dark:text-white">Domain Names</span>
                            </label>
                            <label className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                              <input type="radio" name="input-method" className="text-blue-600" />
                              <span className="text-sm text-gray-900 dark:text-white">Company Names</span>
                            </label>
                          </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Company Data to Enrich</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Company Size</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Industry</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Revenue Data</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Tech Stack</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Funding Info</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Social Profiles</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Key Personnel</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                              <span className="text-sm text-purple-800 dark:text-purple-200">Similar Companies</span>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Enter Domains/Companies (one per line)
                            </label>
                            <textarea
                              rows={6}
                              placeholder={`surfe.com\napollo.io\nhubspot.com\nsalesforce.com`}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => setShowUploadModal(true)}
                              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <Upload className="h-4 w-4" />
                              <span>Upload Company CSV</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Company Enrichment Queue</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Companies to Enrich:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {companies.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Credits per Company:</span>
                          <span className="font-medium text-gray-900 dark:text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Total Credits:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {companies.length * 3}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                          <span className="font-medium text-green-600">88%</span>
                        </div>
                      </div>
                      
                      <button
                        disabled={loading}
                        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Building2 className="h-4 w-4" />}
                        <span>Enrich Companies</span>
                      </button>

                      <div className="mt-4 space-y-2">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Processing</div>
                          <div className="text-sm text-gray-900 dark:text-white">TechCorp Solutions</div>
                          <div className="text-xs text-gray-500">In progress...</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-xs text-green-600 mb-1">Completed</div>
                          <div className="text-sm text-gray-900 dark:text-white">StartupXYZ</div>
                          <div className="text-xs text-gray-500">2 minutes ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Enrichment Results */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company Enrichment Results</h3>
                    <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                      <Download className="h-4 w-4" />
                      <span>Export Company Data</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {companies.map((company) => (
                      <div key={company.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold">
                              {company.name[0]}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{company.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{company.domain}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                            Enriched
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Industry:</span>
                            <div className="font-medium text-gray-900 dark:text-white">{company.industry}</div>
                          </div>
                          <div>
                            <span className="text-import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Search, Upload, Download, Filter, 
  Mail, Phone, Linkedin, Globe, MapPin, Briefcase,
  TrendingUp, Database, Zap, Settings, RefreshCw,
  Eye, Edit, Trash2, Plus, Check, X, AlertCircle,
  BarChart3, PieChart, Target, Star, Clock, Calendar,
  ExternalLink, Copy, CheckCircle, Loader, Sun, Moon,
  ChevronDown, ChevronRight, FileText, Tag, UserPlus
} from 'lucide-react';

const LeadEnrichmentPlatform = () => {
  // Theme and UI State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data States
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [enrichmentQueue, setEnrichmentQueue] = useState([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    enrichedContacts: 0,
    successRate: 0,
    creditsUsed: 0,
    creditsRemaining: 1000
  });

  // Loading and UI States
  const [loading, setLoading] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    hasEmail: 'all',
    hasPhone: 'all'
  });

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEnrichModal, setShowEnrichModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // API Integration Settings
  const [apiSettings, setApiSettings] = useState({
    surfeApiKey: '',
    apolloApiKey: '',
    hunterApiKey: '',
    clearbitApiKey: '',
    activeProvider: 'surfe'
  });

  // Sample data initialization
  useEffect(() => {
    initializeSampleData();
  }, []);

  const initializeSampleData = () => {
    const sampleContacts = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1-555-0123',
        linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
        company: 'TechCorp Solutions',
        jobTitle: 'VP of Sales',
        location: 'San Francisco, CA',
        status: 'enriched',
        source: 'manual',
        enrichedAt: new Date(Date.now() - 86400000),
        confidence: 95,
        tags: ['qualified', 'hot-lead']
      },
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: '',
        phone: '',
        linkedinUrl: 'https://linkedin.com/in/michaelchen',
        company: 'StartupXYZ',
        jobTitle: 'CTO',
        location: 'New York, NY',
        status: 'pending',
        source: 'csv-upload',
        enrichedAt: null,
        confidence: 0,
        tags: ['startup', 'tech']
      },
      {
        id: 3,
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.r@globalinc.com',
        phone: '+1-555-0456',
        linkedinUrl: '',
        company: 'Global Inc',
        jobTitle: 'Marketing Director',
        location: 'Chicago, IL',
        status: 'enriched',
        source: 'api',
        enrichedAt: new Date(Date.now() - 172800000),
        confidence: 88,
        tags: ['enterprise', 'decision-maker']
      }
    ];

    const sampleCompanies = [
      {
        id: 1,
        name: 'TechCorp Solutions',
        domain: 'techcorp.com',
        industry: 'Software',
        size: '201-500',
        location: 'San Francisco, CA',
        revenue: '$50M-$100M',
        contacts: 5,
        enrichedContacts: 4
      },
      {
        id: 2,
        name: 'StartupXYZ',
        domain: 'startupxyz.com',
        industry: 'Technology',
        size: '11-50',
        location: 'New York, NY',
        revenue: '$1M-$10M',
        contacts: 2,
        enrichedContacts: 1
      }
    ];

    setContacts(sampleContacts);
    setCompanies(sampleCompanies);
    setStats({
      totalContacts: sampleContacts.length,
      enrichedContacts: sampleContacts.filter(c => c.status === 'enriched').length,
      successRate: 85,
      creditsUsed: 150,
      creditsRemaining: 850
    });
  };

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Bulk enrichment
  const enrichContacts = async (contactIds) => {
    setLoading(true);
    try {
      // Simulate API enrichment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContacts(prev => prev.map(contact => {
        if (contactIds.includes(contact.id) && contact.status === 'pending') {
          return {
            ...contact,
            email: contact.email || `${contact.firstName.toLowerCase()}.${contact.lastName.toLowerCase()}@${contact.company.toLowerCase().replace(/\s+/g, '')}.com`,
            phone: contact.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
            status: 'enriched',
            enrichedAt: new Date(),
            confidence: Math.floor(Math.random() * 20) + 80
          };
        }
        return contact;
      }));

      setStats(prev => ({
        ...prev,
        enrichedContacts: prev.enrichedContacts + contactIds.length,
        creditsUsed: prev.creditsUsed + contactIds.length * 2,
        creditsRemaining: prev.creditsRemaining - contactIds.length * 2
      }));

      setSelectedContacts([]);
    } catch (error) {
      console.error('Enrichment error:', error);
    } finally {
      setLoading(false);
    }
  };

  // CSV upload simulation
  const handleCsvUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newContacts = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const contact = {
            id: Date.now() + index,
            firstName: values[0] || '',
            lastName: values[1] || '',
            email: values[2] || '',
            company: values[3] || '',
            jobTitle: values[4] || '',
            location: values[5] || '',
            phone: '',
            linkedinUrl: '',
            status: 'pending',
            source: 'csv-upload',
            enrichedAt: null,
            confidence: 0,
            tags: []
          };
          return contact;
        });

      setContacts(prev => [...prev, ...newContacts]);
      setStats(prev => ({
        ...prev,
        totalContacts: prev.totalContacts + newContacts.length
      }));
      setShowUploadModal(false);
    };
    reader.readAsText(file);
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'all' || contact.status === filters.status;
    const matchesSource = filters.source === 'all' || contact.source === filters.source;
    const matchesEmail = filters.hasEmail === 'all' || 
      (filters.hasEmail === 'yes' && contact.email) ||
      (filters.hasEmail === 'no' && !contact.email);
    const matchesPhone = filters.hasPhone === 'all' || 
      (filters.hasPhone === 'yes' && contact.phone) ||
      (filters.hasPhone === 'no' && !contact.phone);

    return matchesSearch && matchesStatus && matchesSource && matchesEmail && matchesPhone;
  });

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ContactCard = ({ contact }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.firstName[0]}{contact.lastName[0]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {contact.firstName} {contact.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.jobTitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            contact.status === 'enriched' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {contact.status}
          </span>
          {contact.confidence > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {contact.confidence}% confident
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Building2 className="h-4 w-4" />
          <span>{contact.company}</span>
        </div>
        {contact.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="h-4 w-4" />
            <span>{contact.email}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="h-4 w-4" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.location && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{contact.location}</span>
          </div>
        )}
      </div>

      {contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {contact.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {contact.linkedinUrl && (
            <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" 
               className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {contact.email && (
            <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
              <Copy className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedContact(contact);
              setShowContactModal(true);
            }}
            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">LeadFlow</h1>
                  <p className="text-xs text-gray-500">Enrichment Platform</p>
                </div>
              )}
            </div>
          </div>

          <nav className="px-6 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'contacts', label: 'Contacts', icon: Users },
              { id: 'contact-enrichment', label: 'Contact Enrichment', icon: UserPlus },
              { id: 'companies', label: 'Companies', icon: Building2 },
              { id: 'company-enrichment', label: 'Company Enrichment', icon: Zap },
              { id: 'analytics', label: 'Analytics', icon: PieChart },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Credits</span>
                <button onClick={toggleTheme} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.creditsRemaining}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">remaining</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronRight className={`h-5 w-5 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h2>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
                  <RefreshCw className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 h-full overflow-y-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Contacts"
                    value={stats.totalContacts}
                    icon={Users}
                    color="bg-blue-500"
                    subtitle="Active leads"
                  />
                  <StatCard
                    title="Enriched Contacts"
                    value={stats.enrichedContacts}
                    icon={CheckCircle}
                    color="bg-green-500"
                    subtitle={`${Math.round((stats.enrichedContacts / stats.totalContacts) * 100)}% success rate`}
                  />
                  <StatCard
                    title="Credits Used"
                    value={stats.creditsUsed}
                    icon={Zap}
                    color="bg-orange-500"
                    subtitle="This month"
                  />
                  <StatCard
                    title="Success Rate"
                    value={`${stats.successRate}%`}
                    icon={Target}
                    color="bg-purple-500"
                    subtitle="Overall accuracy"
                  />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Contacts</h3>
                    <div className="space-y-4">
                      {contacts.slice(0, 3).map((contact) => (
                        <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {contact.firstName} {contact.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            contact.status === 'enriched' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {contact.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        <span>Upload CSV</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('contact-enrichment')}
                        className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span>Contact Enrichment</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('company-enrichment')}
                        className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        <Zap className="h-5 w-5" />
                        <span>Company Enrichment</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>View Analytics</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="enriched">Enriched</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    {selectedContacts.length > 0 && (
                      <button
                        onClick={() => enrichContacts(selectedContacts)}
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                        <span>Enrich Selected ({selectedContacts.length})</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload CSV</span>
                    </button>
                  </div>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedContacts(prev => [...prev, contact.id]);
                            } else {
                              setSelectedContacts(prev => prev.filter(id => id !== contact.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <ContactCard contact={contact} />
                    </div>
                  ))}
                </div>
              </div>
            )}

                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" 
                               className="text-sm text-blue-600 hover:text-blue-800">
                              Visit Website
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                              <Users className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Lookalike Finder */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Find Similar Companies</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enter a company domain to find similar companies
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="surfe.com"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                          <Search className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Similarity Criteria</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Industry Match</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Company Size</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded text-indigo-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Revenue Range</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded text-indigo-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Geographic Location</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded text-indigo-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Technology Stack</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Similar Companies Found</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Apollo.io', domain: 'apollo.io', similarity: 95 },
                          { name: 'ZoomInfo', domain: 'zoominfo.com', similarity: 92 },
                          { name: 'Outreach', domain: 'outreach.io', similarity: 88 },
                          { name: 'Sales Navigator', domain: 'linkedin.com', similarity: 85 }
                        ].map((similar, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{similar.name}</div>
                              <div className="text-sm text-gray-500">{similar.domain}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {similar.similarity}% match
                              </div>
                              <button className="text-xs text-blue-600 hover:text-blue-800">
                                Add to enrichment
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Companies Tab */}
            {activeTab === 'companies' && (
              <div className="space-y-6">
                {/* Company Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Companies</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{companies.length}</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enriched</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{companies.length}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {companies.reduce((sum, company) => sum + company.contacts, 0)}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Success Rate</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">88%</p>
                      </div>
                      <Target className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Company List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company Database</h3>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search companies..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <button
                          onClick={() => setActiveTab('company-enrichment')}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Companies</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {companies.map((company) => (
                        <div key={company.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                                {company.name[0]}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{company.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{company.domain}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{company.industry}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{company.size} employees</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{company.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{company.revenue}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="text-gray-600 dark:text-gray-400">
                              {company.enrichedContacts}/{company.contacts} contacts enriched
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => setActiveTab('contacts')}
                                className="p-2 text-blue-600 hover:text-blue-800 rounded"
                              >
                                <Users className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Bulk Enrichment</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Enrichment Provider
                          </label>
                          <select
                            value={apiSettings.activeProvider}
                            onChange={(e) => setApiSettings(prev => ({ ...prev, activeProvider: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                          >
                            <option value="surfe">Surfe</option>
                            <option value="apollo">Apollo.io</option>
                            <option value="hunter">Hunter.io</option>
                            <option value="clearbit">Clearbit</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            API Key for {apiSettings.activeProvider}
                          </label>
                          <input
                            type="password"
                            value={apiSettings[`${apiSettings.activeProvider}ApiKey`]}
                            onChange={(e) => setApiSettings(prev => ({ 
                              ...prev, 
                              [`${apiSettings.activeProvider}ApiKey`]: e.target.value 
                            }))}
                            placeholder={`Enter your ${apiSettings.activeProvider} API key`}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Find Email Addresses</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Find Phone Numbers</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Company Information</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Social Profiles</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Enrichment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Pending Contacts:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {contacts.filter(c => c.status === 'pending').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Est. Credits:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {contacts.filter(c => c.status === 'pending').length * 2}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                          <span className="font-medium text-green-600">85-95%</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => enrichContacts(contacts.filter(c => c.status === 'pending').map(c => c.id))}
                        disabled={loading || contacts.filter(c => c.status === 'pending').length === 0}
                        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                        <span>Start Enrichment</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enrichment History */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Enrichments</h3>
                  <div className="space-y-3">
                    {contacts
                      .filter(c => c.status === 'enriched')
                      .slice(0, 5)
                      .map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {contact.firstName} {contact.lastName}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {contact.confidence}% confidence
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {contact.enrichedAt ? new Date(contact.enrichedAt).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab - Updated for separated enrichment */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Enrichment Analytics */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Enrichment Analytics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Email Discovery Rate</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Phone Discovery Rate</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">LinkedIn Match Rate</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">96%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">92%</div>
                          <p className="text-sm text-green-700 dark:text-green-300">Overall Contact Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Enrichment Analytics */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Enrichment Analytics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Company Data Accuracy</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Industry Classification</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Data Found</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">76%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">88%</div>
                          <p className="text-sm text-purple-700 dark:text-purple-300">Overall Company Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrichment Usage Trends</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Enrichment</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">This Week</span>
                          <span className="font-semibold text-gray-900 dark:text-white">145 contacts</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Last Week</span>
                          <span className="font-semibold text-gray-900 dark:text-white">128 contacts</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Growth</span>
                          <span className="font-semibold text-green-600">+13.3%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Company Enrichment</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">This Week</span>
                          <span className="font-semibold text-gray-900 dark:text-white">23 companies</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Last Week</span>
                          <span className="font-semibold text-gray-900 dark:text-white">18 companies</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Growth</span>
                          <span className="font-semibold text-green-600">+27.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Provider Performance Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Provider Performance</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Provider</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Success Rate</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Avg Response Time</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Credits Used</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Cost per Lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Surfe</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Contact</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">94%</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1.2s</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">156</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$0.15</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Apollo.io</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Contact</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">91%</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">2.1s</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">89</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$0.20</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Clearbit</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Company</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">96%</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">0.8s</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">45</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$0.50</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Hunter.io</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Email</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">87%</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1.5s</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">67</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$0.12</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )} className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                        <p className="text-gray-600 dark:text-gray-400">Overall Success Rate</p>
                        <div className="mt-4 w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Quality Score</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Email Accuracy</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Phone Accuracy</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Company Info</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">96%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Usage Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Chart visualization would go here</p>
                      <p className="text-sm">Integration with Chart.js or Recharts</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab - Updated for separated enrichment */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Contact Enrichment API Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Enrichment APIs</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        name: 'Surfe', 
                        key: 'surfeApiKey', 
                        description: 'Contact enrichment and email finder',
                        specialty: 'B2B Contact Data',
                        successRate: '94%'
                      },
                      { 
                        name: 'Apollo.io', 
                        key: 'apolloApiKey', 
                        description: 'B2B contact and company database',
                        specialty: 'Contact Database',
                        successRate: '91%'
                      },
                      { 
                        name: 'Hunter.io', 
                        key: 'hunterApiKey', 
                        description: 'Email finder and verification',
                        specialty: 'Email Discovery',
                        successRate: '87%'
                      },
                      { 
                        name: 'ZoomInfo', 
                        key: 'zoominfoApiKey', 
                        description: 'Enterprise contact database',
                        specialty: 'Enterprise Contacts',
                        successRate: '89%'
                      }
                    ].map((provider) => (
                      <div key={provider.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                              <UserPlus className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
                              <p className="text-xs text-gray-500">{provider.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`w-3 h-3 rounded-full ${
                              apiSettings[provider.key] ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <p className="text-xs text-gray-500 mt-1">{provider.successRate}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{provider.description}</p>
                        <input
                          type="password"
                          placeholder="Enter API key"
                          value={apiSettings[provider.key] || ''}
                          onChange={(e) => setApiSettings(prev => ({ ...prev, [provider.key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Enrichment API Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Company Enrichment APIs</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        name: 'Clearbit', 
                        key: 'clearbitApiKey', 
                        description: 'Company enrichment and firmographic data',
                        specialty: 'Company Intelligence',
                        successRate: '96%'
                      },
                      { 
                        name: 'Apollo.io', 
                        key: 'apolloCompanyApiKey', 
                        description: 'Company database and insights',
                        specialty: 'Company Database',
                        successRate: '88%'
                      },
                      { 
                        name: 'Surfe', 
                        key: 'surfeCompanyApiKey', 
                        description: 'Company lookalikes and similar companies',
                        specialty: 'Company Lookalikes',
                        successRate: '92%'
                      },
                      { 
                        name: 'BuiltWith', 
                        key: 'builtwithApiKey', 
                        description: 'Technology stack and web analytics',
                        specialty: 'Tech Stack Data',
                        successRate: '94%'
                      }
                    ].map((provider) => (
                      <div key={provider.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
                              <p className="text-xs text-gray-500">{provider.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`w-3 h-3 rounded-full ${
                              apiSettings[provider.key] ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <p className="text-xs text-gray-500 mt-1">{provider.successRate}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{provider.description}</p>
                        <input
                          type="password"
                          placeholder="Enter API key"
                          value={apiSettings[provider.key] || ''}
                          onChange={(e) => setApiSettings(prev => ({ ...prev, [provider.key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrichment Preferences */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Enrichment Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Enrichment Settings */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Contact Enrichment</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Auto-enrich new contacts</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically enrich contacts when uploaded</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Email verification</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Verify email addresses before saving</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Fallback providers</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Try secondary provider if first fails</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Minimum confidence score
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option>70%</option>
                            <option>80%</option>
                            <option>90%</option>
                            <option>95%</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Company Enrichment Settings */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Company Enrichment</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Auto-enrich new companies</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically enrich companies when added</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Find similar companies</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Auto-discover company lookalikes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Tech stack analysis</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Analyze company technology usage</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Data retention period
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option>30 days</option>
                            <option>90 days</option>
                            <option>1 year</option>
                            <option>Forever</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">General Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about enrichment completion</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Export data automatically</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Auto-export enriched data to your CRM</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Default export format
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          <option>CSV</option>
                          <option>Excel (XLSX)</option>
                          <option>JSON</option>
                          <option>Google Sheets</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Timezone
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          <option>UTC</option>
                          <option>EST (Eastern)</option>
                          <option>PST (Pacific)</option>
                          <option>GMT (London)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CSV Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload CSV File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => e.target.files[0] && handleCsvUpload(e.target.files[0])}
                className="hidden"
                id="csv-file-input"
              />
              <label
                htmlFor="csv-file-input"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Choose File
              </label>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2"><strong>Required columns:</strong> firstName, lastName, company</p>
              <p><strong>Optional:</strong> email, phone, jobTitle, location</p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Detail Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Details</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedContact.firstName[0]}{selectedContact.lastName[0]}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedContact.jobTitle}</p>
                    <p className="text-sm text-gray-500">{selectedContact.company}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="email"
                          value={selectedContact.email || ''}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        {selectedContact.email && (
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="tel"
                          value={selectedContact.phone || ''}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        {selectedContact.phone && (
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={selectedContact.linkedinUrl || ''}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      {selectedContact.linkedinUrl && (
                        <a
                          href={selectedContact.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:text-blue-800"
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
                    <input
                      type="text"
                      value={selectedContact.location || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Enrichment Info</h5>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        selectedContact.status === 'enriched' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedContact.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Source:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white capitalize">
                        {selectedContact.source.replace('-', ' ')}
                      </span>
                    </div>

                    {selectedContact.confidence > 0 && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                          {selectedContact.confidence}%
                        </span>
                      </div>
                    )}

                    {selectedContact.enrichedAt && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Enriched:</span>
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          {new Date(selectedContact.enrichedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedContact.tags.length > 0 && (
                    <div className="mt-4">
                      <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h6>
                      <div className="flex flex-wrap gap-1">
                        {selectedContact.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Edit className="h-4 w-4" />
                    <span>Edit Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadEnrichmentPlatform;
