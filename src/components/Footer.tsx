import React from 'react';
import { Rocket, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Space Events', href: '#' },
      { label: 'Interactive Learning', href: '#' },
      { label: 'Cosmic Weather', href: '#' },
      { label: 'Real World Data', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    resources: [
      { label: 'API Documentation', href: '#' },
      { label: 'Data Sources', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Data Ethics', href: '#' },
      { label: 'Licenses', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="mt-24 border-t border-[#4CC9F0]/20 bg-gradient-to-b from-transparent to-[#0F1A2E]/50">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Rocket className="w-6 h-6 text-[#4CC9F0]" />
                <div className="absolute inset-0 bg-[#4CC9F0] opacity-50 blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4CC9F0] to-[#38BDF8] bg-clip-text text-transparent font-['Orbitron']">
                SpaceWorld
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] mb-4">
              Explore space. Understand Earth. Real-time cosmic data for everyone.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 bg-[#0F1A2E] rounded-lg flex items-center justify-center border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/50 transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-[#9CA3AF] hover:text-[#4CC9F0]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-[#9CA3AF] hover:text-[#4CC9F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-[#9CA3AF] hover:text-[#4CC9F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-[#9CA3AF] hover:text-[#4CC9F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#E5E7EB] mb-4 font-['Orbitron']">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-[#9CA3AF] hover:text-[#4CC9F0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data Sources Attribution */}
        <div className="border-t border-[#4CC9F0]/10 pt-8 mb-8">
          <h4 className="text-sm font-bold text-[#E5E7EB] mb-3">Powered By</h4>
          <div className="flex flex-wrap gap-4 text-xs text-[#6B7280]">
            <span>NASA</span>
            <span>•</span>
            <span>NOAA</span>
            <span>•</span>
            <span>ESA</span>
            <span>•</span>
            <span>ISRO</span>
            <span>•</span>
            <span>JAXA</span>
            <span>•</span>
            <span>SpaceX</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4CC9F0]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            © {currentYear} SpaceWorld. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280] text-center md:text-right">
            Made with ❤️ for space enthusiasts, students, and researchers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
