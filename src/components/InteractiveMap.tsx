import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { Globe, Layers, Satellite, Rocket, Moon, X, MapPin, Clock, Radar, ZoomIn, Maximize2, Star } from 'lucide-react';
import { IntelligentEventProps, EventType } from './SkyWatchComponents';
import { Button } from './ui/button';

// Custom Scientific icons using Leaflet DivIcons
const createCustomIcon = (color: string, emoji: string, isHovered?: boolean, isInterested?: boolean) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="position: relative; width: 32px; height: 32px;">
        <div class="${isHovered ? 'animate-pulse' : ''}" style="
          background-color: ${color}20;
          border: 2px solid ${color};
          width: ${isHovered ? '40px' : '32px'};
          height: ${isHovered ? '40px' : '32px'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 ${isHovered ? '20px' : '10px'} ${color};
          transition: all 0.3s ease;
          transform: ${isHovered ? 'translate(-4px, -4px)' : 'none'};
        ">
          <div style="font-size: ${isHovered ? '20px' : '16px'};">
            ${emoji}
          </div>
        </div>
        ${isInterested ? `
          <div style="
            position: absolute;
            top: -8px;
            right: -8px;
            background: #FACC15;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px #FACC15;
            z-index: 100;
          ">
            <svg viewBox="0 0 24 24" width="8" height="8" fill="black"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
        ` : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const getMapIcon = (type: EventType, color: string, emoji: string, isHovered: boolean, isInterested: boolean) => {
    return createCustomIcon(color, emoji, isHovered, isInterested);
};

export interface InteractiveMapProps {
    isLoading?: boolean;
    location?: string;
    onEventSelect?: (event: IntelligentEventProps) => void;
    events?: IntelligentEventProps[];
    activeTypes?: EventType[];
    hoveredEventId?: number | null;
    radarActive?: boolean;
    onToggleRadar?: () => void;
}

export function InteractiveMap({ 
    isLoading, 
    location, 
    onEventSelect,
    events = [],
    activeTypes = [],
    hoveredEventId = null,
    radarActive = false,
    onToggleRadar
}: InteractiveMapProps) {
  const [issPos, setIssPos] = useState<[number, number]>([20, 30]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ISS Orbit Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIssPos(prev => {
        const nextLng = prev[1] + 0.5;
        const nextLat = Math.sin(nextLng * Math.PI / 180) * 45;
        return [nextLat, nextLng > 180 ? -180 : nextLng];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute Ground Track for ISS
  const issTrack = useMemo(() => {
      const points: [number, number][] = [];
      const currentLng = issPos[1];
      for (let i = -60; i < 60; i += 5) {
          const lng = currentLng + i;
          const lat = Math.sin(lng * Math.PI / 180) * 45;
          points.push([lat, lng > 180 ? lng - 360 : lng < -180 ? lng + 360 : lng]);
      }
      return points;
  }, [issPos]);

  const getCoords = (loc?: string): [number, number] => {
    if (loc?.toLowerCase().includes("mumbai")) return [19.0760, 72.8777];
    if (loc?.toLowerCase().includes("london")) return [51.5074, -0.1278];
    if (loc?.toLowerCase().includes("tokyo")) return [35.6762, 139.6503];
    if (loc?.toLowerCase().includes("paris")) return [48.8566, 2.3522];
    if (loc?.toLowerCase().includes("sydney")) return [-33.8688, 151.2093];
    if (loc?.toLowerCase().includes("new york")) return [40.7128, -74.0060];
    return [19.0760, 72.8777]; // Mumbai as default fallback
  };

  const centerCoords = useMemo(() => getCoords(location), [location]);

  // Helper to get mock coordinates for events
  const getEventCoords = (event: IntelligentEventProps): [number, number] => {
      const seed = event.id * 137;
      const lat = (seed % 120) - 60;
      const lng = ((seed * 7) % 360) - 180;
      return [lat, lng];
  };

  const getEventColor = (type: EventType) => {
      switch(type) {
          case 'rocket': return '#EF4444';
          case 'iss': return '#4CC9F0';
          case 'asteroid': return '#F97316';
          case 'eclipse': return '#A855F7';
          default: return '#4CC9F0';
      }
  };

  const getEventEmoji = (type: EventType) => {
      switch(type) {
          case 'rocket': return '🚀';
          case 'iss': return '🛰️';
          case 'asteroid': return '☄️';
          case 'eclipse': return '🌑';
          default: return '📍';
      }
  };

  return (
    <div 
        className={`w-full relative rounded-xl overflow-hidden border transition-all duration-700 min-h-[420px] max-h-screen border-[#4CC9F0]/30 shadow-[0_0_30px_rgba(76,201,240,0.2)] bg-[#0B1020]
            ${isFullscreen ? 'fixed inset-0 z-[1000] h-screen max-h-none rounded-none' : 'h-[500px]'}`}
        style={{ height: isFullscreen ? '100vh' : '500px' }}
    >
      
      {isLoading && (
          <div className="absolute inset-0 z-[2000] bg-[#0B1020]/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#4CC9F0]/30 border-t-[#4CC9F0] rounded-full animate-spin mb-4"></div>
              <p className="text-[#4CC9F0] font-['Orbitron'] text-xs tracking-widest animate-pulse">Initializing Global Feed...</p>
          </div>
      )}

      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={false}
        className="w-full h-full"
        style={{ height: '100%', width: '100%', background: '#0B1020' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />
        
        <ChangeView center={centerCoords} isFullscreen={isFullscreen} />

        {/* Visibility Radius around User Location */}
        <Circle 
            center={centerCoords} 
            radius={800000} 
            pathOptions={{
                color: '#4CC9F0',
                fillColor: '#4CC9F0',
                fillOpacity: radarActive ? 0.15 : 0.05,
                weight: 1,
                dashArray: '5, 10'
            }}
        />

        {/* Global ISS Ground Track */}
        {activeTypes.includes('iss') && (
          <>
            <Polyline 
                positions={issTrack} 
                pathOptions={{
                    color: '#4CC9F0',
                    weight: 1,
                    opacity: 0.3,
                    dashArray: '10, 20'
                }}
            />
            <Marker 
                position={issPos} 
                icon={getMapIcon('iss', '#4CC9F0', '🛰️', hoveredEventId === 1, false)}
                eventHandlers={{
                    click: () => {
                        const issEvent = events.find(e => e.type === 'iss');
                        if (issEvent) onEventSelect?.(issEvent);
                    }
                }}
            >
                <Popup className="custom-popup">
                    <div className="p-2 min-w-[120px]">
                        <div className="text-xs font-bold text-[#4CC9F0] mb-1">ISS Live Position</div>
                        <div className="text-[9px] text-gray-400 mb-2 italic">Real-time projection</div>
                        <div className="flex justify-between text-[10px] text-gray-400">
                            <span>Velocity:</span>
                            <span className="text-white">7.66 km/s</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400">
                            <span>Altitude:</span>
                            <span className="text-white">422 km</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 text-[9px] text-[#4CC9F0] flex items-center justify-between cursor-pointer hover:underline">
                            <span>View Mission Data</span>
                            <Globe className="w-2 h-2" />
                        </div>
                    </div>
                </Popup>
            </Marker>
          </>
        )}

        {/* Dynamic Event Markers (Filter out ISS to avoid duplicates) */}
        {events.filter(e => e.type !== 'iss').map(event => {
            const coords = getEventCoords(event);
            const isHovered = hoveredEventId === event.id;
            const eventColor = getEventColor(event.type);
            const dist = L.latLng(centerCoords[0], centerCoords[1]).distanceTo(L.latLng(coords[0], coords[1]));
            const isVisible = dist < 2500000;
            const opacity = radarActive && !isVisible ? 0.2 : 1.0;

            return (
                <React.Fragment key={event.id}>
                    {event.type === 'rocket' && (
                         <Polyline 
                            positions={[coords, [coords[0] + 5, coords[1] + 10]]}
                            pathOptions={{ color: eventColor, weight: 1, opacity: 0.3 * opacity, dashArray: '5, 5' }}
                         />
                    )}

                    {/* Event Visibility Radius */}
                    <Circle 
                        center={coords} 
                        radius={event.type === 'asteroid' ? 5000000 : 1500000} // Asteroids visible from further away
                        pathOptions={{
                            color: eventColor,
                            fillColor: eventColor,
                            fillOpacity: isHovered ? 0.15 : 0.05,
                            weight: 1,
                            dashArray: '5, 5'
                        }}
                    />

                    <Marker 
                        position={coords}
                        icon={getMapIcon(event.type, eventColor, getEventEmoji(event.type), isHovered, !!event.isInterested)}
                        opacity={opacity}
                        eventHandlers={{
                            click: () => onEventSelect?.(event)
                        }}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2 space-y-1">
                                <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: eventColor }}>
                                    {event.type} Visibility Node
                                </div>
                                <div className="text-xs font-bold text-white">{event.title}</div>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-2">
                                    <Clock className="w-3 h-3" />
                                    Scanning: {event.countdown}
                                </div>
                                <div className="text-[8px] text-[#4CC9F0]/60 mt-1 uppercase tracking-tighter">
                                    Global Awareness Synced
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                </React.Fragment>
            );
        })}

        {/* Scan Animation */}
        {radarActive && (
            <CircleMarker 
                center={centerCoords} 
                radius={20}
                pathOptions={{
                    color: '#4CC9F0',
                    weight: 2,
                    fillOpacity: 0.2,
                    fillColor: '#4CC9F0',
                    className: 'animate-ping'
                }}
            />
        )}
      </MapContainer>

      {/* Floating UI Layers */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-black/60 backdrop-blur-md border-[#4CC9F0]/30 text-white hover:bg-[#4CC9F0]/20 hidden md:flex h-9 w-9 p-0"
          >
              <Maximize2 className="w-4 h-4" />
          </Button>

          <Button 
            size="sm" 
            variant="outline" 
            onClick={onToggleRadar}
            className={`backdrop-blur-md border-[#4CC9F0]/30 transition-all h-9 px-3
                ${radarActive 
                    ? 'bg-[#4CC9F0] text-[#0B1020]' 
                    : 'bg-black/60 text-white hover:bg-[#4CC9F0]/20'
                }`}
          >
              <Radar className={`w-4 h-4 ${radarActive ? 'animate-spin-slow' : ''}`} />
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider hidden lg:inline">Visibility Scan</span>
          </Button>
      </div>

      <div className="absolute top-4 right-4 z-[1000] backdrop-blur-md rounded-full px-4 py-1.5 border border-[#4CC9F0]/30 text-[#E5E7EB] bg-black/60 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">
              {radarActive ? 'Calculating Visibility' : 'System Live'}
          </span>
      </div>

      {/* Mobile Expand */}
      {!isFullscreen && (
          <Button 
            className="md:hidden absolute bottom-6 right-6 z-[1000] rounded-full w-14 h-14 bg-[#4CC9F0] text-[#0B1020] shadow-[0_0_20px_rgba(76,201,240,0.6)] border-none"
            onClick={() => setIsFullscreen(true)}
          >
              <Maximize2 className="w-6 h-6" />
          </Button>
      )}
      
      {isFullscreen && (
          <Button 
            className="absolute top-6 right-6 z-[1001] rounded-full w-12 h-12 bg-black/60 backdrop-blur-md text-white border border-white/20"
            onClick={() => setIsFullscreen(false)}
          >
              <X className="w-6 h-6" />
          </Button>
      )}

      <style>{`
        .leaflet-container {
          background: #0B1020 !important;
        }
        .leaflet-tile-pane {
          filter: saturate(1.4) brightness(0.9);
        }
        .custom-map-marker {
          background: none !important;
          border: none !important;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        .custom-popup .leaflet-popup-content-wrapper {
            background: rgba(11, 16, 32, 0.95) !important;
            color: white !important;
            border: 1px solid rgba(76, 201, 240, 0.3);
            backdrop-filter: blur(8px);
            border-radius: 8px;
        }
        .custom-popup .leaflet-popup-tip {
            background: rgba(11, 16, 32, 0.95) !important;
        }
      `}</style>
    </div>
  );
}

function ChangeView({ center, isFullscreen }: { center: [number, number], isFullscreen?: boolean }) {
    const map = useMap();
    
    // Auto-center ONLY when coordinates explicitly change (e.g. city selection)
    useEffect(() => {
        if (center) {
            map.flyTo(center, isFullscreen ? 8 : 4, { duration: 1.5 });
        }
    }, [center, map, isFullscreen]); 

    // Handle resizing independently without forcing a re-center
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 500);
        return () => clearTimeout(timer);
    }, [isFullscreen, map]);

    return null;
}
