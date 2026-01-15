import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface EventCardProps {
  title: string;
  icon: string;
  image: string;
  date: string;
  time: string;
  location: string;
  description: string;
  onViewDetails: () => void;
}

export function EventCard({ 
  title, 
  icon, 
  image, 
  date, 
  time, 
  location, 
  description,
  onViewDetails 
}: EventCardProps) {
  return (
    <div className="group relative flex-shrink-0 w-80 bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl overflow-hidden border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/50 transition-all duration-300 hover:scale-105 glow-border">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-transparent to-transparent"></div>
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-[#4CC9F0]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#4CC9F0]/30 text-2xl">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 font-['Orbitron']">
          {title}
        </h3>
        
        <p className="text-sm text-[#9CA3AF] mb-4 line-clamp-2">
          {description}
        </p>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[#4CC9F0]" />
            <span className="text-[#E5E7EB]">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#4CC9F0]" />
            <span className="text-[#E5E7EB]">{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-[#4CC9F0]" />
            <span className="text-[#E5E7EB]">{location}</span>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#4CC9F0] text-[#0B1020] font-semibold"
        >
          View Details
        </Button>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4CC9F0]/10 to-[#38BDF8]/10"></div>
      </div>
    </div>
  );
}
