import React from 'react';
import { BookOpen, Terminal, Cloud, Server } from 'lucide-react';

export function Documentation() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-gray-400 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-900">Documentation</h1>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Terminal className="h-5 w-5 mr-2 text-indigo-600" />
                Getting Started
              </h2>
              <div className="mt-4 text-sm text-gray-500">
                <p>Learn how to set up and configure MyFactory for your environment.</p>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>Initial setup and configuration</li>
                  <li>Authentication and access control</li>
                  <li>Basic usage and workflows</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Cloud className="h-5 w-5 mr-2 text-indigo-600" />
                Cloud Providers
              </h2>
              <div className="mt-4 text-sm text-gray-500">
                <p>Configure and manage different cloud providers.</p>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>AWS configuration and IAM roles</li>
                  <li>GCP project setup and service accounts</li>
                  <li>Region and availability zone management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Server className="h-5 w-5 mr-2 text-indigo-600" />
                Image Management
              </h2>
              <div className="mt-4 text-sm text-gray-500">
                <p>Learn about image creation and management.</p>
                <ul className="mt-4 list-disc pl-5 space-y-2">
                  <li>Creating and managing AMIs</li>
                  <li>Docker image configuration</li>
                  <li>Ansible playbook integration</li>
                  <li>Build and deployment processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}