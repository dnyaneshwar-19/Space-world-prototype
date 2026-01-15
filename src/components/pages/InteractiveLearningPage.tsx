import React, { useState } from 'react';
import { GraduationCap, Eye, Satellite as SatelliteIcon, Lock, Unlock, ArrowRight, Award, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function InteractiveLearningPage() {
  const [viewModes, setViewModes] = useState<{ [key: string]: 'human' | 'satellite' }>({
    clouds: 'human',
    terrain: 'human',
    weather: 'human',
    disasters: 'human',
  });

  const [unlockedSecrets, setUnlockedSecrets] = useState<number[]>([]);
  const [xp, setXp] = useState(350);
  const maxXp = 1000;

  const learningCards = [
    {
      id: 'clouds',
      title: 'Clouds',
      humanImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZHMlMjBza3l8ZW58MXx8fHwxNzY4MjM5NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      satelliteImage: 'https://images.unsplash.com/photo-1597120081843-631bddc57076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBvcmJpdHxlbnwxfHx8fDE3NjgyMzk1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'See how satellites detect cloud patterns and predict weather systems',
    },
    {
      id: 'terrain',
      title: 'Mountains, Forests, Oceans',
      humanImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbnMlMjBmb3Jlc3R8ZW58MXx8fHwxNzY4MjM5NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      satelliteImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlfGVufDF8fHx8MTc2ODE1NjQwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Discover how satellite imagery reveals terrain features and ecosystems',
    },
    {
      id: 'weather',
      title: 'Rain, Snowfall, Fog',
      humanImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwd2VhdGhlcnxlbnwxfHx8fDE3NjgyMzk3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      satelliteImage: 'https://images.unsplash.com/photo-1597120081843-631bddc57076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBvcmJpdHxlbnwxfHx8fDE3NjgyMzk1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Learn how satellites track precipitation and atmospheric conditions',
    },
    {
      id: 'disasters',
      title: 'Disasters',
      humanImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzY4MjM5NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      satelliteImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNwYWNlfGVufDF8fHx8MTc2ODE1NjQwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Understand how satellites help predict and monitor natural disasters',
    },
  ];

  const dataJourneySteps = [
    {
      number: 1,
      title: 'Data Collected in Space',
      description: 'Satellites capture electromagnetic radiation, temperature, and other measurements',
      icon: '🛰️',
    },
    {
      number: 2,
      title: 'Signal Sent to Earth',
      description: 'Data transmitted via radio waves to ground stations worldwide',
      icon: '📡',
    },
    {
      number: 3,
      title: 'Ground Station Processing',
      description: 'Advanced algorithms process raw data into actionable insights',
      icon: '💻',
    },
    {
      number: 4,
      title: 'Real-World Impact',
      description: 'Information used for weather forecasts, disaster alerts, and environmental monitoring',
      icon: '🌍',
    },
  ];

  const scientistSecrets = [
    {
      id: 1,
      title: 'How Satellites Predict Disasters',
      description: 'Discover the technology behind early warning systems that save lives',
      locked: !unlockedSecrets.includes(1),
    },
    {
      id: 2,
      title: 'Why Weather Satellites Never Sleep',
      description: 'Learn about the 24/7 orbital patterns that keep Earth monitored',
      locked: !unlockedSecrets.includes(2),
    },
    {
      id: 3,
      title: 'One Satellite, Whole Earth',
      description: 'Understand how a single satellite can monitor an entire hemisphere',
      locked: !unlockedSecrets.includes(3),
    },
    {
      id: 4,
      title: "Why Satellites Don't Fall",
      description: 'Explore the physics of orbital mechanics and gravitational balance',
      locked: !unlockedSecrets.includes(4),
    },
  ];

  const toggleViewMode = (cardId: string) => {
    setViewModes(prev => ({
      ...prev,
      [cardId]: prev[cardId] === 'human' ? 'satellite' : 'human'
    }));
  };

  const unlockSecret = (secretId: number) => {
    if (!unlockedSecrets.includes(secretId)) {
      setUnlockedSecrets(prev => [...prev, secretId]);
      setXp(prev => Math.min(prev + 50, maxXp));
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#4CC9F0]" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
                Interactive Learning
              </h1>
            </div>

            {/* XP Progress */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-lg p-4 border border-[#4CC9F0]/20">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-[#FACC15]" />
                  <span className="text-sm text-[#9CA3AF]">Your Progress</span>
                </div>
                <Progress value={(xp / maxXp) * 100} className="h-2 mb-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6B7280]">{xp} / {maxXp} XP</span>
                  <span className="text-xs text-[#4CC9F0] font-semibold">Level 3</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-[#9CA3AF]">
            Learn how satellites transform our view of Earth through interactive comparisons and gamified challenges
          </p>
        </div>

        {/* Human View vs Satellite View */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
            👁️ Human View vs Satellite View
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningCards.map(card => (
              <div 
                key={card.id}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl overflow-hidden border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/50 transition-all glow-border"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={viewModes[card.id] === 'human' ? card.humanImage : card.satelliteImage}
                    alt={card.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E] via-transparent to-transparent"></div>
                  
                  {/* View Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#4CC9F0]/20 backdrop-blur-sm rounded-full border border-[#4CC9F0]/30 flex items-center gap-2">
                    {viewModes[card.id] === 'human' ? (
                      <>
                        <Eye className="w-3 h-3 text-[#4CC9F0]" />
                        <span className="text-xs font-semibold text-[#4CC9F0]">Human</span>
                      </>
                    ) : (
                      <>
                        <SatelliteIcon className="w-3 h-3 text-[#38BDF8]" />
                        <span className="text-xs font-semibold text-[#38BDF8]">Satellite</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mb-4">
                    {card.description}
                  </p>
                  <Button
                    onClick={() => toggleViewMode(card.id)}
                    className="w-full bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020] text-sm"
                  >
                    Switch to {viewModes[card.id] === 'human' ? 'Satellite' : 'Human'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Journey */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
            📡 Satellite → Earth Data Journey
          </h2>
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataJourneySteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className="bg-[#0B1020]/50 rounded-lg p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all h-full">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4CC9F0] to-[#38BDF8] rounded-full flex items-center justify-center mb-4 text-xl font-bold text-[#0B1020]">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-3">{step.icon}</div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF]">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index < dataJourneySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-[#4CC9F0]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scientist Secrets */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#E5E7EB] font-['Orbitron']">
              🔐 Scientist Secrets
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Zap className="w-4 h-4 text-[#FACC15]" />
              <span>Unlock: 50 XP each</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scientistSecrets.map(secret => (
              <div 
                key={secret.id}
                className={`bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border transition-all ${
                  secret.locked 
                    ? 'border-[#6B7280]/20 opacity-75' 
                    : 'border-[#4CC9F0]/20 glow-border'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    secret.locked 
                      ? 'bg-[#6B7280]/20' 
                      : 'bg-[#22C55E]/20 border border-[#22C55E]/30'
                  }`}>
                    {secret.locked ? (
                      <Lock className="w-6 h-6 text-[#6B7280]" />
                    ) : (
                      <Unlock className="w-6 h-6 text-[#22C55E]" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      secret.locked ? 'text-[#6B7280]' : 'text-[#E5E7EB]'
                    }`}>
                      {secret.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mb-4">
                      {secret.description}
                    </p>
                    
                    {secret.locked ? (
                      <Button
                        onClick={() => unlockSecret(secret.id)}
                        className="bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020]"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Reveal Secret
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-[#22C55E]">
                        <Unlock className="w-4 h-4" />
                        <span>Unlocked! +50 XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz & Challenges */}
        <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#FACC15]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#FACC15]" />
            </div>
            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">
              Test Your Knowledge
            </h2>
            <p className="text-[#9CA3AF] mb-6">
              Take interactive quizzes, complete drag-and-drop satellite matching challenges, and solve scenario-based problems to earn XP and badges!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020]">
                Start Visual Quiz
              </Button>
              <Button 
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                Satellite Match Game
              </Button>
              <Button 
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                Scenario Challenges
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
