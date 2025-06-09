import React from 'react';
import { Users, CheckCircle, Zap, Target, Upload, UserPlus, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';
import QuickActions from './QuickActions';
import RecentContacts from './RecentContacts';

const Dashboard = ({ 
  contacts, 
  stats, 
  setShowUploadModal, 
  setActiveTab 
}) => {
  return (
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
          subtitle={`${Math.round((stats.enrichedContacts / (stats.totalContacts || 1)) * 100)}% success rate`}
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

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <RecentContacts contacts={contacts.slice(0, 5)} />

        {/* Quick Actions */}
        <QuickActions 
          setShowUploadModal={setShowUploadModal}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Activity Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Activity Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Contacts Added</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">8</div>
            <div className="text-sm text-green-700 dark:text-green-300">Successfully Enriched</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">24</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Credits Consumed</div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Weekly Performance
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Enrichment
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                85% success rate
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Enrichment
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                92% success rate
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: '92%' }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Data Quality Score
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                96% accuracy
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: '96%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
