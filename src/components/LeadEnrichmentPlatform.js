import React, { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Dashboard from './dashboard/Dashboard';
import ContactsTab from './contacts/ContactsTab';
import ContactEnrichmentTab from './contacts/ContactEnrichmentTab';
import CompaniesTab from './companies/CompaniesTab';
// Import the components we created
import AnalyticsTab from './analytics/AnalyticsTab';
import SettingsTab from './settings/SettingsTab';
import UploadModal from './shared/UploadModal';
import ContactModal from './shared/ContactModal';
import { initializeSampleData } from '../utils/mockData';

const LeadEnrichmentPlatform = () => {
  // Theme and UI State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data States
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    enrichedContacts: 0,
    successRate: 85,
    creditsUsed: 0,
    creditsRemaining: 1000
  });

  // UI States
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
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    surfeApiKey: '',
    apolloApiKey: '',
    hunterApiKey: '',
    clearbitApiKey: '',
    activeProvider: 'surfe'
  });

  // Initialize sample data
  useEffect(() => {
    const { sampleContacts, sampleCompanies } = initializeSampleData();
    setContacts(sampleContacts);
    setCompanies(sampleCompanies);
    setStats(prev => ({
      ...prev,
      totalContacts: sampleContacts.length,
      enrichedContacts: sampleContacts.filter(c => c.status === 'enriched').length,
      creditsUsed: 150,
      creditsRemaining: 850
    }));
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Bulk enrichment function
  const enrichContacts = async (contactIds) => {
    setLoading(true);
    try {
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

  // CSV upload handler
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
          return {
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

  // Shared props for components
  const sharedProps = {
    contacts,
    companies,
    stats,
    loading,
    selectedContacts,
    setSelectedContacts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredContacts,
    enrichContacts,
    setShowUploadModal,
    setSelectedContact,
    setShowContactModal,
    apiSettings,
    setApiSettings,
    activeTab,
    setActiveTab
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard {...sharedProps} />;
      case 'contacts':
        return <ContactsTab {...sharedProps} />;
      case 'contact-enrichment':
        return <ContactEnrichmentTab {...sharedProps} />;
      case 'companies':
        return <CompaniesTab {...sharedProps} />;
      case 'company-enrichment':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Company Enrichment</h3>
            <p className="text-gray-600 dark:text-gray-400">Company enrichment features coming soon</p>
          </div>
        );
      case 'analytics':
        return <AnalyticsTab {...sharedProps} />;
      case 'settings':
        return <SettingsTab {...sharedProps} darkMode={darkMode} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard {...sharedProps} />;
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
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleCsvUpload}
        />
      )}

      {showContactModal && selectedContact && (
        <ContactModal 
          contact={selectedContact}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
};

export default LeadEnrichmentPlatform;
