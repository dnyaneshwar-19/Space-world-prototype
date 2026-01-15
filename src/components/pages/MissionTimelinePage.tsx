import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
  category: 'past' | 'future';
}

export function MissionTimelinePage() {
  const [focusedEvent, setFocusedEvent] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const events: TimelineEvent[] = [
    {
      id: 1,
      year: '500 BCE',
      title: 'Ancient Astronomy',
      description: 'Ancient civilizations begin systematic observation of celestial bodies, laying the foundation for modern astronomy.',
      image: 'https://images.unsplash.com/photo-1652092230078-fd103d8ef4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYXN0cm9ub215fGVufDF8fHx8MTc2ODIzOTYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'past'
    },
    {
      id: 2,
      year: '1957',
      title: 'Sputnik Launch',
      description: 'The Soviet Union launches Sputnik 1, the first artificial satellite, marking the beginning of the Space Age.',
      image: 'https://images.unsplash.com/photo-1668438602285-ac7952fa5f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHV0bmlrJTIwc2F0ZWxsaXRlfGVufDF8fHx8MTc2ODIzOTYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'past'
    },
    {
      id: 3,
      year: '1969',
      title: 'Apollo 11 Moon Landing',
      description: 'Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon, achieving one of humanity\'s greatest accomplishments.',
      image: 'https://images.unsplash.com/photo-1614726365930-627c75da663e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcG9sbG8lMjBtb29uJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjgyMzk2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'past'
    },
    {
      id: 4,
      year: '2004',
      title: 'Mars Rover Landing',
      description: 'NASA\'s Spirit and Opportunity rovers successfully land on Mars, beginning an era of robotic Mars exploration.',
      image: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcm92ZXJ8ZW58MXx8fHwxNzY4MTU2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'past'
    },
    {
      id: 5,
      year: '2011',
      title: 'ISS Completed',
      description: 'The International Space Station reaches completion, becoming humanity\'s permanent outpost in low Earth orbit.',
      image: 'https://images.unsplash.com/photo-1614314007212-0257d6e2f7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3BhY2UlMjBzdGF0aW9ufGVufDF8fHx8MTc2ODE5NTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'past'
    },
    {
      id: 6,
      year: '2028',
      title: 'Artemis Moon Base',
      description: 'NASA\'s Artemis program establishes the first permanent lunar base, paving the way for sustained human presence on the Moon.',
      image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlfGVufDF8fHx8MTc2ODE1NjQwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'future'
    },
    {
      id: 7,
      year: '2035',
      title: 'First Mars Mission',
      description: 'International collaboration sends the first crewed mission to Mars, marking humanity\'s first steps on another planet.',
      image: 'https://images.unsplash.com/photo-1614315517650-3771cf72d18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcm92ZXJ8ZW58MXx8fHwxNzY4MTU2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'future'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const eventElements = timeline.querySelectorAll('[data-event-id]');
      const viewportCenter = window.innerHeight / 2;

      eventElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < 200) {
          const eventId = parseInt(element.getAttribute('data-event-id') || '0');
          setFocusedEvent(eventId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#4CC9F0]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
              Mission Timeline
            </h1>
          </div>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Journey through the history of space exploration from ancient astronomy to future missions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4CC9F0] via-[#38BDF8] to-[#4CC9F0] transform -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-[#4CC9F0] blur-sm opacity-50"></div>
          </div>

          {/* Events */}
          <div className="space-y-24">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isFocused = focusedEvent === event.id;

              return (
                <div
                  key={event.id}
                  data-event-id={event.id}
                  className={`relative transition-all duration-500 ${
                    isFocused ? 'scale-105' : 'scale-95 opacity-70'
                  }`}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className={`bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl overflow-hidden border transition-all duration-300 ${
                        isFocused 
                          ? 'border-[#4CC9F0] glow-border' 
                          : 'border-[#4CC9F0]/20'
                      }`}>
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-transparent to-transparent"></div>
                          
                          {/* Year Badge */}
                          <div className="absolute top-4 right-4 px-4 py-2 bg-[#4CC9F0]/20 backdrop-blur-sm rounded-full border border-[#4CC9F0]/30">
                            <span className="text-sm font-bold text-[#4CC9F0] font-['JetBrains_Mono']">
                              {event.year}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              event.category === 'past'
                                ? 'bg-[#9CA3AF]/20 text-[#9CA3AF] border border-[#9CA3AF]/30'
                                : 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                            }`}>
                              {event.category === 'past' ? 'Historical' : 'Future Mission'}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3 font-['Orbitron']">
                            {event.title}
                          </h3>
                          <p className="text-[#9CA3AF] mb-4">
                            {event.description}
                          </p>
                          <Button 
                            variant="outline"
                            className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                          >
                            View Mission Details
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:flex items-center justify-center flex-shrink-0">
                      <div className={`relative w-6 h-6 rounded-full transition-all duration-300 ${
                        isFocused
                          ? 'bg-[#4CC9F0] scale-150'
                          : 'bg-[#38BDF8] scale-100'
                      }`}>
                        <div className="absolute inset-0 rounded-full bg-[#4CC9F0] blur-md opacity-70 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
            <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3 font-['Orbitron']">
              Explore More Missions
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Discover detailed information about past achievements and upcoming space missions
            </p>
            <Button className="bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020]">
              Browse All Missions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
