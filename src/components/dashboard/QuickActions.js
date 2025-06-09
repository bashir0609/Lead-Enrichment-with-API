import React from 'react';
import { Upload, UserPlus, Zap, BarChart3, Building2, Settings } from 'lucide-react';

const QuickActions = ({ setShowUploadModal, setActiveTab }) => {
  const actions = [
    {
      title: 'Upload CSV',
      description: 'Import contacts or companies from CSV file',
      icon: Upload,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30',
      onClick: () => setShowUploadModal(true)
    },
    {
      title: 'Contact Enrichment',
      description: 'Enrich contact data with emails and phone numbers',
      icon: UserPlus,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
      onClick: () => setActiveTab('contact-enrichment')
    },
    {
      title: 'Company Enrichment',
      description: 'Enrich company data and find lookalikes',
      icon: Building2,
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30',
      onClick: () => setActiveTab('company-enrichment')
    },
    {
      title: 'View Analytics',
      description: 'Check performance and success rates',
      icon: BarChart3,
      color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
      onClick: () => setActiveTab('analytics')
    },
    {
      title: 'API Settings',
      description: 'Configure enrichment providers and preferences',
      icon: Settings,
      color: 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600',
      onClick: () => setActiveTab('settings')
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${action.color}`}
          >
            <action.icon className="h-5 w-5 flex-shrink-0" />
            <div className="text-left flex-1">
              <div className="font-medium">{action.title}</div>
              <div className="text-xs opacity-75 mt-1">{action.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          💡 Pro Tip
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload your contact lists in CSV format for bulk enrichment. 
          Our AI will automatically detect and enrich missing data with 90%+ accuracy.
        </p>
      </div>
    </div>
  );
};

export default QuickActions;
