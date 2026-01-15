import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from '../EventCard';
import { InteractiveMap } from '../InteractiveMap';
import { Footer } from '../Footer';
import { Button } from '../ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Rocket Launch',
      icon: '🚀',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXx8fHwxNzY4MjIxMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'January 15, 2026',
      time: '14:30 UTC',
      location: 'Cape Canaveral, Florida',
      description: 'SpaceX Falcon 9 launching Starlink satellites to low Earth orbit'
    },
    {
      id: 2,
      title: 'Asteroids',
      icon: '☄️',
      image: 'https://images.unsplash.com/photo-1707058666066-e0639a65ac4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZCUyMHNwYWNlfGVufDF8fHx8MTc2ODIzOTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'January 18, 2026',
      time: '22:00 UTC',
      location: 'Global Visibility',
      description: 'Asteroid 2024 XY5 makes close approach at 0.05 AU from Earth'
    },
    {
      id: 3,
      title: 'ISS Sighting',
      icon: '🛰️',
      image: 'https://images.unsplash.com/photo-1614314007212-0257d6e2f7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3BhY2UlMjBzdGF0aW9ufGVufDF8fHx8MTc2ODE5NTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'January 20, 2026',
      time: '19:45 UTC',
      location: 'Northern Hemisphere',
      description: 'International Space Station visible pass over major cities'
    },
    {
      id: 4,
      title: 'Lunar Eclipse',
      icon: '🌕',
      image: 'https://images.unsplash.com/photo-1742770264974-731ca9a7589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5hciUyMGVjbGlwc2UlMjBtb29ufGVufDF8fHx8MTc2ODIzOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'January 28, 2026',
      time: '03:12 UTC',
      location: 'Americas, Europe',
      description: 'Total lunar eclipse visible across two continents for 62 minutes'
    },
  ];

  const dataSources = [
    { name: 'NASA', logo: '🛸', status: 'Active' },
    { name: 'ISRO', logo: '🚀', status: 'Active' },
    { name: 'NOAA', logo: '🌍', status: 'Active' },
    { name: 'ESA', logo: '🛰️', status: 'Active' },
  ];

  const scrollEvents = (direction: 'left' | 'right') => {
    const container = document.getElementById('events-scroll');
    if (container) {
      const scrollAmount = 340;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#4CC9F0] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#38BDF8] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#4CC9F0]" />
              <span className="text-sm text-[#4CC9F0] font-medium">Powered by Real-Time Space Data</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#E5E7EB] via-[#4CC9F0] to-[#38BDF8] bg-clip-text text-transparent font-['Orbitron']">
              Explore Space.<br />Understand Earth.
            </h1>

            <p className="text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Real-time space events, cosmic weather, and interactive learning for students, researchers, and space enthusiasts worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => onNavigate('events')}
                className="bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#4CC9F0] text-[#0B1020] font-semibold px-8"
              >
                Explore Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('about')}
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Space Events */}
      <section className="px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">
                🔭 Upcoming Space Events
              </h2>
              <p className="text-[#9CA3AF]">Don't miss these incredible cosmic moments</p>
            </div>
            
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollEvents('left')}
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollEvents('right')}
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Events Carousel */}
          <div 
            id="events-scroll"
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {upcomingEvents.map(event => (
              <EventCard
                key={event.id}
                {...event}
                onViewDetails={() => console.log('View details:', event.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">
              🌍 Geospatial Visibility Analyzer
            </h2>
            <p className="text-[#9CA3AF]">Track event visibility in real-time across the globe</p>
          </div>
          
          <InteractiveMap />
        </div>
      </section>

      {/* Data Sources */}
      <section className="px-6 py-12 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">
              🧠 Trusted Data Sources
            </h2>
            <p className="text-[#9CA3AF]">Powered by the world's leading space agencies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dataSources.map((source, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/50 transition-all hover:scale-105 glow-border text-center"
              >
                <div className="text-5xl mb-4">{source.logo}</div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">
                  {source.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
                  <span className="text-sm text-[#22C55E]">{source.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}