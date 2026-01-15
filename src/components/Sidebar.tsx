import React from 'react';
import { 
  Calendar, 
  GraduationCap, 
  CloudSun, 
  Database, 
  Info, 
  Mail,
  ChevronRight,
  Home,
  Telescope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Mission Control', icon: Home },
    { id: 'events', label: 'SkyWatch', icon: Telescope },
    { id: 'learning', label: 'Orbital Lab', icon: GraduationCap },
    { id: 'weather', label: 'SolarWatch', icon: CloudSun },
    { id: 'data', label: 'Earth Pulse', icon: Database },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-20 bottom-0 w-64 glass-panel border-r border-[#4CC9F0]/20 z-40 overflow-y-auto"
        >
          <div className="p-6">
            {/* Navigation Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                      isActive
                        ? 'bg-[#4CC9F0]/20 text-[#4CC9F0] glow-border'
                        : 'text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#4CC9F0]/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#4CC9F0]' : 'text-[#6B7280]'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-[#4CC9F0]" />
                    )}
                  </button>
                );
              })}
            </nav>


          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
