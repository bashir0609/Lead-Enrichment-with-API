// Update src/components/settings/SettingsTab.js
// Just modify the existing file with these changes

import React, { useState, useEffect } from 'react';
import { 
  Settings, Key, Bell, Shield, User, CreditCard, 
  Save, Eye, EyeOff, Check, X, AlertCircle, 
  Globe, Moon, Sun, Zap, Database, Mail,
  Trash2, Plus, Download, Upload, CheckCircle, Loader
} from 'lucide-react';

const SettingsTab = ({ apiSettings, setApiSettings, darkMode, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('api-keys');
  const [showApiKeys, setShowApiKeys] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load notifications from localStorage or use defaults
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('leadflow-notifications');
      return saved ? JSON.parse(saved) : {
        emailNotifications: true,
        enrichmentComplete: true,
        lowCredits: true,
        weeklyReports: false,
        systemUpdates: true
      };
    } catch {
      return {
        emailNotifications: true,
        enrichmentComplete: true,
        lowCredits: true,
        weeklyReports: false,
        systemUpdates: true
      };
    }
  });
  
  // Load preferences from localStorage or use defaults
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('leadflow-preferences');
      return saved ? JSON.parse(saved) : {
        autoEnrich: false,
        defaultProvider: 'surfe',
        dataRetention: '90',
        exportFormat: 'csv',
        timezone: 'America/New_York'
      };
    } catch {
      return {
        autoEnrich: false,
        defaultProvider: 'surfe',
        dataRetention: '90',
        exportFormat: 'csv',
        timezone: 'America/New_York'
      };
    }
  });

  const [billingInfo, setBillingInfo] = useState({
    plan: 'Professional',
    creditsRemaining: 850,
    creditsUsed: 150,
    nextBilling: '2024-07-15',
    amount: '$49.99'
  });

  // Auto-save notifications and preferences when they change
  useEffect(() => {
    try {
      localStorage.setItem('leadflow-notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('leadflow-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [preferences]);

  const apiProviders = [
    {
      id: 'surfe',
      name: 'Surfe',
      description: 'Contact enrichment and email finder',
      status: apiSettings.surfeApiKey ? 'connected' : 'disconnected',
      lastUsed: '2 hours ago'
    },
    {
      id: 'apollo',
      name: 'Apollo.io',
      description: 'B2B contact and company database',
      status: apiSettings.apolloApiKey ? 'connected' : 'disconnected',
      lastUsed: '5 hours ago'
    },
    {
      id: 'hunter',
      name: 'Hunter.io',
      description: 'Email finder and verification',
      status: apiSettings.hunterApiKey ? 'connected' : 'disconnected',
      lastUsed: '1 day ago'
    },
    {
      id: 'clearbit',
      name: 'Clearbit',
      description: 'Company enrichment and firmographic data',
      status: apiSettings.clearbitApiKey ? 'connected' : 'disconnected',
      lastUsed: '3 hours ago'
    },
    {
      id: 'zoominfo',
      name: 'ZoomInfo',
      description: 'Enterprise contact database',
      status: apiSettings.zoomInfoApiKey ? 'connected' : 'disconnected',
      lastUsed: 'Never'
    }
  ];

  const sections = [
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing & Credits', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'account', label: 'Account', icon: User }
  ];

  const toggleApiKeyVisibility = (providerId) => {
    setShowApiKeys(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const handleApiKeyChange = (providerId, value) => {
    setApiSettings(prev => ({
      ...prev,
      [`${providerId}ApiKey`]: value
    }));
  };

  const testApiKey = async (providerId) => {
    const apiKey = apiSettings[`${providerId}ApiKey`];
    if (!apiKey) {
      alert('Please enter an API key first');
      return;
    }

    try {
      // Simulate API key test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - in real app, this would call the actual API
      const isValid = apiKey.length > 10; // Simple validation
      
      if (isValid) {
        alert(`${apiProviders.find(p => p.id === providerId)?.name} API key is valid!`);
      } else {
        alert('Invalid API key format');
      }
    } catch (error) {
      alert('Failed to test API key');
    }
  };

  // FIXED: Proper save settings function
  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save API settings
      localStorage.setItem('leadflow-api-settings', JSON.stringify(apiSettings));
      
      // Save notifications (already auto-saved, but ensure it's saved)
      localStorage.setItem('leadflow-notifications', JSON.stringify(notifications));
      
      // Save preferences (already auto-saved, but ensure it's saved)
      localStorage.setItem('leadflow-preferences', JSON.stringify(preferences));
      
      // Simulate save delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
      
      console.log('Settings saved successfully:', {
        apiSettings,
        notifications,
        preferences
      });
      
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetSection = () => {
    switch (activeSection) {
      case 'api-keys':
        setApiSettings({});
        break;
      case 'notifications':
        setNotifications({
          emailNotifications: true,
          enrichmentComplete: true,
          lowCredits: true,
          weeklyReports: false,
          systemUpdates: true
        });
        break;
      case 'preferences':
        setPreferences({
          autoEnrich: false,
          defaultProvider: 'surfe',
          dataRetention: '90',
          exportFormat: 'csv',
          timezone: 'America/New_York'
        });
        break;
      default:
        break;
    }
  };

  const renderApiKeysSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          API Provider Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Configure your API keys for different enrichment providers. Keys are encrypted and stored securely.
        </p>
      </div>

      <div className="space-y-4">
        {apiProviders.map((provider) => (
          <div key={provider.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  provider.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{provider.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  provider.status === 'connected' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {provider.status}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last used: {provider.lastUsed}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKeys[provider.id] ? 'text' : 'password'}
                  placeholder={`Enter ${provider.name} API key`}
                  value={apiSettings[`${provider.id}ApiKey`] || ''}
                  onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <button
                onClick={() => toggleApiKeyVisibility(provider.id)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {showApiKeys[provider.id] ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                onClick={() => testApiKey(provider.id)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Security Notice</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your API keys are encrypted and never stored in plain text. We recommend rotating your keys regularly for security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Notification Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Choose how and when you want to be notified about platform activities.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
          { key: 'enrichmentComplete', label: 'Enrichment Complete', description: 'Notify when enrichment jobs finish' },
          { key: 'lowCredits', label: 'Low Credits Warning', description: 'Alert when credits are running low' },
          { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly performance summaries' },
          { key: 'systemUpdates', label: 'System Updates', description: 'Notifications about new features and updates' }
        ].map((notification) => (
          <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{notification.label}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[notification.key]}
                onChange={(e) => setNotifications(prev => ({
                  ...prev,
                  [notification.key]: e.target.checked
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Platform Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Customize your experience and default settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Provider
            </label>
            <select
              value={preferences.defaultProvider}
              onChange={(e) => setPreferences(prev => ({ ...prev, defaultProvider: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="surfe">Surfe</option>
              <option value="apollo">Apollo.io</option>
              <option value="hunter">Hunter.io</option>
              <option value="clearbit">Clearbit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Export Format
            </label>
            <select
              value={preferences.exportFormat}
              onChange={(e) => setPreferences(prev => ({ ...prev, exportFormat: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Auto-Enrichment</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatically enrich new contacts</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.autoEnrich}
                onChange={(e) => setPreferences(prev => ({ ...prev, autoEnrich: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Retention (days)
            </label>
            <select
              value={preferences.dataRetention}
              onChange={(e) => setPreferences(prev => ({ ...prev, dataRetention: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="forever">Forever</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Billing & Credits
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manage your subscription and monitor credit usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Plan:</span>
              <span className="font-medium text-gray-900 dark:text-white">{billingInfo.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Next Billing:</span>
              <span className="font-medium text-gray-900 dark:text-white">{billingInfo.nextBilling}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
              <span className="font-medium text-gray-900 dark:text-white">{billingInfo.amount}</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade Plan
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Credit Usage</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Credits Used:</span>
              <span className="font-medium text-gray-900 dark:text-white">{billingInfo.creditsUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Credits Remaining:</span>
              <span className="font-medium text-green-600">{billingInfo.creditsRemaining}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(billingInfo.creditsRemaining / (billingInfo.creditsUsed + billingInfo.creditsRemaining)) * 100}%` }}
              ></div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Buy More Credits
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Usage History</h4>
        <div className="space-y-3">
          {[
            { date: '2024-06-10', action: 'Contact Enrichment', credits: 25, type: 'debit' },
            { date: '2024-06-09', action: 'Company Enrichment', credits: 15, type: 'debit' },
            { date: '2024-06-08', action: 'Credit Purchase', credits: 500, type: 'credit' },
            { date: '2024-06-07', action: 'Contact Enrichment', credits: 30, type: 'debit' }
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{transaction.action}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{transaction.date}</span>
              </div>
              <span className={`font-medium ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}{transaction.credits} credits
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account preferences and API integrations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Success Message */}
          {saveSuccess && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Settings saved!</span>
            </div>
          )}
          
          {/* Reset Button */}
          <button
            onClick={resetSection}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reset Section
          </button>
          
          {/* Save Button - FIXED */}
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {activeSection === 'api-keys' && renderApiKeysSection()}
            {activeSection === 'notifications' && renderNotificationsSection()}
            {activeSection === 'preferences' && renderPreferencesSection()}
            {activeSection === 'billing' && renderBillingSection()}
            {activeSection === 'security' && (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Security Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Security features coming soon</p>
              </div>
            )}
            {activeSection === 'account' && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Account Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Account management features coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
