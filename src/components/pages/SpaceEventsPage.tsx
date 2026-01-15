import React, { useState } from 'react';
import { Telescope, MapPin, Calendar as CalendarIcon, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { InteractiveMap } from '../InteractiveMap';
import { FilterBar, EventType, TimeRange, IntelligentEventCard, IntelligentEventProps, EventIcons, AlertTimeline, EventDetailModal, EventArchive, SkeletonEventCard } from '../SkyWatchComponents';

export function SpaceEventsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load for polish
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // -- SkyWatch State --
  const [activeTypes, setActiveTypes] = useState<EventType[]>(['rocket', 'iss', 'asteroid', 'eclipse']);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [location, setLocation] = useState("Mumbai, India");

  // Helper to calculate relevance based on lat/lon (Simulation)
  const getRelevanceForLocation = (type: EventType, loc: string): string => {
      const cityFirstLetter = loc.charAt(0).toLowerCase();
      // Deterministic mock relevance based on city name for demo persistency
      if (type === 'iss') return `Visible in ${loc.split(',')[0]}`;
      if (type === 'asteroid') return 'Visible Everywhere (High-Altitude)';
      if (type === 'rocket') return ['n', 'm', 't'].includes(cityFirstLetter) ? 'Direct Line of Sight' : 'Live Broadcast';
      if (type === 'eclipse') return ['l', 'p', 's'].includes(cityFirstLetter) ? 'Total Visibility' : 'Partial Visibility';
      return 'Global Event';
  };

  const handleLocationChange = (newLocation: string) => {
    setIsLoading(true);
    setLocation(newLocation);
    
    // Simulate updating event data based on new location
    setTimeout(() => {
        setEvents(prev => prev.map(e => ({
            ...e,
            regionRelevance: getRelevanceForLocation(e.type, newLocation)
        })));
        setIsLoading(false);
    }, 800);
  };

  const toggleType = (type: EventType) => {
    setActiveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };


      const [events, setEvents] = useState<IntelligentEventProps[]>([
        {
          id: 1,
          title: 'ISS Visual Pass',
          icon: EventIcons.iss,
          type: 'iss',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
          date: 'Today',
          countdown: 'In 3h 12m',
          visibility: 'Naked Eye',
          regionRelevance: `Visible in ${location.split(',')[0]}`,
          isInterested: false,
          eventTimestamp: new Date(Date.now() + 3 * 3600 * 1000)
        },
        {
          id: 2,
          title: 'Falcon 9 Starlink Launch',
          icon: EventIcons.rocket,
          type: 'rocket',
          image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop',
          date: 'Jan 15',
          countdown: 'In 14h 45m',
          visibility: 'Binoculars',
          regionRelevance: 'Live Broadcast',
          isInterested: false,
          eventTimestamp: new Date(Date.now() + 14 * 3600 * 1000)
        },
        {
          id: 3,
          title: 'Asteroid Close Approach',
          icon: EventIcons.asteroid,
          type: 'asteroid',
          image: 'https://images.unsplash.com/photo-1614728853975-69c760e0d9ac?q=80&w=2074&auto=format&fit=crop',
          date: 'Jan 18',
          countdown: 'In 2d 5h',
          visibility: 'Telescope Required',
          regionRelevance: 'Global Event',
          isInterested: false,
          eventTimestamp: new Date(Date.now() + (2 * 24 + 5) * 3600 * 1000)
        },
        {
          id: 4,
          title: 'Total Lunar Eclipse',
          icon: EventIcons.eclipse,
          type: 'eclipse',
          image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2071&auto=format&fit=crop',
          date: 'Jan 28',
          countdown: 'In 12d',
          visibility: 'Naked Eye',
          regionRelevance: 'Partial Visibility',
          isInterested: false,
          eventTimestamp: new Date(Date.now() + 12 * 24 * 3600 * 1000)
        },
        {
          id: 5,
          title: 'Asteroid Belt Visualization',
          icon: EventIcons.asteroid,
          type: 'asteroid',
          image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
          date: 'Feb 12',
          countdown: 'In 28d',
          visibility: 'Naked Eye',
          regionRelevance: 'Best view from North & Mumbai',
          isInterested: false,
          eventTimestamp: new Date(Date.now() + 28 * 24 * 3600 * 1000)
        },
      ]);
      
      const getFilteredEvents = () => {
          const now = new Date().getTime();
          let maxDuration = 30 * 24 * 3600 * 1000; // default 30d

          switch(timeRange) {
              case '1h': maxDuration = 3600 * 1000; break;
              case '24h': maxDuration = 24 * 3600 * 1000; break;
              case '7d': maxDuration = 7 * 24 * 3600 * 1000; break;
              case '30d': maxDuration = 30 * 24 * 3600 * 1000; break;
              case '6m': maxDuration = 180 * 24 * 3600 * 1000; break;
          }

          return events.filter(e => {
            const isTypeMatch = activeTypes.includes(e.type);
            const isTimeMatch = e.eventTimestamp ? (e.eventTimestamp.getTime() - now) <= maxDuration : true;
            return isTypeMatch && isTimeMatch;
          });
      };
      
      const filteredEvents = getFilteredEvents();
    
      const handleToggleInterested = (eventId: number) => {
        setEvents(prev => prev.map(e => 
            e.id === eventId ? { ...e, isInterested: !e.isInterested } : e
        ));
        
        // Also update selectedEvent if it matches
        if (selectedEvent && selectedEvent.id === eventId) {
            setSelectedEvent((prev: any) => ({ ...prev, isInterested: !prev.isInterested }));
        }
      };

      const handleSetAlert = (eventId: number, time: string) => {
        setEvents(prev => prev.map(e => 
             e.id === eventId ? { ...e, alertSet: time } : e
        ));
      };

      const handleAddToCalendar = (eventId: number) => {
          setEvents(prev => prev.map(e =>
              e.id === eventId ? { ...e, isScheduled: true } : e
          ));
      };

      const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);
      const [radarActive, setRadarActive] = useState(false);

      const handleViewDetails = (event: any) => {
        // Ensure we pass the latest state of the event
        const latestEvent = events.find(e => e.id === event.id) || event;
        setSelectedEvent(latestEvent);
        setShowModal(true);
      };
    
      return (
        <div className="min-h-screen px-6 py-12 transition-colors duration-700">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Starfield Background Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
           {/* We can envision more complex CSS stars here if requested, keeping it simple for now as requested 'texture' */}
        </div>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
              <Telescope className="w-6 h-6 text-[#4CC9F0]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron'] tracking-wider">
              SkyWatch
            </h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl text-[#4CC9F0] font-light">Never miss what’s happening above your sky</h2>
            <p className="text-lg text-[#9CA3AF]">
              Personalized space events based on your location and time
            </p>
          </div>
        </div>

        
        {/* 🔴 LIVE SKY MAP (NOW AT TOP) */}
        <div className="mb-8">
            <div className="flex flex-col mb-4">
                <h2 className="text-2xl font-bold text-[#E5E7EB] font-['Orbitron'] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Live Sky Map
                </h2>
                <p className="text-[#9CA3AF] text-sm ml-5">Real-time global view of space events</p>
            </div>
            <InteractiveMap 
                isLoading={isLoading} 
                location={location} 
                onEventSelect={handleViewDetails}
                events={filteredEvents}
                activeTypes={activeTypes}
                hoveredEventId={hoveredEventId}
                radarActive={radarActive}
                onToggleRadar={() => setRadarActive(!radarActive)}
            />
        </div>

        {/* Compact Filter Bar (Below Map) */}
        <FilterBar 
            activeTypes={activeTypes} 
            onToggleType={toggleType} 
            timeRange={timeRange} 
            onTimeChange={setTimeRange}
            location={location}
            onLocationChange={handleLocationChange}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column: Events Grid (2/3 width on large screens) */}
            <div className="xl:col-span-2 space-y-12">
                 
                  {/* Upcoming Events (Single Column for wide cards) */}
                  <div>
                     <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
                         📅 Upcoming Events
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6">
                        {isLoading ? (
                            <>
                                <SkeletonEventCard />
                                <SkeletonEventCard />
                                <SkeletonEventCard />
                            </>
                        ) : (
                            filteredEvents.map(event => (
                                <IntelligentEventCard
                                    key={event.id}
                                    event={event}
                                    onViewDetails={() => handleViewDetails(event)}
                                    onToggleInterest={() => handleToggleInterested(event.id)}
                                    onSetAlert={(time) => handleSetAlert(event.id, time)}
                                    onAddToCalendar={() => handleAddToCalendar(event.id)}
                                    onMouseEnter={() => setHoveredEventId(event.id)}
                                    onMouseLeave={() => setHoveredEventId(null)}
                                />
                            ))
                        )}
                    </div>
                 </div>



            </div>

            {/* Right Column: Intelligence Panel (1/3 width) */}
            <div className={`space-y-8 transition-opacity duration-700 ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {/* Section 4: Alert Timeline */}
                <AlertTimeline activeTimeRange={timeRange} />

                {/* Section 6: Event Archive */}
                <EventArchive onSelectEvent={handleViewDetails} activeTypes={activeTypes} />
            </div>
        </div>
      </div>

      {/* Section 5: Event Detail Modal */}
      {showModal && selectedEvent && (
        <EventDetailModal
            event={selectedEvent}
            onClose={() => setShowModal(false)}
            onToggleInterested={() => handleToggleInterested(selectedEvent.id)}
        />
      )}

      {/* Global Prototype Footer */}
      <footer className="max-w-[1400px] mx-auto mt-20 pb-12 pt-8 border-t border-[#4CC9F0]/10 text-center">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-[0.3em] font-medium opacity-60">
              This is a static frontend prototype. All intelligence and automation are simulated for demonstration.
          </p>
      </footer>
    </div>
  );
}
