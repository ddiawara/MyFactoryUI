import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cloud, Image, Settings, Layout as LayoutIcon, Server, HardDrive } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutIcon, path: '/dashboard' },
  { name: 'Images', icon: Image, path: '/images' },
  { name: 'Operating Systems', icon: HardDrive, path: '/os' },
  { name: 'OS Family', icon: Server, path: '/os-family' },
  { name: 'Providers', icon: Cloud, path: '/providers' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.name}
            className={`
              w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md
              transition-all duration-200 ease-in-out transform hover:translate-x-1
              ${isActive
                ? 'bg-indigo-800 text-white'
                : 'text-gray-300 hover:bg-indigo-600 hover:text-white'
              }
            `}
            onClick={() => navigate(item.path)}
          >
            <Icon
              className={`
                mr-3 h-6 w-6 flex-shrink-0 transition-transform duration-200 group-hover:scale-110
                ${isActive
                  ? 'text-white'
                  : 'text-gray-400 group-hover:text-white'
                }
              `}
            />
            {item.name}
          </button>
        );
      })}
    </nav>
  );
}