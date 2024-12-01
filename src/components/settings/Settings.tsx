import React from 'react';
import { Settings as SettingsIcon, Cpu, Box } from 'lucide-react';
import { OSArchitectureList } from './OSArchitectureList';
import { OSBuilderList } from './OSBuilderList';

export function Settings() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <SettingsIcon className="h-6 w-6 text-gray-400 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
        
        <div className="mt-6">
          {/* OS Architecture Section */}
          <div className="mb-8">
            <OSArchitectureList />
          </div>

          {/* OS Builder Section */}
          <div className="mb-8">
            <OSBuilderList />
          </div>
        </div>
      </div>
    </div>
  );
}