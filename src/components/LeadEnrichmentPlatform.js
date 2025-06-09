// src/components/LeadEnrichmentPlatform.js (150 lines)
import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Dashboard from './dashboard/Dashboard';
import ContactsTab from './contacts/ContactsTab';
// ... other imports

const LeadEnrichmentPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // ... main state logic
  
  return (
    <div className="min-h-screen">
      <div className="flex bg-gray-50 dark:bg-gray-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'contacts' && <ContactsTab />}
            {/* ... other tabs */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LeadEnrichmentPlatform;
