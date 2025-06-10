import React, { useState, useEffect } from 'react';
import { initializeSampleData } from '../utils/mockData';

// Simple Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">LeadFlow</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Simple Header Component
const Header = ({ activeTab }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
    </header>
  );
};

// Simple Dashboard Component
const Dashboard = ({ contacts, stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalContacts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Enriched</h3>
          <p className="text-3xl font-bold text-green-600">{stats.enrichedContacts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.successRate}%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Credits</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.creditsRemaining}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Contacts</h3>
        <div className="space-y-3">
          {contacts.slice(0, 5).map((contact) => (
            <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
              </div>
              <div className={`ml-auto px-2 py-1 text-xs rounded-full ${
                contact.status === 'enriched' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {contact.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Contacts Component
const ContactsTab = ({ contacts }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.jobTitle}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">📧 {contact.email || 'No email'}</p>
                <p className="text-gray-600 dark:text-gray-400">🏢 {contact.company}</p>
                <p className="text-gray-600 dark:text-gray-400">📞 {contact.phone || 'No phone'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Analytics Component
const AnalyticsTab = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="text-sm font-medium">{stats.successRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.successRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Credits Used</span>
                  <span className="text-sm font-medium">{stats.creditsUsed}/1000</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.creditsUsed/1000)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Contacts:</span>
                <span className="font-medium">{stats.totalContacts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Enriched:</span>
                <span className="font-medium">{stats.enrichedContacts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Remaining Credits:</span>
                <span className="font-medium">{stats.creditsRemaining}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Settings Component
const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Provider
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <option>Surfe</option>
              <option>Apollo.io</option>
              <option>Hunter.io</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key
            </label>
            <input 
              type="password" 
              placeholder="Enter your API key"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LeadEnrichmentPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    enrichedContacts: 0,
    successRate: 85,
    creditsUsed: 150,
    creditsRemaining: 850
  });

  // Initialize sample data
  useEffect(() => {
    try {
      const { sampleContacts } = initializeSampleData();
      setContacts(sampleContacts);
      setStats(prev => ({
        ...prev,
        totalContacts: sampleContacts.length,
        enrichedContacts: sampleContacts.filter(c => c.status === 'enriched').length
      }));
    } catch (error) {
      console.log('Mock data not available, using fallback data');
      // Fallback data if mockData doesn't work
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
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: '',
          company: 'StartupXYZ',
          jobTitle: 'Marketing Manager',
          phone: '',
          status: 'pending'
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard contacts={contacts} stats={stats} />;
      case 'contacts':
        return <ContactsTab contacts={contacts} />;
      case 'analytics':
        return <AnalyticsTab stats={stats} />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <Dashboard contacts={contacts} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          <Header activeTab={activeTab} />
          <main className="p-6">
            {renderActiveTab()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LeadEnrichmentPlatform;
