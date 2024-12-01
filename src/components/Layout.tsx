import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Settings as SettingsIcon, BookOpen } from 'lucide-react';
import { Navigation } from './Navigation';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dynamic-bg">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-violet-800 to-indigo-800 bg-opacity-90 glass-effect">
          <div 
            className="h-16 flex items-center px-4 cursor-pointer hover:bg-white/10 transition-colors duration-200"
            onClick={handleLogoClick}
          >
            <Image className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-semibold text-white">MyFactory</span>
          </div>
          <Navigation />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden glass-effect bg-white/30">
          {/* Top bar */}
          <header className="glass-card border-b border-white/20">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div 
                  className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  onClick={handleLogoClick}
                >
                  <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">MyFactory</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={BookOpen}
                    onClick={() => navigate('/docs')}
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={SettingsIcon}
                    onClick={() => navigate('/settings')}
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}