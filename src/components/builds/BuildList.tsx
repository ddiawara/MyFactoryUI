import React from 'react';
import { History, Package, Tag, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface BuildListProps {
  imageId?: number;
}

const mockBuilds = [
  {
    id: 1,
    image_id: 1,
    name: 'Build 1',
    manifest: {
      version: '1.0.0',
      timestamp: '2024-03-15T10:30:00Z',
      status: 'success'
    }
  },
  {
    id: 2,
    image_id: 1,
    name: 'Build 2',
    manifest: {
      version: '1.1.0',
      timestamp: '2024-03-16T14:45:00Z',
      status: 'success'
    }
  }
];

export function BuildList({ imageId }: BuildListProps) {
  const builds = imageId 
    ? mockBuilds.filter(build => build.image_id === imageId)
    : mockBuilds;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <History className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Build History</h2>
        </div>
        <Button icon={History}>New Build</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Build</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {builds.map((build) => (
              <tr key={build.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{build.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{build.manifest.version}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {build.manifest.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(build.manifest.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={ArrowRight}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}