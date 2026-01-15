import React from 'react';
import { User, Mail, Calendar, Award, Clock } from 'lucide-react';
import { EventCard } from '../EventCard';

export function UserProfilePage() {
  // Mock user data
  const user = {
    name: "Alex Cosmos",
    dob: "October 4, 1995",
    email: "alex.cosmos@spaceworld.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    stats: {
      modulesCompleted: 12,
      totalTime: "34h 20m",
      rank: "Orbital Explorer"
    }
  };

  const learningProgress = [
    { module: "Rocket Propulsion", progress: 100 },
    { module: "Orbital Mechanics", progress: 75 },
    { module: "Exoplanets", progress: 40 },
    { module: "Black Holes", progress: 10 },
  ];

  const recentHistory = [
    {
      id: 1,
      title: 'Rocket Launch',
      icon: '🚀',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXx8fHwxNzY4MjIxMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Visited Jan 12, 2026',
      time: '14:30 UTC',
      location: 'Cape Canaveral, Florida',
      description: 'SpaceX Falcon 9 launching Starlink satellites to low Earth orbit'
    },
     {
      id: 2,
      title: 'Asteroids',
      icon: '☄️',
      image: 'https://images.unsplash.com/photo-1707058666066-e0639a65ac4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZCUyMHNwYWNlfGVufDF8fHx8MTc2ODIzOTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Visited Jan 10, 2026',
      time: '22:00 UTC',
      location: 'Global Visibility',
      description: 'Asteroid 2024 XY5 makes close approach at 0.05 AU from Earth'
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Profile Header */}
      <div className="bg-[#0F1A2E]/60 backdrop-blur-lg border border-[#4CC9F0]/20 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#4CC9F0] shadow-[0_0_20px_rgba(76,201,240,0.3)]">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-xs text-white font-medium">Change Photo</span>
            </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">{user.name}</h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#9CA3AF] justify-center md:justify-start">
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4CC9F0]" />
                <span>Born: {user.dob}</span>
             </div>
             <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4CC9F0]" />
                <span>{user.email}</span>
             </div>
             <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#4CC9F0]" />
                <span>Rank: <span className="text-[#E5E7EB] font-medium">{user.stats.rank}</span></span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orbital Lab Insights */}
        <div className="lg:col-span-1">
           <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron'] flex items-center gap-2">
             <Award className="w-6 h-6 text-[#4CC9F0]" />
             Orbital Lab Insights
           </h2>
           <div className="bg-[#0F1A2E]/60 backdrop-blur-lg border border-[#4CC9F0]/20 rounded-xl p-6 space-y-6">
                {learningProgress.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-[#E5E7EB]">{item.module}</span>
                            <span className="text-sm text-[#4CC9F0]">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-[#1A1336] rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] rounded-full"
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
                
                <div className="pt-4 border-t border-[#4CC9F0]/10 flex justify-between items-center text-sm">
                    <span className="text-[#9CA3AF]">Total Learning Time</span>
                    <span className="text-[#E5E7EB] flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#4CC9F0]" />
                        {user.stats.totalTime}
                    </span>
                </div>
           </div>
        </div>

        {/* Event History */}
        <div className="lg:col-span-2">
             <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron'] flex items-center gap-2">
                 <Clock className="w-6 h-6 text-[#4CC9F0]" />
                 History
             </h2>
             
             <div className="space-y-4">
                 {recentHistory.map((event) => (
                     <div key={event.id} className="group relative">
                        {/* Reuse EventCard but maybe simpler? Or just use same card */}
                         <div className="bg-[#0F1A2E]/60 backdrop-blur-lg border border-[#4CC9F0]/20 rounded-xl overflow-hidden hover:border-[#4CC9F0]/50 transition-all flex flex-col md:flex-row">
                             <div className="md:w-48 h-32 md:h-auto">
                                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                             </div>
                             <div className="p-4 flex-1">
                                 <div className="flex justify-between items-start mb-2">
                                     <div>
                                        <div className="text-2xl mb-1">{event.icon}</div>
                                        <h3 className="font-bold text-[#E5E7EB] group-hover:text-[#4CC9F0] transition-colors">{event.title}</h3>
                                     </div>
                                     <span className="text-xs text-[#9CA3AF] bg-[#4CC9F0]/10 px-2 py-1 rounded">{event.date}</span>
                                 </div>
                                 <p className="text-sm text-[#9CA3AF] line-clamp-2">{event.description}</p>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </div>
  );
}
