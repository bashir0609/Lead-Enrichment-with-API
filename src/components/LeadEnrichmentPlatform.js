import React, { useState, useEffect } from 'react';
import {
    BarChart3, Users, UserPlus, Building2, Zap, PieChart, Settings, Database,
    Sun, Moon, ChevronLeft, ChevronRight, Search, Upload, Loader,
    Mail, Phone, MapPin, CheckCircle, X, Plus, RefreshCw, Bell,
    ChevronDown, Menu, Target
} from 'lucide-react';

// Sidebar Component
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
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview and analytics' },
        { id: 'contacts', label: 'Contacts', icon: Users, description: 'Manage contact database', badge: stats?.totalContacts || 0 },
        { id: 'contact-enrichment', label: 'Contact Enrichment', icon: UserPlus, description: 'Enrich contact data' },
        { id: 'companies', label: 'Companies', icon: Building2, description: 'Company database' },
        { id: 'analytics', label: 'Analytics', icon: PieChart, description: 'Performance insights' },
        { id: 'settings', label: 'Settings', icon: Settings, description: 'API keys and preferences' }
    ];

    return (
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Database className="h-5 w-5 text-white" />
                        </div>
                        {!sidebarCollapsed && (
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">LeadFlow</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Enrichment Platform</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigationItems.map((item) => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${activeTab === item.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'}`} title={sidebarCollapsed ? item.label : ''}>
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
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs opacity-75 group-hover:opacity-100 transition-opacity">{item.description}</div>
                            </div>
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{sidebarCollapsed ? '💳' : 'Credits'}</span>
                        <button onClick={toggleTheme} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                            {darkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-gray-600" />}
                        </button>
                    </div>
                    {!sidebarCollapsed && (
                        <>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.creditsRemaining || 1000}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">remaining this month</div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((stats?.creditsUsed || 0) / ((stats?.creditsUsed || 0) + (stats?.creditsRemaining || 1000))) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span>{stats?.creditsUsed || 0} used</span>
                                <span>{(stats?.creditsUsed || 0) + (stats?.creditsRemaining || 1000)} total</span>
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

// Header Component
const Header = ({ activeTab, sidebarCollapsed, setSidebarCollapsed }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    const tabDisplayNames = {
        'dashboard': 'Dashboard',
        'contacts': 'Contacts',
        'contact-enrichment': 'Contact Enrichment',
        'companies': 'Companies',
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
                <div className="flex items-center space-x-4">
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden">
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tabDisplayNames[activeTab] || 'Dashboard'}</h2>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 max-w-md mx-8 relative hidden md:block">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input type="text" placeholder="Search contacts, companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
                    </form>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Notifications</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Welcome to LeadFlow</p>
                                            <p className="text-xs text-blue-800 dark:text-blue-200">Start by uploading your contacts or companies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">U</div>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};

// Dashboard Component
const Dashboard = ({ contacts, stats, setShowUploadModal, setActiveTab }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Contacts</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalContacts}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Active leads</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500 ml-4"><Users className="h-6 w-6 text-white" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Enriched Contacts</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.enrichedContacts}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{Math.round((stats.enrichedContacts / (stats.totalContacts || 1)) * 100)}% success rate</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500 ml-4"><CheckCircle className="h-6 w-6 text-white" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Credits Used</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.creditsUsed}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500 ml-4"><Zap className="h-6 w-6 text-white" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.successRate}%</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Overall accuracy</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500 ml-4"><Target className="h-6 w-6 text-white" /></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button onClick={() => setShowUploadModal(true)} className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30">
                            <Upload className="h-5 w-5 flex-shrink-0" />
                            <div className="text-left flex-1">
                                <div className="font-medium">Upload CSV</div>
                                <div className="text-xs opacity-75">Import contacts or companies</div>
                            </div>
                        </button>
                        <button onClick={() => setActiveTab('contact-enrichment')} className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30">
                            <UserPlus className="h-5 w-5 flex-shrink-0" />
                            <div className="text-left flex-1">
                                <div className="font-medium">Contact Enrichment</div>
                                <div className="text-xs opacity-75">Find emails and phone numbers</div>
                            </div>
                        </button>
                        <button onClick={() => setActiveTab('analytics')} className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30">
                            <BarChart3 className="h-5 w-5 flex-shrink-0" />
                            <div className="text-left flex-1">
                                <div className="font-medium">View Analytics</div>
                                <div className="text-xs opacity-75">Performance insights</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Getting Started</h3>
                    </div>
                    {contacts.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-gray-400" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No contacts yet</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Upload a CSV file or add contacts manually to get started with enrichment</p>
                            <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Upload className="h-4 w-4" />
                                <span>Upload Contacts</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {contacts.slice(0, 3).map((contact) => (
                                <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                        {contact.firstName[0]}{contact.lastName[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">{contact.firstName} {contact.lastName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{contact.company}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'enriched' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>{contact.status}</span>
                                </div>
                            ))}
                            {contacts.length > 3 && (
                                <button onClick={() => setActiveTab('contacts')} className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 py-2">
                                    View all {contacts.length} contacts
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Simple Upload Modal
const SimpleUploadModal = ({ onClose, onUpload }) => {
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
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-6">
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`} onDragEnter={() => setDragActive(true)} onDragLeave={() => setDragActive(false)} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Drop your CSV file here</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">or click to browse and select a file</p>
                        <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">Choose File</label>
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

// Placeholder components for other tabs
const ContactsTab = ({ contacts }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
            <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No contacts available. Upload a CSV to get started.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{contact.firstName} {contact.lastName}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'enriched' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>{contact.status}</span>
                    </div>
                ))}
            </div>
        )}
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

const AnalyticsTab = ({ stats }) => (
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
                        <span className="text-gray-600 dark:text-gray-400">Credits Used:</span>
                        <span className="font-medium">{stats.creditsUsed}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SettingsTab = ({ apiSettings, setApiSettings, darkMode, toggleTheme }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Appearance</h4>
                <button onClick={toggleTheme} className="flex items-center space-x-2 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    {darkMode ? <Moon className="h-5 w-5 text-blue-600" /> : <Sun className="h-5 w-5 text-yellow-600" />}
                    <span className="text-gray-900 dark:text-white">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">API Configuration</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Provider</label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <option>Surfe</option>
                            <option>Apollo.io</option>
                            <option>Hunter.io</option>
                            <option>Clearbit</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
                        <input type="password" placeholder="Enter your API key" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Settings</button>
                </div>
            </div>
        </div>
    </div>
);

// Main Component
const LeadEnrichmentPlatform = () => {
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
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stats, setStats] = useState({
        totalContacts: 0,
        enrichedContacts: 0,
        successRate: 85,
        creditsUsed: 0,
        creditsRemaining: 1000
    });

    const [apiSettings, setApiSettingsState] = useState(() => {
        try {
            const saved = localStorage.getItem('leadflow-api-settings');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

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

    const toggleTheme = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            try {
                localStorage.setItem('leadflow-theme', newMode ? 'dark' : 'light');
            } catch (error) {
                console.error('Failed to save theme:', error);
            }
            return newMode;
        });
    };

    const handleCsvUpload = (file) => {
        console.log('Uploading file:', file.name);
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
            case 'analytics':
                return <AnalyticsTab stats={stats} />;
            case 'settings':
                return <SettingsTab apiSettings={apiSettings} setApiSettings={setApiSettings} darkMode={darkMode} toggleTheme={toggleTheme} />;
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
            {showUploadModal && (
                <SimpleUploadModal
                    onClose={() => setShowUploadModal(false)}
                    onUpload={handleCsvUpload}
                />
            )}
        </div>
    );
};

export default LeadEnrichmentPlatform;
