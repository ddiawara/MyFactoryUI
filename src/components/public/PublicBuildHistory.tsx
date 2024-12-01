import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const buildHistory = [
  {
    id: 1,
    name: 'ubuntu-base-22.04',
    status: 'success',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    name: 'nodejs-18-prod',
    status: 'building',
    timestamp: '3 hours ago'
  },
  {
    id: 3,
    name: 'python-3.11-dev',
    status: 'failed',
    timestamp: '5 hours ago'
  }
];

const statusIcons = {
  success: CheckCircle,
  building: Clock,
  failed: XCircle
};

const statusColors = {
  success: 'text-green-500',
  building: 'text-yellow-500',
  failed: 'text-red-500'
};

export function PublicBuildHistory() {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {buildHistory.map((build, buildIdx) => {
          const StatusIcon = statusIcons[build.status as keyof typeof statusIcons];
          const statusColor = statusColors[build.status as keyof typeof statusColors];

          return (
            <li key={build.id}>
              <div className="relative pb-8">
                {buildIdx !== buildHistory.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${statusColor}`}>
                      <StatusIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {build.name}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={build.timestamp}>{build.timestamp}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}