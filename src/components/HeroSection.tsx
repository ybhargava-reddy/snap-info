import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Scan, Smartphone } from 'lucide-react';
import heroImage from '@/assets/hero-scanning.jpg';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="glass p-4 rounded-full">
          <Camera className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="glass p-4 rounded-full">
          <Scan className="w-8 h-8 text-accent" />
        </div>
      </div>
      
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass p-4 rounded-full">
          <Smartphone className="w-8 h-8 text-primary-glow" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Scan. Discover.
            </span>
            <br />
            <span className="text-foreground">
              Learn Everything.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Point your camera at any object or place and instantly get detailed information, 
            history, and insights powered by advanced AI recognition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Download InfoSnap
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 pt-8 text-foreground/60">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span>Real-time Recognition</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary-glow rounded-full animate-pulse"></span>
              <span>Instant Information</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span>Offline Capable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;