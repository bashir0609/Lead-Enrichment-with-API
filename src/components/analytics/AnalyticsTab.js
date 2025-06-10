import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Building2, Zap, Target,
  Calendar, Download, RefreshCw, Filter, ArrowUp, ArrowDown
} from 'lucide-react';

const AnalyticsTab = ({ contacts, companies, stats }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('contacts');

  // Calculate analytics data
  const enrichedContacts = contacts?.filter(c => c.status === 'enriched') || [];
  const pendingContacts = contacts?.filter(c => c.status === 'pending') || [];
  const totalContacts = contacts?.length || 0;
  
  const successRate = totalContacts > 0 ? Math.round((enrichedContacts.length / totalContacts) * 100) : 0;
  
  // Mock weekly data for charts
  const weeklyData = [
    { day: 'Mon', contacts: 12, companies: 3, successRate: 92 },
    { day: 'Tue', contacts: 18, companies: 5, successRate: 88 },
    { day: 'Wed', contacts: 15, companies: 2, successRate: 94 },
    { day: 'Thu', contacts: 22, companies: 7, successRate: 86 },
    { day: 'Fri', contacts: 25, companies: 4, successRate: 91 },
    { day: 'Sat', contacts: 8, companies: 1, successRate: 95 },
    { day: 'Sun', contacts: 5, companies: 2, successRate: 89 }
  ];

  const providerStats = [
    { name: 'Surfe', contacts: 45, successRate: 94, avgTime: '1.2s' },
    { name: 'Apollo.io', contacts: 32, successRate: 91, avgTime: '2.1s' },
    { name: 'Hunter.io', contacts: 28, successRate: 87, avgTime: '1.5s' },
    { name: 'Clearbit', contacts: 15, successRate: 96, avgTime: '0.8s' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track performance and success rates across your enrichment activities
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Enriched</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{enrichedContacts.length}</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">+12% vs last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{successRate}%</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">+3% vs last week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Credits Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.creditsUsed || 0}</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowDown className="h-3 w-3 text-red-500" />
                <span className="text-xs text-red-600">-5% vs last week</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.4s</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowDown className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">-0.2s vs last week</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveMetric('contacts')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeMetric === 'contacts' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveMetric('companies')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeMetric === 'companies' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                Companies
              </button>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                  {day.day}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(day[activeMetric] / Math.max(...weeklyData.map(d => d[activeMetric]))) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                  {day[activeMetric]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Rate Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Success Rate Trend</h3>
          
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {day.day}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        day.successRate >= 90 ? 'bg-green-500' : 
                        day.successRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${day.successRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-10">
                    {day.successRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Provider Performance</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Provider</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Contacts Enriched</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Success Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Avg Response Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {providerStats.map((provider, index) => (
                <tr key={provider.name} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{provider.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600 dark:text-gray-400">{provider.contacts}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      provider.successRate >= 90 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : provider.successRate >= 80
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {provider.successRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600 dark:text-gray-400">{provider.avgTime}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${provider.successRate}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Quality</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Accuracy</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Accuracy</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">88%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Match Rate</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">92%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Credit Usage</h3>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-blue-600">{stats?.creditsUsed || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Credits used this month</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Contact Enrichment</span>
              <span className="font-medium text-gray-900 dark:text-white">120 credits</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Company Enrichment</span>
              <span className="font-medium text-gray-900 dark:text-white">30 credits</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
              <span className="font-medium text-gray-900 dark:text-white">Remaining</span>
              <span className="font-medium text-blue-600">{stats?.creditsRemaining || 1000} credits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
