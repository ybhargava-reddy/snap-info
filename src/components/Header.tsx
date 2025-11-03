import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import infoSnapLogo from '@/assets/infosnap-logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={infoSnapLogo} 
            alt="InfoSnap Logo" 
            className="w-10 h-10 animate-scale-in"
          />
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            InfoSnap
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-foreground/80 hover:text-foreground transition-smooth">
            Features
          </a>
          <a href="/#how-it-works" className="text-foreground/80 hover:text-foreground transition-smooth">
            How It Works
          </a>
          <Link to="/scanner" className="text-foreground/80 hover:text-foreground transition-smooth">
            Web Scanner
          </Link>
          <a href="/#download" className="text-foreground/80 hover:text-foreground transition-smooth">
            Download
          </a>
        </nav>

        <Button variant="hero" size="sm" className="hidden md:inline-flex">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;