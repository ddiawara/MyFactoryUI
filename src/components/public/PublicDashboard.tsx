import React from 'react';
import { Image as ImageIcon, Activity, Clock, BarChart } from 'lucide-react';
import { PublicStatsCard } from './PublicStatsCard';
import { PublicOSChart } from './PublicOSChart';
import { PublicBuildHistory } from './PublicBuildHistory';

export function PublicDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">MyFactory Status</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <PublicStatsCard
            title="Total Images"
            value="127"
            change="+12%"
            icon={ImageIcon}
            trend="up"
          />
          <PublicStatsCard
            title="Active Builds"
            value="8"
            change="+3%"
            icon={Activity}
            trend="up"
          />
          <PublicStatsCard
            title="Scheduled Jobs"
            value="24"
            change="+18%"
            icon={Clock}
            trend="up"
          />
          <PublicStatsCard
            title="Success Rate"
            value="98.5%"
            change="+2.1%"
            icon={BarChart}
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Images by OS Family</h2>
            <PublicOSChart />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Build History</h2>
            <PublicBuildHistory />
          </div>
        </div>
      </main>
    </div>
  );
}