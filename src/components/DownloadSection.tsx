import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Star } from 'lucide-react';

const DownloadSection = () => {
  return (
    <section id="download" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Download InfoSnap
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Join millions of users who are already discovering the world around them. 
            Available on iOS and Android.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-3xl text-center animate-scale-in">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">4.9/5 Rating</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                <Download className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Download for iOS</div>
                  <div className="text-sm opacity-80">Available on App Store</div>
                </div>
              </Button>
              
              <Button variant="accent" size="lg" className="text-lg px-8 py-6 h-auto">
                <Smartphone className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Download for Android</div>
                  <div className="text-sm opacity-80">Get it on Google Play</div>
                </div>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">10M+</div>
                <div className="text-foreground/70">Downloads</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-glow">500K+</div>
                <div className="text-foreground/70">Daily Scans</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-foreground/70">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-foreground/60 mb-4">
            Ready to explore? Get started with InfoSnap today.
          </p>
          <Button variant="glass" size="lg">
            Try Web Version
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;