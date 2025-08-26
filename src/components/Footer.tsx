import React from 'react';
import infoSnapLogo from '@/assets/infosnap-logo.png';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img 
              src={infoSnapLogo} 
              alt="InfoSnap Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InfoSnap
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-smooth">
              Support
            </a>
          </div>
          
          <div className="text-foreground/60 text-sm">
            © 2024 InfoSnap. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;