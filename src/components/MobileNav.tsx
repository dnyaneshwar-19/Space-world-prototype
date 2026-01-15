import React from 'react';
import { Home, Calendar, GraduationCap, CloudSun } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'learning', label: 'Learn', icon: GraduationCap },
    { id: 'weather', label: 'Weather', icon: CloudSun },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-[#4CC9F0]/20 pb-safe">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-[#4CC9F0]'
                  : 'text-[#9CA3AF]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#4CC9F0]' : 'text-[#9CA3AF]'}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#4CC9F0]"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
