import React from 'react';
import { Search, User, Rocket } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onToggleSidebar: () => void;
}

export function Navigation({ currentPage, onNavigate, onToggleSidebar }: NavigationProps) {
  const menuItems = [
    { id: 'home', label: 'Mission Control' },
    { id: 'events', label: 'SkyWatch' },
    { id: 'learning', label: 'Orbital Lab' },
    { id: 'weather', label: 'SolarWatch' },
    { id: 'data', label: 'Earth Pulse' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-[#4CC9F0]/20">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <Rocket className="w-8 h-8 text-[#4CC9F0] group-hover:text-[#38BDF8] transition-colors" />
              <div className="absolute inset-0 bg-[#4CC9F0] opacity-50 blur-md group-hover:opacity-70 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] bg-clip-text text-transparent font-['Orbitron']">
              SpaceWorld
            </span>
          </button>

          {/* Menu Items */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all relative group font-['Orbitron'] tracking-wide ${
                  currentPage === item.id
                    ? 'text-[#4CC9F0] text-shadow-neon'
                    : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent shadow-[0_0_10px_#4CC9F0]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-[#6B7280]" />
              <Input
                type="text"
                placeholder="Search events, missions..."
                className="pl-10 w-64 bg-[#0F1A2E]/60 border-[#4CC9F0]/20 focus:border-[#4CC9F0] text-[#E5E7EB] placeholder:text-[#6B7280]"
              />
            </div>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('profile')}
              className="relative text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#4CC9F0]/10"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-[#4CC9F0]/20 text-[#4CC9F0] border border-[#4CC9F0]/30'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
