import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { HomePage } from './components/pages/HomePage';
import { SpaceEventsPage } from './components/pages/SpaceEventsPage';
import { MissionTimelinePage } from './components/pages/MissionTimelinePage';
import { CosmicWeatherPage } from './components/pages/CosmicWeatherPage';
// import { InteractiveLearningPage } from './components/pages/InteractiveLearningPage'; // Keeping commented out or removing
import OrbitalLabPage from './components/pages/OrbitalLabPage';
import { RealWorldDataPage } from './components/pages/RealWorldDataPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { UserProfilePage } from './components/pages/UserProfilePage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'profile':
        return <UserProfilePage />;
      case 'events':
        return <SpaceEventsPage />;
      case 'timeline':
        return <MissionTimelinePage />;
      case 'weather':
        return <CosmicWeatherPage />;
      case 'learning':
        return <OrbitalLabPage />;
      case 'data':
        return <RealWorldDataPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#E5E7EB]">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false); // Close sidebar on navigation on mobile/when overlay usage suggests it
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="pt-20 transition-all duration-300">
        {renderPage()}
      </main>
      
      <MobileNav currentPage={currentPage} onNavigate={setCurrentPage} />
      <Toaster theme="dark" />
    </div>
  );
}