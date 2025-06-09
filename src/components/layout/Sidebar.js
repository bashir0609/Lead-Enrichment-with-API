import React from 'react';
import { 
  BarChart3, Users, UserPlus, Building2, Zap, 
  PieChart, Settings, Database, Sun, Moon,
  ChevronLeft, ChevronRight
} from 'lucide-react';

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
      description: 'Enrich contact data',
      badge: contacts?.filter(c => c.status === 'pending').length || 0,
      badgeColor: 'bg-yellow-500'
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
          
          {/* Collapse Button */}
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
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <item.icon className="h-5 w-5" />
              {/* Badge for notifications */}
              {item.badge && item.badge > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 text-xs font-bold text-white rounded-full flex items-center justify-center ${
                  item.badgeColor || 'bg-blue-500'
                }`}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            
            {/* Label and Description */}
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
                {stats?.creditsRemaining || 1000}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                remaining this month
              </div>
              
              {/* Credit Usage Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((stats?.creditsUsed || 0) / ((stats?.creditsUsed || 0) + (stats?.creditsRemaining || 1000))) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{stats?.creditsUsed || 0} used</span>
                <span>{(stats?.creditsUsed || 0) + (stats?.creditsRemaining || 1000)} total</span>
              </div>
              
              {/* Buy More Credits Link */}
              <button className="w-full mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium">
                Buy More Credits
              </button>
            </>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                john@company.com
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
