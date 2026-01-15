import React, { useState } from 'react';
import { Database, Download, Radio, Eye, EyeOff, Wifi, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export function RealWorldDataPage() {
  const [dataView, setDataView] = useState<'raw' | 'simplified'>('simplified');

  const liveFeeds = [
    {
      id: 1,
      name: 'GOES-16 Weather Satellite',
      type: 'Weather',
      status: 'Active',
      lastUpdate: '2 minutes ago',
      dataPoints: '45,234',
    },
    {
      id: 2,
      name: 'Landsat 8 Earth Observation',
      type: 'Earth Imagery',
      status: 'Active',
      lastUpdate: '5 minutes ago',
      dataPoints: '28,901',
    },
    {
      id: 3,
      name: 'ISS Position Tracker',
      type: 'Position Data',
      status: 'Active',
      lastUpdate: '1 minute ago',
      dataPoints: '12,456',
    },
    {
      id: 4,
      name: 'NOAA Solar Wind Monitor',
      type: 'Space Weather',
      status: 'Active',
      lastUpdate: '3 minutes ago',
      dataPoints: '67,890',
    },
  ];

  const dashboards = [
    {
      id: 1,
      title: 'Global Temperature Map',
      description: 'Real-time surface temperature data from multiple satellites',
      type: 'Temperature',
      icon: '🌡️',
    },
    {
      id: 2,
      title: 'Ocean Currents Visualization',
      description: 'Live tracking of global ocean circulation patterns',
      type: 'Oceanography',
      icon: '🌊',
    },
    {
      id: 3,
      title: 'Vegetation Health Index',
      description: 'NDVI data showing plant health and agricultural insights',
      type: 'Agriculture',
      icon: '🌱',
    },
    {
      id: 4,
      title: 'Air Quality Monitor',
      description: 'Atmospheric composition and pollution levels worldwide',
      type: 'Environment',
      icon: '💨',
    },
  ];

  const sampleRawData = `{
  "satellite": "GOES-16",
  "timestamp": "2026-01-12T15:30:00Z",
  "data": {
    "temperature": 288.15,
    "humidity": 0.65,
    "pressure": 101325,
    "coordinates": {
      "lat": 40.7128,
      "lon": -74.0060
    },
    "readings": [
      { "ch": 1, "rad": 12.45, "temp": 285.3 },
      { "ch": 2, "rad": 18.92, "temp": 288.1 },
      { "ch": 3, "rad": 24.67, "temp": 291.5 }
    ]
  }
}`;

  const sampleSimplifiedData = `New York City Weather
Updated: January 12, 2026 at 3:30 PM UTC

Temperature: 15.0°C (59°F)
Humidity: 65%
Pressure: 1013.25 hPa
Location: 40.71°N, 74.01°W

Conditions: Partly Cloudy
Satellite: GOES-16`;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-[#4CC9F0]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
              Real World Data
            </h1>
          </div>
          <p className="text-xl text-[#9CA3AF]">
            Access live satellite feeds, raw data streams, and interactive Earth dashboards
          </p>
        </div>

        {/* API Integration Notice */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#4CC9F0]/10 to-[#38BDF8]/10 border border-[#4CC9F0]/30 rounded-xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#4CC9F0] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-[#E5E7EB] mb-1">API Access Available</h3>
              <p className="text-[#9CA3AF] mb-3">
                Integrate real-time satellite data into your own applications using our RESTful API. 
                Access data from NASA, NOAA, ESA, and ISRO sources.
              </p>
              <Button 
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                View API Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Live Satellite Feeds */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
            📡 Live Satellite Feeds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveFeeds.map(feed => (
              <div 
                key={feed.id}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#22C55E]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
                    <span className="text-xs text-[#22C55E]">{feed.status}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">
                  {feed.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Type:</span>
                    <span className="text-[#E5E7EB]">{feed.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Updated:</span>
                    <span className="text-[#E5E7EB]">{feed.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Data Points:</span>
                    <span className="text-[#4CC9F0] font-['JetBrains_Mono']">{feed.dataPoints}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/20"
                  variant="outline"
                >
                  View Stream
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Raw vs Simplified Data Toggle */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#E5E7EB] font-['Orbitron']">
              🔬 Data Preview
            </h2>
            <div className="flex items-center gap-3 bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-lg p-3 border border-[#4CC9F0]/20">
              <span className={`text-sm font-medium ${dataView === 'simplified' ? 'text-[#E5E7EB]' : 'text-[#6B7280]'}`}>
                Simplified
              </span>
              <Switch 
                checked={dataView === 'raw'}
                onCheckedChange={(checked) => setDataView(checked ? 'raw' : 'simplified')}
              />
              <span className={`text-sm font-medium ${dataView === 'raw' ? 'text-[#E5E7EB]' : 'text-[#6B7280]'}`}>
                Raw Data
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {dataView === 'raw' ? (
                  <Eye className="w-5 h-5 text-[#4CC9F0]" />
                ) : (
                  <EyeOff className="w-5 h-5 text-[#4CC9F0]" />
                )}
                <span className="text-sm font-semibold text-[#E5E7EB]">
                  {dataView === 'raw' ? 'Raw JSON Data' : 'Human-Readable Format'}
                </span>
              </div>
              <Button 
                size="sm"
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <pre className="bg-[#0B1020] rounded-lg p-6 overflow-x-auto border border-[#4CC9F0]/10">
              <code className="text-sm text-[#E5E7EB] font-['JetBrains_Mono']">
                {dataView === 'raw' ? sampleRawData : sampleSimplifiedData}
              </code>
            </pre>
          </div>
        </div>

        {/* Earth Dashboards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
            🌍 Interactive Earth Dashboards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboards.map(dashboard => (
              <div 
                key={dashboard.id}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl overflow-hidden border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all group"
              >
                {/* Preview Area */}
                <div className="relative h-48 bg-[#0B1020] flex items-center justify-center overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform">
                    {dashboard.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#4CC9F0]/20 backdrop-blur-sm rounded-full border border-[#4CC9F0]/30">
                    <span className="text-xs font-semibold text-[#4CC9F0]">{dashboard.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">
                    {dashboard.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mb-4">
                    {dashboard.description}
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020]"
                  >
                    Open Dashboard
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Download Options */}
        <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#4CC9F0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-[#4CC9F0]" />
            </div>
            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">
              Download Historical Data
            </h2>
            <p className="text-[#9CA3AF] mb-6">
              Access archived satellite data for research, analysis, and educational purposes. 
              Available formats: CSV, JSON, GeoTIFF, NetCDF
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020]">
                <Download className="w-4 h-4 mr-2" />
                Download Data Package
              </Button>
              <Button 
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                Request Custom Dataset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
