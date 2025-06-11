import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, UserPlus, Building2, Zap, PieChart, Settings, Database, 
  Sun, Moon, ChevronLeft, ChevronRight, Search, Upload, Loader, Filter,
  Mail, Phone, MapPin, Linkedin, Eye, Edit, Copy, Clock, CheckCircle, 
  AlertCircle, X, Plus, Download, RefreshCw, Bell, HelpCircle, User,
  ChevronDown, Menu, LogOut, CreditCard, Globe, Heart, Shield, Briefcase,
  DollarSign, ExternalLink, Target, Calendar, TrendingUp, Activity,
  Star, Tag, Trash2, Save, Info, ArrowRight, FileText, MoreVertical
} from 'lucide-react';
import { initializeSampleData } from '../utils/mockData';

// Import Components
import Dashboard from './dashboard/Dashboard';
import ContactsTab from './contacts/ContactsTab';
import ContactEnrichmentTab from './contacts/ContactEnrichmentTab';
import CompaniesTab from './companies/CompaniesTab';
import CompanyEnrichmentTab from './companies/CompanyEnrichmentTab';
import AnalyticsTab from './analytics/AnalyticsTab';
import SettingsTab from './settings/SettingsTab';
import UploadModal from './shared/UploadModal';
import ContactModal from './shared/ContactModal';

// Enhanced Sidebar Component
const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  stats, 
  darkMode, 
  toggleTheme 
}) => {
  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    { 
      id: 'contacts', 
      label: 'Contacts', 
      icon: Users,
      description: 'Manage contact database',
      badge: stats?.totalContacts || 0
    },
    { 
      id: 'contact-enrichment', 
      label: 'Contact Enrichment', 
      icon: UserPlus,
      description: 'Enrich contact data'
    },
    { 
      id: 'companies', 
      label: 'Companies', 
      icon: Building2,
      description: 'Company database'
    },
    { 
      id: 'company-enrichment', 
      label: 'Company Enrichment', 
      icon: Zap,
      description: 'Enrich company data'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: PieChart,
      description: 'Performance insights'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'API keys and preferences'
    }
  ];

  return (
    <div className={`${
      sidebarCollapsed ? 'w-16' : 'w-64'
    } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  LeadFlow
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enrichment Platform
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            title={sidebarCollapsed ? item.label : ''}
          >
            <div className="relative flex-shrink-0">
              <item.icon className="h-5 w-5" />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            
            {!sidebarCollapsed && (
              <div className="flex-1 text-left">
                <div className="font-medium">
                  {item.label}
                </div>
                <div className="text-xs opacity-75 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Credits Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {sidebarCollapsed ? '💳' : 'Credits'}
            </span>
            <button 
              onClick={toggleTheme} 
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
          
          {!sidebarCollapsed && (
            <>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.creditsRemaining || 850}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                remaining this month
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((stats?.creditsUsed || 150) / ((stats?.creditsUsed || 150) + (stats?.creditsRemaining || 850))) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{stats?.creditsUsed || 150} used</span>
                <span>{(stats?.creditsUsed || 150) + (stats?.creditsRemaining || 850)} total</span>
              </div>
              
              <button className="w-full mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium">
                Buy More Credits
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Header Component
const Header = ({ 
  activeTab, 
  sidebarCollapsed, 
  setSidebarCollapsed 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const tabDisplayNames = {
    'dashboard': 'Dashboard',
    'contacts': 'Contacts',
    'contact-enrichment': 'Contact Enrichment',
    'companies': 'Companies', 
    'company-enrichment': 'Company Enrichment',
    'analytics': 'Analytics',
    'settings': 'Settings'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {tabDisplayNames[activeTab] || 'Dashboard'}
            </h2>
            
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8 relative hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Enrichment Complete</p>
                      <p className="text-xs text-blue-800 dark:text-blue-200">5 contacts successfully enriched</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Low Credits</p>
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">Only 100 credits remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Simple Upload Modal
const SimpleUploadModal = ({ onClose, onUpload, type = 'contacts' }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload CSV File</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drop your CSV file here
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              or click to browse and select a file
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Choose File
            </label>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>• File must be in CSV format</p>
            <p>• First row should contain column headers</p>
            <p>• Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Enhanced Component
const LeadEnrichmentPlatform = () => {
  // Initialize state with proper localStorage handling
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('leadflow-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    hasEmail: 'all',
    hasPhone: 'all'
  });

  // Stats
  const [stats, setStats] = useState({
    totalContacts: 0,
    enrichedContacts: 0,
    successRate: 85,
    creditsUsed: 150,
    creditsRemaining: 850
  });

  // API Settings with proper localStorage handling
  const [apiSettings, setApiSettingsState] = useState(() => {
    try {
      const saved = localStorage.getItem('leadflow-api-settings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Wrapper function for setApiSettings that saves to localStorage
  const setApiSettings = (updater) => {
    setApiSettingsState(prev => {
      const newSettings = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('leadflow-api-settings', JSON.stringify(newSettings));
      } catch (error) {
        console.error('Failed to save API settings:', error);
      }
      return newSettings;
    });
  };

  // Apply dark mode to document and save to localStorage
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('leadflow-theme', darkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [darkMode]);

  // Initialize sample data
  useEffect(() => {
    try {
      const { sampleContacts, sampleCompanies } = initializeSampleData();
      setContacts(sampleContacts);
      setCompanies(sampleCompanies);
      setStats(prev => ({
        ...prev,
        totalContacts: sampleContacts.length,
        enrichedContacts: sampleContacts.filter(c => c.status === 'enriched').length
      }));
    } catch (error) {
      console.log('Using fallback data:', error);
      const fallbackContacts = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          company: 'TechCorp',
          jobTitle: 'Software Engineer',
          phone: '+1-555-0123',
          status: 'enriched'
        }
      ];
      setContacts(fallbackContacts);
      setStats(prev => ({
        ...prev,
        totalContacts: fallbackContacts.length,
        enrichedContacts: 1
      }));
    }
  }, []);

  // Theme toggle with proper localStorage saving
  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      try {
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('leadflow-theme', newMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
      return newMode;
    });
  };

  // CSV upload handler
  const handleCsvUpload = (file) => {
    console.log('Uploading file:', file.name);
    
    // Simple CSV parsing for demo
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('CSV file must contain at least a header row and one data row.');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const newContacts = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const contact = {
            id: Date.now() + index,
            status: 'pending',
            source: 'csv-upload',
            createdAt: new Date(),
            enrichedAt: null,
            confidence: 0
          };

          // Map CSV columns to contact properties
          headers.forEach((header, i) => {
            const normalizedHeader = header.toLowerCase();
            if (normalizedHeader.includes('first') && normalizedHeader.includes('name')) {
              contact.firstName = values[i] || '';
            } else if (normalizedHeader.includes('last') && normalizedHeader.includes('name')) {
              contact.lastName = values[i] || '';
            } else if (normalizedHeader.includes('email')) {
              contact.email = values[i] || '';
            } else if (normalizedHeader.includes('company')) {
              contact.company = values[i] || '';
            } else if (normalizedHeader.includes('job') || normalizedHeader.includes('title')) {
              contact.jobTitle = values[i] || '';
            } else if (normalizedHeader.includes('phone')) {
              contact.phone = values[i] || '';
            }
          });

          return contact;
        });

        setContacts(prev => [...prev, ...newContacts]);
        setStats(prev => ({
          ...prev,
          totalContacts: prev.totalContacts + newContacts.length
        }));

        setShowUploadModal(false);
        alert(`Successfully imported ${newContacts.length} contacts!`);
      } catch (error) {
        console.error('CSV parsing error:', error);
        alert('Error parsing CSV file. Please check the format.');
      }
    };
    
    reader.readAsText(file);
  };

  // Contact enrichment function
  const enrichContacts = async (contactIds) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContacts(prev => prev.map(contact => {
        if (contactIds.includes(contact.id) && contact.status === 'pending') {
          return {
            ...contact,
            email: contact.email || `${contact.firstName?.toLowerCase()}.${contact.lastName?.toLowerCase()}@${contact.company?.toLowerCase().replace(/\s+/g, '') || 'company'}.com`,
            phone: contact.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
            linkedinUrl: contact.linkedinUrl || `https://linkedin.com/in/${contact.firstName?.toLowerCase()}${contact.lastName?.toLowerCase()}`,
            status: 'enriched',
            enrichedAt: new Date(),
            confidence: Math.floor(Math.random() * 20) + 80
          };
        }
        return contact;
      }));

      // Update stats
      setStats(prev => ({
        ...prev,
        enrichedContacts: prev.enrichedContacts + contactIds.length,
        creditsUsed: prev.creditsUsed + (contactIds.length * 2)
      }));

      alert(`Successfully enriched ${contactIds.length} contacts!`);
    } catch (error) {
      console.error('Enrichment error:', error);
      alert('Enrichment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase());

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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            contacts={contacts} 
            stats={stats} 
            setShowUploadModal={setShowUploadModal} 
            setActiveTab={setActiveTab} 
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          stats={stats}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        
        <div className="flex-1 overflow-hidden">
          <Header 
            activeTab={activeTab}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          
          <main className="p-6 h-full overflow-y-auto">
            {renderActiveTab()}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <SimpleUploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleCsvUpload}
          type="contacts"
        />
      )}

      {showContactModal && selectedContact && (
        <ContactModal 
          contact={selectedContact}
          onClose={() => {
            setShowContactModal(false);
            setSelectedContact(null);
          }}
          onSave={(updatedContact) => {
            setContacts(prev => prev.map(c => 
              c.id === updatedContact.id ? updatedContact : c
            ));
            setShowContactModal(false);
            setSelectedContact(null);
          }}
        />
      )}
    </div>
  );
};

export default LeadEnrichmentPlatform;ShowUploadModal={setShowUploadModal} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'contacts':
        return (
          <ContactsTab 
            filteredContacts={filteredContacts}
            selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            enrichContacts={enrichContacts}
            loading={loading}
            setShowUploadModal={setShowUploadModal}
            setSelectedContact={setSelectedContact}
            setShowContactModal={setShowContactModal}
          />
        );
      case 'contact-enrichment':
        return (
          <ContactEnrichmentTab 
            contacts={contacts}
            loading={loading}
            enrichContacts={enrichContacts}
            setShowUploadModal={setShowUploadModal}
            apiSettings={apiSettings}
            setApiSettings={setApiSettings}
          />
        );
      case 'companies':
        return (
          <CompaniesTab 
            companies={companies}
            contacts={contacts}
            setShowUploadModal={setShowUploadModal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
      case 'company-enrichment':
        return (
          <CompanyEnrichmentTab 
            companies={companies}
            loading={loading}
            setShowUploadModal={setShowUploadModal}
            apiSettings={apiSettings}
            setApiSettings={setApiSettings}
          />
        );
      case 'analytics':
        return <AnalyticsTab contacts={contacts} companies={companies} stats={stats} />;
      case 'settings':
        return (
          <SettingsTab 
            apiSettings={apiSettings} 
            setApiSettings={setApiSettings} 
            darkMode={darkMode} 
            toggleTheme={toggleTheme} 
          />
        );
      default:
        return (
          <Dashboard 
            contacts={contacts} 
            stats={stats} 
            set
