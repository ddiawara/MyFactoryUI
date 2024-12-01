import React from 'react';
import { Cloud, Image as ImageIcon, Server, Activity } from 'lucide-react';
import { ImageList } from './images/ImageList';
import { ProviderList } from './providers/ProviderList';
import { BuildList } from './builds/BuildList';

export function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Images
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">24</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Cloud className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Providers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">2</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover-scale transition-all duration-200 hover:shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Builds This Month
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">156</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Management */}
        <div className="mt-8">
          <ProviderList />
        </div>

        {/* Image Management */}
        <div className="mt-8">
          <ImageList />
        </div>

        {/* Build History */}
        <div className="mt-8">
          <BuildList />
        </div>

        {/* Recent Activity */}
        <div className="mt-8 animate-slide-in">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 bg-white shadow rounded-lg transition-all duration-200 hover:shadow-lg">
            <div className="divide-y divide-gray-200">
              {[
                {
                  name: 'ubuntu-base-22.04',
                  type: 'AMI',
                  status: 'success',
                  timestamp: '2 hours ago'
                },
                {
                  name: 'nodejs-18-prod',
                  type: 'Docker',
                  status: 'building',
                  timestamp: '3 hours ago'
                },
                {
                  name: 'python-3.11-dev',
                  type: 'Docker',
                  status: 'failed',
                  timestamp: '5 hours ago'
                }
              ].map((build, idx) => (
                <div key={idx} className="p-4 transition-colors duration-200 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{build.name}</h3>
                        <p className="text-sm text-gray-500">{build.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${build.status === 'success' ? 'bg-green-100 text-green-800' : 
                          build.status === 'building' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {build.status}
                      </span>
                      <span className="ml-4 text-sm text-gray-500">{build.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}