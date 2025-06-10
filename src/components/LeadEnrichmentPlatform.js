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

// Enhanced Dashboard with more features
const Dashboard = ({ contacts, stats, setShowUploadModal, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalContacts}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active leads</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 ml-4">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Enriched Contacts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.enrichedContacts}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{Math.round((stats.enrichedContacts / (stats.totalContacts || 1)) * 100)}% success rate</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500 ml-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Credits Used</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.creditsUsed}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500 ml-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.successRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overall accuracy</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500 ml-4">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
            >
              <Upload className="h-5 w-5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="font-medium">Upload CSV</div>
                <div className="text-xs opacity-75">Import contacts or companies</div>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('contact-enrichment')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
            >
              <UserPlus className="h-5 w-5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="font-medium">Contact Enrichment</div>
                <div className="text-xs opacity-75">Find emails and phone numbers</div>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
            >
              <BarChart3 className="h-5 w-5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="font-medium">View Analytics</div>
                <div className="text-xs opacity-75">Performance insights</div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Contacts</h3>
            <button 
              onClick={() => setActiveTab('contacts')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      contact.status === 'enriched' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other tabs
const ContactsTab = ({ contacts }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Contacts ({contacts.length})</h3>
    <div className="text-center py-8">
      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Full contacts management interface coming soon</p>
    </div>
  </div>
);

const ContactEnrichmentTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Enrichment</h3>
    <div className="text-center py-8">
      <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Contact enrichment interface coming soon</p>
    </div>
  </div>
);

const CompaniesTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Companies</h3>
    <div className="text-center py-8">
      <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Companies management interface coming soon</p>
    </div>
  </div>
);

const CompanyEnrichmentTab = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Enrichment</h3>
    <div className="text-center py-8">
      <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Company enrichment interface coming soon</p>
    </div>
  </div>
);

const AnalyticsTab = ({ stats }) => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance Metrics</h4>
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
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Stats</h4>
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

const SettingsTab = ({ darkMode, toggleTheme }) => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Appearance</h4>
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Moon className="h-5 w-5 text-blue-600" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-600" />
            )}
            <span className="text-gray-900 dark:text-white">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
        </div>

        {/* API Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">API Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Provider
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>Surfe</option>
                <option>Apollo.io</option>
                <option>Hunter.io</option>
                <option>Clearbit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input 
                type="password" 
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notifications</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Email notifications for enrichment completion</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Low credits warning</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Weekly performance reports</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Simple Upload Modal
const UploadModal = ({ onClose, onUpload }) => {
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
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
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
      console.log('Using fallback data');
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

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // CSV upload handler
  const handleCsvUpload = (file) => {
    console.log('Uploading file:', file.name);
    // Simple demo upload logic
    setShowUploadModal(false);
    alert('CSV file uploaded successfully! (Demo mode)');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard contacts={contacts} stats={stats} setShowUploadModal={setShowUploadModal} setActiveTab={setActiveTab} />;
      case 'contacts':
        return <ContactsTab contacts={contacts} />;
      case 'contact-enrichment':
        return <ContactEnrichmentTab />;
      case 'companies':
        return <CompaniesTab />;
      case 'company-enrichment':
        return <CompanyEnrichmentTab />;
      case 'analytics':
        return <AnalyticsTab stats={stats} />;
      case 'settings':
        return <SettingsTab darkMode={darkMode} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard contacts={contacts} stats={stats} setShowUploadModal={setShowUploadModal} setActiveTab={setActiveTab} />;
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

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleCsvUpload}
        />
      )}
    </div>
  );
};

export default LeadEnrichmentPlatform;
