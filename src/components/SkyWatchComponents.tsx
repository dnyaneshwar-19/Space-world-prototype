import React, { useState } from 'react';
import { 
  Rocket, Satellite, Moon, MapPin, ChevronDown, Check, ChevronsUpDown, Clock, 
  Calendar, Star, Bell as BellIcon, CheckCircle2, 
  Radio, BellRing, Info, X, Wifi, TrendingUp, Globe, History as HistoryIcon, 
  ChevronRight, PlayCircle, Eye, Database
} from 'lucide-react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner';
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from './ui/drawer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useIsMobile } from './ui/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';

// --- Types ---
export type EventType = 'rocket' | 'iss' | 'asteroid' | 'eclipse';
export type TimeRange = '6m' | '30d' | '7d' | '24h' | '1h';

interface FilterBarProps {
  activeTypes: EventType[];
  onToggleType: (type: EventType) => void;
  timeRange: TimeRange;
  onTimeChange: (range: TimeRange) => void;
  location: string;
  onLocationChange: (location: string) => void;
}

// --- Icons Helper ---
export const EventIcons = {
  rocket: Rocket,
  iss: Satellite,
  asteroid: ({ className }: { className?: string }) => <span className={`text-lg ${className}`}>☄️</span>,
  eclipse: Moon,
};

// --- MOCK CITIES for Navigation ---
export const MOCK_CITIES = [
    { value: "Mumbai, India", label: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
    { value: "Kolkata, India", label: "Kolkata, India", lat: 22.5726, lon: 88.3639 },
    { value: "Delhi, India", label: "Delhi, India", lat: 28.6139, lon: 77.2090 },
    { value: "New York, USA", label: "New York, USA", lat: 40.7128, lon: -74.0060 },
    { value: "London, UK", label: "London, UK", lat: 51.5074, lon: -0.1278 },
];

// --- Global Types & Helpers ---

export function FilterBar({ activeTypes, onToggleType, timeRange, onTimeChange, location, onLocationChange }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const eventTypes: { id: EventType; label: string; icon: any }[] = [
    { id: 'rocket', label: 'Rockets', icon: EventIcons.rocket },
    { id: 'iss', label: 'ISS', icon: EventIcons.iss },
    { id: 'asteroid', label: 'Asteroids', icon: EventIcons.asteroid },
    { id: 'eclipse', label: 'Eclipses', icon: EventIcons.eclipse },
  ];

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: '1h', label: '1h' },
    { id: '24h', label: '24h' },
    { id: '7d', label: '7d' },
    { id: '30d', label: '30d' },
    { id: '6m', label: '6m' },
  ];

  const handleSelectCity = (currentValue: string) => {
    onLocationChange(currentValue);
    setOpen(false);
    toast.success(`Location updated to ${currentValue}`, {
        description: "Space events and visibility data refreshed.",
        icon: <MapPin className="w-4 h-4 text-green-500" />,
    });
  };

  const LocationList = () => (
      <Command className="bg-transparent h-full">
        <CommandInput placeholder="Search city..." className="text-[#E5E7EB]" />
        <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                {MOCK_CITIES.map((city) => (
                    <CommandItem
                        key={city.value}
                        value={city.value}
                        onSelect={(currentValue: string) => handleSelectCity(city.label)}
                        className="text-[#E5E7EB] aria-selected:bg-[#4CC9F0]/20 aria-selected:text-[#4CC9F0]"
                    >
                        <Check
                            className={`mr-2 h-4 w-4 ${
                                location === city.label ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        {city.label}
                    </CommandItem>
                ))}
            </CommandGroup>
        </CommandList>
    </Command>
  );

  return (
    <div className="w-full bg-[#0F1A2E]/80 backdrop-blur-md border border-[#4CC9F0]/20 rounded-xl mb-8 shadow-lg">
      <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Compact Event Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto">
            {eventTypes.map((type) => {
                const Icon = type.icon;
                const isActive = activeTypes.includes(type.id);
                return (
                    <button
                        key={type.id}
                        onClick={() => onToggleType(type.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all whitespace-nowrap ${
                            isActive 
                            ? 'bg-[#4CC9F0]/20 border-[#4CC9F0] text-[#4CC9F0]' 
                            : 'bg-black/20 border-white/5 text-gray-400 hover:text-white'
                        }`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        {type.label}
                    </button>
                );
            })}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             {/* Time Range */}
             <div className="flex bg-black/30 rounded-lg p-1 border border-white/5">
                {['24h', '30d'].map((range) => (
                      <button
                        key={range}
                        onClick={() => onTimeChange(range as TimeRange)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                            timeRange === range
                            ? 'bg-[#4CC9F0] text-[#0B1020]'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {range}
                    </button>
                ))}
            </div>

            {/* Location Switcher */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-1 text-white hover:text-[#4CC9F0] hover:bg-transparent font-medium text-sm h-8 px-2"
                        >
                            {location}
                            <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[180px] p-0 border-[#4CC9F0]/30 bg-[#0B1020] text-gray-200">
                        <LocationList />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- Intelligent Event Card ---

export interface IntelligentEventProps {
  id: number;
  title: string;
  icon: any; // Using any for component reference from icons object
  countdown: string;
  visibility: 'Naked Eye' | 'Telescope Required' | 'Binoculars';
  regionRelevance: string;
  image: string;
  date: string;
  type: EventType;
  isArchived?: boolean;
  isInterested?: boolean;

  eventTimestamp?: Date; // Added for filtering
  alertSet?: string | null; // e.g. '24h'
  isScheduled?: boolean;
}

export interface IntelligentEventCardProps {
    event: IntelligentEventProps;
    onViewDetails: () => void;
    onToggleInterest?: () => void;
    onSetAlert?: (time: string) => void;
    onAddToCalendar?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function IntelligentEventCard({ 
    event, 
    onViewDetails, 
    onToggleInterest, 
    onSetAlert, 
    onAddToCalendar,
    onMouseEnter,
    onMouseLeave
}: IntelligentEventCardProps) {
  const Icon = event.icon;
  // Use props for state to ensure global persistence, fallback to local only if necessary (which we won't needed if parent handles it)
  // But strictly matching the prompt "State persists during session", relying on parent state is correct.
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleInterested = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleInterest?.();
    toast.success(!event.isInterested ? "Added to interests" : "Removed from interests", {
        icon: <Star className={`w-4 h-4 ${!event.isInterested ? 'fill-[#FACC15] text-[#FACC15]' : ''}`} />
    });
  };

  const handleAlertSelect = (time: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onSetAlert?.(time);
    setAlertOpen(false);
    toast.success("Browser alert enabled (simulated)", { 
        icon: <BellIcon className="w-4 h-4 text-[#4CC9F0]" />,
        description: `Browser notification set for ${time}.`
    });
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCalendarOpen(true);
  };

  const confirmAddToCalendar = (e: React.MouseEvent) => {
      e.stopPropagation();
      onAddToCalendar?.();
      setCalendarOpen(false);
      toast.success("Calendar reminder added (simulated)", {
          icon: <Calendar className="w-4 h-4 text-[#4CC9F0]" />,
          description: `${event.title} is now scheduled.`
      });
  };

  const AlertOptions = () => (
      <div className="flex flex-col p-2 space-y-1">
        <div className="px-2 py-1.5 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Set Reminder</div>
        {['24 Hours Before', '1 Hour Before'].map((time) => (
            <button
                key={time}
                onClick={(e) => handleAlertSelect(time, e)}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors group ${event.alertSet === time ? 'bg-[#4CC9F0]/20 text-[#4CC9F0]' : 'text-[#E5E7EB] hover:bg-[#4CC9F0]/10 hover:text-[#4CC9F0]'}`}
            >
                <span>{time}</span>
                <BellIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        ))}
      </div>
  );

  const CalendarConfirmation = () => (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center border border-[#22C55E]/20">
              <Calendar className="w-6 h-6 text-[#22C55E]" />
          </div>
          <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E5E7EB] font-['Orbitron']">Add to Calendar?</h3>
              <p className="text-sm text-[#9CA3AF]">Schedule {event.title} for {event.date}.</p>
          </div>
          <Button 
            className="w-full bg-[#0B1020] border border-[#4CC9F0]/30 hover:bg-[#4CC9F0]/10 text-[#4CC9F0]"
            onClick={confirmAddToCalendar}
          >
              Confirm
          </Button>
      </div>
  );

  return (
    <>
    <div 
      className="group relative flex flex-col w-full bg-[#0F1A2E]/80 backdrop-blur-sm rounded-xl border border-[#4CC9F0]/20 overflow-hidden hover:border-[#4CC9F0] hover:shadow-[0_0_20px_rgba(76,201,240,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
      onClick={onViewDetails}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image Header (Top 45%) */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-transparent to-transparent z-10"></div>
        <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Countdown Badge */}
        <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#4CC9F0]/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
            <span className="text-xs font-mono text-[#E5E7EB]">{event.countdown}</span>
        </div>

        {/* Region Badge */}
         <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[#4CC9F0]/10 border border-[#4CC9F0]/20 text-[#4CC9F0] text-[10px] uppercase tracking-wider font-semibold">
                {event.regionRelevance}
            </span>
        </div>
      </div>

       {/* Content Body (Bottom 55%) */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0F172A]/50 to-transparent">
        <div>
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-[#4CC9F0] transition-colors font-['Orbitron'] leading-tight line-clamp-2">
                    {event.title}
                </h3>
                <div className="p-2 rounded-lg bg-[#4CC9F0]/5 border border-[#4CC9F0]/10 text-[#4CC9F0] group-hover:bg-[#4CC9F0]/20 transition-all">
                     <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded border border-[#4CC9F0]/10">
                     <Eye className="w-3.5 h-3.5 text-[#4CC9F0]" />
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${event.visibility === 'Naked Eye' ? 'text-[#22C55E]' : 'text-[#FACC15]'}`}>
                        {event.visibility}
                     </span>
                </div>
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded border border-white/5">
                    <span className="text-[10px] text-gray-400 font-medium">{event.date}</span>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#4CC9F0]/10 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
             <Button 
                variant="outline" 
                size="sm" 
                className={`flex-1 border-[#4CC9F0]/20 hover:bg-[#4CC9F0]/10 hover:text-[#4CC9F0] text-xs h-9 transition-colors ${event.isInterested ? 'bg-[#4CC9F0]/10 text-[#4CC9F0] border-[#4CC9F0]/50' : 'text-[#9CA3AF]'}`}
                onClick={handleInterested}
             >
                <Star className={`w-3.5 h-3.5 mr-1.5 ${event.isInterested ? 'fill-current' : ''}`} />
                {event.isInterested ? 'Saved' : 'Save'}
             </Button>

             <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#4CC9F0] hover:text-[#38BDF8] hover:bg-[#4CC9F0]/10 text-xs h-9 gap-1"
                onClick={() => onViewDetails()}
            >
                Details
                <ChevronRight className="w-3 h-3" />
            </Button>
        </div>
      </div>
    </div>
    </>
  );
}


export function SkeletonEventCard() {
  return (
    <div className="bg-[#0F1A2E]/40 rounded-xl border border-[#4CC9F0]/10 overflow-hidden h-full">
      <div className="h-48 bg-[#4CC9F0]/5 animate-pulse relative">
           <div className="absolute top-3 right-3 w-20 h-6 bg-[#4CC9F0]/10 rounded-full"></div>
      </div>
      <div className="p-5 space-y-4">
        <div className="h-6 bg-[#4CC9F0]/10 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-[#4CC9F0]/5 rounded w-1/2 animate-pulse"></div>
        <div className="flex gap-2 pt-4 border-t border-[#4CC9F0]/5">
            <div className="h-8 flex-1 bg-[#4CC9F0]/5 rounded animate-pulse"></div>
            <div className="h-8 flex-1 bg-[#4CC9F0]/5 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
// --- Alert Timeline ---

interface AlertTimelineProps {
    activeTimeRange?: TimeRange;
}

const stages = [
    { 
        id: 1, 
        label: 'Long-Term Awareness', 
        time: '6 Months', 
        icon: Radio,
        description: "Up to 6 months before the event. Initial identification of orbital objects stored in tracking database."
    },
    { 
        id: 2, 
        label: 'Mid-Term Reminder', 
        time: '7 Days', 
        icon: Info,
        description: "7 days before the event. Local visibility probability recalculated based on weather trending."
    },
    { 
        id: 3, 
        label: 'Short-Term Alert', 
        time: '1 Hour', 
        icon: BellRing,
        description: "1 hour before visibility window. Real-time path projection and active reminder triggers."
    },
];

export function AlertTimeline({ activeTimeRange }: AlertTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [simulating, setSimulating] = useState(false);

  // Map TimeRange to stage IDs for highlighting
  const timeToStageMap: Record<string, number> = {
      '6m': 1,
      '30d': 1,
      '7d': 2,
      '24h': 2,
      '1h': 3
  };

  const activeStageId = activeTimeRange ? timeToStageMap[activeTimeRange] : 2;

  const handleSimulate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSimulating(true);
    toast("Incoming Observation Window", {
        description: "Event Visibility Window Opens in 5 mins",
        icon: <BellRing className="w-5 h-5 text-[#4CC9F0] animate-swing" />, 
        duration: 4000,
    });
    
    setTimeout(() => {
        setSimulating(false);
        toast.success("Ready for Observation", {
            description: "Notifications enabled for the next visible window.",
            icon: <Check className="w-4 h-4 text-[#22C55E]" />
        });
    }, 3000);
  };

  return (
    <div className="w-full bg-[#0F1A2E]/60 backdrop-blur-md rounded-xl border border-[#4CC9F0]/20 p-6 overflow-hidden relative">
       {/* Background decorative glow */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CC9F0]/5 rounded-full blur-3xl pointer-events-none"></div>

       <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
                <BellRing className="w-5 h-5 text-[#4CC9F0]" />
                <h3 className="text-lg font-bold text-[#E5E7EB] font-['Orbitron']">Detection Stages</h3>
            </div>
            <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleSimulate}
                className="text-[#4CC9F0] hover:bg-[#4CC9F0]/10 text-xs border border-[#4CC9F0]/20 hidden md:flex"
            >
                Simulate Notification
            </Button>
       </div>

       <div className="relative">
            {/* Vertical Line (Desktop) */}
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-[#4CC9F0]/20 hidden md:block"></div>

            <div className="flex md:flex-col gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    // Determine status based on activeStageId (from time filter)
                    // If stage.id < activeStageId -> completed
                    // If stage.id === activeStageId -> active
                    // If stage.id > activeStageId -> future/pending
                    
                    let status = 'pending';
                    if (stage.id < activeStageId) status = 'completed';
                    if (stage.id === activeStageId) status = 'active';

                    const isExpanded = expandedId === stage.id;

                    return (
                        <div 
                            key={stage.id} 
                            className="relative flex flex-col md:flex-row items-start shrink-0 px-2 md:px-0 cursor-pointer group"
                            onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                        >
                            {/* Icon Marker */}
                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500
                                ${status === 'completed' ? 'bg-[#4CC9F0] border-[#4CC9F0] text-[#0B1020]' : 
                                  status === 'active' ? 'bg-[#0B1020] border-[#4CC9F0] text-[#4CC9F0] shadow-[0_0_15px_#4CC9F0]' : 
                                  'bg-[#0B1020] border-[#9CA3AF]/30 text-[#9CA3AF]/50'}`}
                            >
                                <Icon className={`w-4 h-4 ${status === 'active' ? 'animate-pulse' : ''}`} />
                                
                                {status === 'active' && (
                                    <span className="absolute inset-0 rounded-full animate-ping bg-[#4CC9F0]/30"></span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="mt-3 md:mt-0 md:ml-4 text-center md:text-left flex-1">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <p className={`text-sm font-bold transition-colors duration-300 ${status === 'active' ? 'text-[#4CC9F0]' : 'text-[#E5E7EB] group-hover:text-[#4CC9F0]'}`}>
                                        {stage.label}
                                    </p>
                                    {status === 'active' && <span className="flex w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse md:hidden"></span>}
                                </div>
                                <p className="text-xs text-[#9CA3AF] mt-0.5">{stage.time}</p>
                                
                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="text-xs text-[#9CA3AF]/80 bg-[#4CC9F0]/5 p-3 rounded-lg border border-[#4CC9F0]/10 flex gap-2 text-left">
                                                <Info className="w-3 h-3 text-[#4CC9F0] shrink-0 mt-0.5" />
                                                <span>
                                                    <span className="font-bold text-[#4CC9F0] block mb-1">This alert is automatically triggered</span>
                                                    {stage.description}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            
                            {/* Connector Line for Mobile */}
                             {index < stages.length - 1 && (
                                <div className={`absolute top-4 left-full w-full h-0.5 -ml-4 md:hidden
                                     ${stage.id < activeStageId ? 'bg-[#4CC9F0]' : 'bg-[#4CC9F0]/20'}`}></div>
                            )}
                        </div>
                    );
                })}
            </div>
       </div>

       {/* Mobile Simulate Button (visible only on mobile) */}
        <Button 
            size="sm" 
            variant="outline" 
            onClick={handleSimulate}
            className="w-full mt-6 text-[#4CC9F0] border-[#4CC9F0]/20 hover:bg-[#4CC9F0]/10 md:hidden"
        >
            Simulate Alert System
        </Button>
    </div>
  );
}

// --- Event Detail Modal ---

interface EventDetailModalProps {
  event: IntelligentEventProps;
  onClose: () => void;
  onToggleInterested?: () => void;
  onSubscribe?: () => void;
}

export function EventDetailModal({ event, onClose, onToggleInterested, onSubscribe }: EventDetailModalProps) {
    const Icon = event.icon;
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [showSubscribeOptions, setShowSubscribeOptions] = useState(false);

    const handleSubscribe = (channelId: string, method: string) => {
        setIsSubscribing(true);
        // Simulate API
        setTimeout(() => {
            setIsSubscribing(false);
            localStorage.setItem(`sub_${event.id}_${channelId}`, 'true');
            
            let toastMsg = "";
            if (channelId === 'browser') toastMsg = "Browser alert enabled (simulated)";
            else if (channelId === 'email') toastMsg = "Email reminder scheduled (simulated)";
            else if (channelId === 'calendar') toastMsg = "Calendar reminder added (simulated)";

            toast.success(toastMsg, {
                icon: <Check className="w-4 h-4 text-[#22C55E]" />,
                description: `You will receive updates for ${event.title}.`
            });
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
             
             {/* Wide Landscape Modal Container */}
             <div className="relative bg-[#0B1020] w-full max-w-6xl h-[85vh] overflow-hidden rounded-2xl border border-[#4CC9F0]/30 shadow-[0_0_80px_rgba(76,201,240,0.15)] flex flex-col">
                
                {/* Close Button Absolute */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all border border-white/10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content Layout - Two Columns: Left (Visuals) 45%, Right (Data) 55% */}
                <div className="flex flex-col lg:flex-row h-full">
                    
                    {/* LEFT: Immersive Visual Panel */}
                    <div className="w-full lg:w-[45%] h-[40%] lg:h-full relative bg-black/40 border-b lg:border-b-0 lg:border-r border-[#4CC9F0]/10 flex flex-col justify-end p-8 overflow-hidden group">
                        {/* Background Image / Schematic */}
                        <div className="absolute inset-0 opacity-40 mix-blend-screen scale-105 group-hover:scale-110 transition-transform duration-[20s]">
                             {/* Placeholder for Schematic - simulating complexity */}
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                             <div className="absolute inset-0 border-[0.5px] border-[#4CC9F0]/20 rounded-full scale-[0.8]"></div>
                             <div className="absolute inset-0 border-[0.5px] border-[#4CC9F0]/10 rounded-full scale-[1.2] border-dashed"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#4CC9F0]/10 rounded-full blur-[50px]"></div>
                        </div>

                        {/* Large Central Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-8">
                             <div className="w-32 h-32 rounded-full border border-[#4CC9F0]/30 flex items-center justify-center bg-[#0B1020]/50 backdrop-blur-sm shadow-[0_0_30px_rgba(76,201,240,0.1)]">
                                 <Icon className="w-16 h-16 text-[#4CC9F0]" />
                             </div>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="relative z-10 space-y-4">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CC9F0]/10 border border-[#4CC9F0]/20 rounded-lg backdrop-blur-md w-fit">
                                <Database className="w-3.5 h-3.5 text-[#4CC9F0]" />
                                <span className="text-[10px] uppercase font-bold text-[#E5E7EB] tracking-wider">Unified Event Record</span>
                             </div>
                             
                             <div>
                                 <h2 className="text-4xl md:text-5xl font-bold text-white font-['Orbitron'] tracking-wide leading-none mb-2">
                                     {event.title}
                                 </h2>
                                 <p className="text-[#9CA3AF] text-sm max-w-xs">{event.regionRelevance} • ID: {event.id}-XF</p>
                             </div>
                        </div>
                    </div>

                    {/* RIGHT: Data & Actions Panel */}
                    <div className="w-full lg:w-[55%] h-[60%] lg:h-full overflow-y-auto bg-[#0B1020] p-8 lg:p-10 flex flex-col relative">
                        
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#4CC9F0]/10">
                            <div className="space-y-1">
                                <div className="text-xs font-bold text-[#4CC9F0] uppercase tracking-[0.2em] mb-1">Scientific Context</div>
                                <p className="text-[#E5E7EB] leading-relaxed text-sm md:text-base opacity-90 max-w-xl">
                                    Observation data for the {event.title} project. This event represents a characteristic orbital transit or predictable celestial alignment synchronized with global observatory networks.
                                </p>
                            </div>
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {[
                                { label: "Visibility", value: event.visibility, icon: Eye, color: event.visibility === 'Naked Eye' ? '#22C55E' : '#EAB308' },
                                { label: "Countdown", value: event.countdown, icon: Clock, color: '#4CC9F0' },
                                { label: "Date", value: event.date, icon: Calendar, color: '#F472B6' },
                                { label: "Bio Impact", value: "None", icon: Globe, color: '#9CA3AF' },
                                { label: "Observability", value: "Clear", icon: Wifi, color: '#9CA3AF' },
                                { label: "View Scale", value: "Optimal", icon: TrendingUp, color: '#9CA3AF' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col p-4 rounded-xl bg-[#0F172A]/50 border border-[#4CC9F0]/10 hover:border-[#4CC9F0]/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">{stat.label}</span>
                                    </div>
                                    <div className="text-lg font-bold text-[#E5E7EB] font-mono truncate">{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Section */}
                        <div className="mt-auto space-y-4">
                            {/* Simulated Path Tracking Bar */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-[#4CC9F0]/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center animate-spin-slow">
                                        <Satellite className="w-5 h-5 text-[#4CC9F0]" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-[#4CC9F0] uppercase tracking-wider mb-0.5">Active Path Calculation</div>
                                        <div className="text-xs text-gray-400 font-mono">Telemetry: Live Sync • {Math.floor(Math.random() * 9000) + 1000} km/h</div>
                                    </div>
                                </div>
                                <div className=" hidden md:block text-right">
                                    <div className="text-xl font-bold text-white font-mono">7.66 km/s</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Velocity</div>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button 
                                    className="flex-1 h-12 bg-[#4CC9F0] text-[#0B1020] hover:bg-[#38BDF8] font-bold tracking-wide uppercase text-xs"
                                    onClick={onToggleInterested}
                                >
                                    <Star className="w-4 h-4 mr-2" />
                                    {event.isInterested ? 'Remove from Interests' : 'Mark as Interested'}
                                </Button>
                                <Button 
                                    className="flex-1 h-12 bg-transparent border border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10 font-bold tracking-wide uppercase text-xs"
                                    onClick={() => handleSubscribe('browser', 'push')}
                                >
                                    <BellRing className="w-4 h-4 mr-2" />
                                    Enable Alerts
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
             </div>
         </div>
    );
}

// --- Event Archive ---

export function EventArchive({ onSelectEvent, activeTypes }: { onSelectEvent: (event: IntelligentEventProps) => void, activeTypes?: EventType[] }) {
  const [expandedMonths, setExpandedMonths] = useState<string[]>(['December 2025']);
  const [isFullView, setIsFullView] = useState(false);

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const rawHistory = [
    // ... (Keep existing data)
    {
      month: 'December 2025',
      events: [
        { 
            id: 101, 
            title: 'Geminids Meteor Peak', 
            date: 'Dec 14', 
            type: 'asteroid' as EventType, 
            status: 'viewed',
            icon: EventIcons.asteroid,
            image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2072&auto=format&fit=crop",
            countdown: "Ended",
            visibility: "Naked Eye" as const,
            regionRelevance: "Global Visibility",
            isArchived: true
        },
        { 
            id: 102, 
            title: 'Soyuz MS-27 Launch', 
            date: 'Dec 08', 
            type: 'rocket' as EventType, 
            status: 'replay',
            icon: EventIcons.rocket,
            image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=2070&auto=format&fit=crop",
            countdown: "Launched",
            visibility: "Binoculars" as const,
            regionRelevance: "Baikonur Cosmodrome",
            isArchived: true
        },
      ],
    },
    {
      month: 'November 2025',
      events: [
        { 
            id: 103, 
            title: 'Beaver Moon Eclipse', 
            date: 'Nov 24', 
            type: 'eclipse' as EventType, 
            status: 'viewed',
            icon: EventIcons.eclipse,
            image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2071&auto=format&fit=crop",
            countdown: "Ended",
            visibility: "Naked Eye" as const,
            regionRelevance: "North America",
            isArchived: true
        },
        { 
            id: 104, 
            title: 'Starship Flight 7', 
            date: 'Nov 12', 
            type: 'rocket' as EventType, 
            status: 'replay',
            icon: EventIcons.rocket,
            image: "https://images.unsplash.com/photo-1541185933-710f50033eDA?q=80&w=2072&auto=format&fit=crop",
            countdown: "Launched",
            visibility: "Binoculars" as const,
            regionRelevance: "Starbase, TX",
            isArchived: true
        },
        { 
            id: 105, 
            title: 'ISS EVA #91', 
            date: 'Nov 05', 
            type: 'iss' as EventType, 
            status: 'viewed',
            icon: EventIcons.iss,
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
            countdown: "Completed",
            visibility: "Telescope Required" as const,
            regionRelevance: "Low Earth Orbit",
            isArchived: true
        },
      ],
    },
  ];

  // Filter Logic
  const eventHistory = activeTypes 
      ? rawHistory.map(group => ({
          ...group,
          events: group.events.filter(e => activeTypes.includes(e.type))
        })).filter(group => group.events.length > 0)
      : rawHistory;

  return (
    <div className={`bg-[#0F1A2E]/60 backdrop-blur-md rounded-xl border border-[#4CC9F0]/20 overflow-hidden mt-8 transition-all duration-500 ${isFullView ? 'max-h-[800px]' : 'max-h-[400px]'}`}>
      <div className="p-4 border-b border-[#4CC9F0]/10 flex items-center justify-between sticky top-0 bg-[#0F1A2E]/90 backdrop-blur-xl z-10">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-[#4CC9F0]" />
          <h3 className="text-lg font-bold text-[#E5E7EB] font-['Orbitron']">Mission Archive</h3>
        </div>
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsFullView(!isFullView)}
            className="text-[#9CA3AF] hover:text-[#4CC9F0] text-xs"
        >
          {isFullView ? "Collapse Archive" : "View All"}
        </Button>
      </div>

      <div className="p-2 space-y-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: isFullView ? '740px' : '340px' }}>
        {eventHistory.length === 0 ? (
            <div className="p-4 text-center text-[#9CA3AF] text-sm">No archived events match filter.</div>
        ) : (
        eventHistory.map((group) => {
          const isExpanded = expandedMonths.includes(group.month);
          return (
            <div key={group.month} className="rounded-lg overflow-hidden">
                <button 
                    onClick={() => toggleMonth(group.month)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-[#4CC9F0]/5 transition-colors"
                >
                    <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{group.month}</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="space-y-4 px-2 pb-2 relative">
                            {/* Desktop Timeline Line */}
                            <div className="absolute left-[29px] top-2 bottom-2 w-0.5 bg-[#4CC9F0]/20 hidden md:block"></div>

                            {group.events.map((event) => {
                                const TypeIcon = event.icon as React.ElementType;
                                
                                return (
                                    <div key={event.id} className="relative md:pl-12">
                                        {/* Timeline Dot (Desktop) */}
                                        <div className="absolute left-6 top-8 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0B1020] border-2 border-[#4CC9F0] z-10 hidden md:block transition-all duration-300 shadow-[0_0_10px_rgba(76,201,240,0.5)]"></div>

                                        <div 
                                            onClick={() => onSelectEvent(event)}
                                            className="group flex items-center justify-between p-3 rounded-lg bg-[#0B1020]/40 border border-[#4CC9F0]/5 hover:border-[#4CC9F0]/30 hover:bg-[#4CC9F0]/5 transition-all cursor-pointer relative z-20"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#0B1020] flex items-center justify-center border border-[#4CC9F0]/20 text-[#9CA3AF] group-hover:text-[#4CC9F0]">
                                                    <TypeIcon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-[#E5E7EB] group-hover:text-[#4CC9F0] transition-colors">{event.title}</div>
                                                    <div className="text-xs text-[#6B7280]">{event.date}</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                {event.status === 'replay' && (
                                                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#FACC15] bg-[#FACC15]/10 px-2 py-0.5 rounded-full border border-[#FACC15]/20">
                                                        <PlayCircle className="w-3 h-3" />
                                                    </span>
                                                )}
                                                {event.status === 'viewed' && (
                                                    <span className="text-[10px] uppercase font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20">
                                                        Saved
                                                    </span>
                                                )}
                                                <ChevronRight className="w-4 h-4 text-[#4CC9F0]/30 group-hover:text-[#4CC9F0] transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}

