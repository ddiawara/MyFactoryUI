import React from 'react';

const data = [
  { name: 'RHEL', value: 45 },
  { name: 'Ubuntu', value: 35 },
  { name: 'CentOS', value: 28 },
  { name: 'Amazon Linux', value: 19 }
];

export function PublicOSChart() {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative">
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <div key={item.name} className="relative">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">{item.name}</span>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-600">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}