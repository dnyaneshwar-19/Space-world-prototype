import React from 'react';
import { Info, Target, Users, Shield, CheckCircle, Sparkles } from 'lucide-react';
import { Footer } from '../Footer';

export function AboutPage() {
  const teamMembers = [
    { name: 'Dr. Sarah Chen', role: 'Chief Scientist', emoji: '👩‍🔬' },
    { name: 'Alex Rodriguez', role: 'Lead Developer', emoji: '👨‍💻' },
    { name: 'Maya Patel', role: 'Data Analyst', emoji: '👩‍💼' },
    { name: 'James Wilson', role: 'UX Designer', emoji: '👨‍🎨' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize access to space data and make complex cosmic phenomena understandable for everyone.',
    },
    {
      icon: Sparkles,
      title: 'Our Vision',
      description: 'A world where anyone can explore, understand, and benefit from space science and satellite technology.',
    },
    {
      icon: Shield,
      title: 'Data Ethics',
      description: 'We prioritize transparency, accuracy, and responsible use of space data from trusted global sources.',
    },
  ];

  const dataSources = [
    { name: 'NASA', description: 'National Aeronautics and Space Administration', icon: '🛸' },
    { name: 'NOAA', description: 'National Oceanic and Atmospheric Administration', icon: '🌊' },
    { name: 'ESA', description: 'European Space Agency', icon: '🚀' },
    { name: 'ISRO', description: 'Indian Space Research Organisation', icon: '🛰️' },
    { name: 'JAXA', description: 'Japan Aerospace Exploration Agency', icon: '🌏' },
    { name: 'SpaceX', description: 'Commercial space launch provider', icon: '⚡' },
  ];

  const features = [
    'Real-time satellite tracking and event notifications',
    'Interactive learning modules for all age groups',
    'Live cosmic weather monitoring and alerts',
    'Historical space mission timeline and archives',
    'Geospatial visibility analysis tools',
    'API access for developers and researchers',
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
              <Info className="w-6 h-6 text-[#4CC9F0]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
              About SpaceWorld
            </h1>
          </div>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Bridging the gap between complex space science and everyday understanding through 
            innovative technology and interactive learning experiences.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all text-center"
              >
                <div className="w-16 h-16 bg-[#4CC9F0]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-[#4CC9F0]" />
                </div>
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">
                  {value.title}
                </h3>
                <p className="text-[#9CA3AF]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Why SpaceWorld Exists */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-8 text-center font-['Orbitron']">
            Why SpaceWorld Exists
          </h2>
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">The Challenge</h3>
                <p className="text-[#9CA3AF] mb-4">
                  Space data has traditionally been complex, scattered across multiple agencies, 
                  and difficult for the general public to access and understand. Students, educators, 
                  and curious minds faced high barriers to entry.
                </p>
                <p className="text-[#9CA3AF]">
                  Critical events like solar storms, satellite passes, and celestial phenomena 
                  were often missed due to lack of accessible notification systems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">Our Solution</h3>
                <p className="text-[#9CA3AF] mb-4">
                  SpaceWorld aggregates data from the world's leading space agencies into a single, 
                  beautiful, and intuitive platform. We transform raw satellite data into visual 
                  insights that anyone can understand.
                </p>
                <p className="text-[#9CA3AF]">
                  Through gamification, interactive learning, and real-time alerts, we make space 
                  science engaging, accessible, and relevant to everyday life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-8 text-center font-['Orbitron']">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-lg p-4 border border-[#4CC9F0]/20"
              >
                <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span className="text-[#E5E7EB]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-8 text-center font-['Orbitron']">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {member.emoji}
                </div>
                <h3 className="text-lg font-bold text-[#E5E7EB] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#9CA3AF]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Data Sources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-8 text-center font-['Orbitron']">
            Trusted Data Sources
          </h2>
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
            <p className="text-center text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              We partner with the world's most respected space agencies to bring you accurate, 
              real-time data you can trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources.map((source, index) => (
                <div 
                  key={index}
                  className="bg-[#0B1020]/50 rounded-lg p-6 border border-[#4CC9F0]/10 hover:border-[#4CC9F0]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{source.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-[#E5E7EB] mb-1">
                        {source.name}
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">
                        {source.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Ethics & Privacy */}
        <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#4CC9F0]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-[#4CC9F0]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">
                Our Commitment to Data Ethics
              </h2>
              <div className="space-y-3 text-[#9CA3AF]">
                <p>
                  <strong className="text-[#E5E7EB]">Transparency:</strong> All data sources are 
                  clearly attributed, and we maintain complete transparency about data collection 
                  and processing methods.
                </p>
                <p>
                  <strong className="text-[#E5E7EB]">Accuracy:</strong> We implement rigorous 
                  quality checks and validation processes to ensure the data you receive is 
                  accurate and up-to-date.
                </p>
                <p>
                  <strong className="text-[#E5E7EB]">Privacy:</strong> We respect user privacy 
                  and do not collect personally identifiable information without explicit consent. 
                  All data handling complies with international privacy standards.
                </p>
                <p>
                  <strong className="text-[#E5E7EB]">Open Access:</strong> We believe space data 
                  should be accessible to everyone. Our platform is designed to be inclusive and 
                  available to students, researchers, and the general public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}