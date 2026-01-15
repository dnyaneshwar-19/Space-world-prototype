import React from 'react';
import { Sun, Activity, Radio, AlertTriangle, Zap, Satellite, Power } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function CosmicWeatherPage() {
  const solarFlareData = [
    { time: '00:00', intensity: 2.1 },
    { time: '04:00', intensity: 2.3 },
    { time: '08:00', intensity: 3.5 },
    { time: '12:00', intensity: 4.2 },
    { time: '16:00', intensity: 5.8 },
    { time: '20:00', intensity: 4.1 },
    { time: '24:00', intensity: 3.2 },
  ];

  const radiationData = [
    { time: '00:00', level: 120 },
    { time: '04:00', level: 135 },
    { time: '08:00', level: 145 },
    { time: '12:00', level: 180 },
    { time: '16:00', level: 210 },
    { time: '20:00', level: 165 },
    { time: '24:00', level: 140 },
  ];

  const geomagneticData = [
    { time: '00:00', kp: 2 },
    { time: '04:00', kp: 3 },
    { time: '08:00', kp: 4 },
    { time: '12:00', kp: 5 },
    { time: '16:00', kp: 7 },
    { time: '20:00', kp: 6 },
    { time: '24:00', kp: 4 },
  ];

  const impactAreas = [
    { 
      icon: Satellite, 
      label: 'GPS Systems', 
      status: 'warning',
      description: 'Minor signal degradation possible'
    },
    { 
      icon: Power, 
      label: 'Power Grid', 
      status: 'normal',
      description: 'Operating normally'
    },
    { 
      icon: Radio, 
      label: 'Communications', 
      status: 'warning',
      description: 'HF radio propagation affected'
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#F97316]/20 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#F97316]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
              Cosmic Weather
            </h1>
          </div>
          <p className="text-xl text-[#9CA3AF]">
            Real-time monitoring of solar activity, radiation levels, and geomagnetic storms
          </p>
        </div>

        {/* Alert Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/10 rounded-xl p-6 border border-[#F97316]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">Solar Flare</span>
              <Activity className="w-5 h-5 text-[#F97316]" />
            </div>
            <div className="text-3xl font-bold text-[#F97316] mb-1 font-['JetBrains_Mono']">M5.8</div>
            <div className="text-xs text-[#FACC15]">Moderate Activity</div>
          </div>

          <div className="bg-gradient-to-br from-[#EF4444]/20 to-[#EF4444]/10 rounded-xl p-6 border border-[#EF4444]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">Radiation Level</span>
              <Zap className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div className="text-3xl font-bold text-[#EF4444] mb-1 font-['JetBrains_Mono']">S3</div>
            <div className="text-xs text-[#EF4444]">Strong Radiation</div>
          </div>

          <div className="bg-gradient-to-br from-[#FACC15]/20 to-[#FACC15]/10 rounded-xl p-6 border border-[#FACC15]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">Geomagnetic Storm</span>
              <Radio className="w-5 h-5 text-[#FACC15]" />
            </div>
            <div className="text-3xl font-bold text-[#FACC15] mb-1 font-['JetBrains_Mono']">G2</div>
            <div className="text-xs text-[#FACC15]">Moderate Storm</div>
          </div>
        </div>

        {/* High-Risk Alert Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#EF4444]/10 to-[#F97316]/10 border-2 border-[#EF4444] rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#EF4444] opacity-5 animate-pulse"></div>
          <div className="relative flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-[#EF4444] flex-shrink-0 mt-1 animate-pulse" />
            <div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">High-Risk Alert: Solar Storm Warning</h3>
              <p className="text-[#9CA3AF] mb-3">
                A coronal mass ejection (CME) was detected and is expected to reach Earth in approximately 36 hours. 
                Satellite operators and power grid managers should take precautionary measures.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#EF4444]/20 border border-[#EF4444]/30 rounded-full text-xs text-[#EF4444]">
                  Impact: High
                </span>
                <span className="px-3 py-1 bg-[#FACC15]/20 border border-[#FACC15]/30 rounded-full text-xs text-[#FACC15]">
                  ETA: 36 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Solar Flare Activity */}
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-xl font-bold text-[#E5E7EB] font-['Orbitron']">
                Solar Flare Activity
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={solarFlareData}>
                <defs>
                  <linearGradient id="flareGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4CC9F0" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F1A2E', 
                    border: '1px solid #4CC9F0',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  fill="url(#flareGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-[#9CA3AF] mt-4">M-Class flare intensity over 24 hours</p>
          </div>

          {/* Radiation Levels */}
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-[#EF4444]" />
              <h3 className="text-xl font-bold text-[#E5E7EB] font-['Orbitron']">
                Radiation Levels
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={radiationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4CC9F0" opacity={0.1} />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F1A2E', 
                    border: '1px solid #4CC9F0',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-[#9CA3AF] mt-4">Particle flux (pfu) measurements</p>
          </div>
        </div>

        {/* Geomagnetic Index */}
        <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Radio className="w-5 h-5 text-[#FACC15]" />
            <h3 className="text-xl font-bold text-[#E5E7EB] font-['Orbitron']">
              Geomagnetic Index (KP Index)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geomagneticData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4CC9F0" opacity={0.1} />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 9]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F1A2E', 
                  border: '1px solid #4CC9F0',
                  borderRadius: '8px',
                  color: '#E5E7EB'
                }} 
              />
              <Bar dataKey="kp" fill="#FACC15" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-[#9CA3AF] mt-4">KP Index: 0 (quiet) to 9 (extreme storm)</p>
        </div>

        {/* Earth Impact */}
        <div>
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
            Earth Impact Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              const statusColors = {
                normal: { bg: '#22C55E', border: '#22C55E', text: '#22C55E' },
                warning: { bg: '#FACC15', border: '#FACC15', text: '#FACC15' },
                critical: { bg: '#EF4444', border: '#EF4444', text: '#EF4444' },
              };
              const colors = statusColors[area.status as keyof typeof statusColors];

              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${colors.bg}20`, border: `1px solid ${colors.border}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: colors.text }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">{area.label}</h4>
                      <p className="text-sm text-[#9CA3AF] mb-3">{area.description}</p>
                      <div 
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${colors.bg}20`,
                          border: `1px solid ${colors.border}30`,
                          color: colors.text
                        }}
                      >
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.bg }}></div>
                        {area.status === 'normal' ? 'Normal' : area.status === 'warning' ? 'Warning' : 'Critical'}
                      </div>
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
}
