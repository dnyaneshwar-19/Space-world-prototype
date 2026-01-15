import React, { useState } from 'react';
import { Mail, Send, Users, MessageSquare, Github, Twitter, Linkedin, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Footer } from '../Footer';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'General inquiries and support',
      value: 'hello@spaceworld.io',
      color: '#4CC9F0',
    },
    {
      icon: Users,
      title: 'Partnerships',
      description: 'Collaborate with us',
      value: 'partners@spaceworld.io',
      color: '#38BDF8',
    },
    {
      icon: MessageSquare,
      title: 'Feedback',
      description: 'Share your thoughts',
      value: 'feedback@spaceworld.io',
      color: '#22C55E',
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', url: '#', color: '#38BDF8' },
    { icon: Github, label: 'GitHub', url: '#', color: '#E5E7EB' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: '#4CC9F0' },
    { icon: Globe, label: 'Website', url: '#', color: '#22C55E' },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#4CC9F0]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#E5E7EB] font-['Orbitron']">
              Contact Us
            </h1>
          </div>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Have questions, feedback, or collaboration ideas? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-all text-center group"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${method.color}20`, border: `1px solid ${method.color}30` }}
                >
                  <Icon className="w-7 h-7" style={{ color: method.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 font-['Orbitron']">
                  {method.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] mb-3">
                  {method.description}
                </p>
                <a 
                  href={`mailto:${method.value}`}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: method.color }}
                >
                  {method.value}
                </a>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
            <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#0B1020]/60 border-[#4CC9F0]/20 focus:border-[#4CC9F0] text-[#E5E7EB] placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0B1020]/60 border-[#4CC9F0]/20 focus:border-[#4CC9F0] text-[#E5E7EB] placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-[#0B1020]/60 border-[#4CC9F0]/20 focus:border-[#4CC9F0] text-[#E5E7EB] placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us more..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-[#0B1020]/60 border-[#4CC9F0]/20 focus:border-[#4CC9F0] text-[#E5E7EB] placeholder:text-[#6B7280] resize-none"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] text-[#0B1020] font-semibold"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6 font-['Orbitron']">
                Connect With Us
              </h2>
              <p className="text-[#9CA3AF] mb-6">
                Follow us on social media for the latest space events, updates, and cosmic discoveries!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center gap-3 p-4 bg-[#0B1020]/50 rounded-lg border border-[#4CC9F0]/10 hover:border-[#4CC9F0]/30 transition-all group"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${social.color}20`, border: `1px solid ${social.color}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: social.color }} />
                      </div>
                      <span className="text-[#E5E7EB] font-medium">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Collaboration */}
            <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#22C55E]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#22C55E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 font-['Orbitron']">
                    Collaboration Opportunities
                  </h3>
                  <p className="text-[#9CA3AF] mb-4">
                    We're always looking for partnerships with educational institutions, 
                    space agencies, research organizations, and technology companies.
                  </p>
                  <ul className="space-y-2 text-sm text-[#9CA3AF]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">•</span>
                      <span>Educational program partnerships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">•</span>
                      <span>Data sharing agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">•</span>
                      <span>Research collaborations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#22C55E] mt-1">•</span>
                      <span>Technology integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Note */}
            <div className="bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl p-8 border border-[#4CC9F0]/20">
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 font-['Orbitron']">
                Need Quick Answers?
              </h3>
              <p className="text-[#9CA3AF] mb-4">
                Check out our FAQ section or browse our documentation for instant answers 
                to common questions about SpaceWorld features and data sources.
              </p>
              <Button 
                variant="outline"
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center p-6 bg-gradient-to-br from-[#0F1A2E] to-[#1A1336] rounded-xl border border-[#4CC9F0]/20">
          <p className="text-sm text-[#9CA3AF]">
            <strong className="text-[#E5E7EB]">Data Sources & Legal:</strong> SpaceWorld aggregates 
            publicly available data from NASA, NOAA, ESA, ISRO, and other space agencies. 
            For legal inquiries, data licensing, or terms of service, please contact us at{' '}
            <a href="mailto:legal@spaceworld.io" className="text-[#4CC9F0] hover:underline">
              legal@spaceworld.io
            </a>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}