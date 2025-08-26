import React from 'react';
import { Camera, MapPin, BookOpen, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Object Recognition',
    description: 'Advanced AI instantly identifies objects, products, landmarks, and more with incredible accuracy.',
    color: 'text-primary-glow'
  },
  {
    icon: MapPin,
    title: 'Location Insights',
    description: 'Get detailed information about places, buildings, monuments, and geographical features.',
    color: 'text-accent'
  },
  {
    icon: BookOpen,
    title: 'Rich Information',
    description: 'Access comprehensive details, history, facts, and interesting trivia about everything you scan.',
    color: 'text-primary-glow'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant recognition and information delivery in milliseconds, powered by edge computing.',
    color: 'text-accent'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your scans stay private. Local processing ensures your data never leaves your device.',
    color: 'text-primary-glow'
  },
  {
    icon: Globe,
    title: 'Works Anywhere',
    description: 'Offline capability means you can discover information even without an internet connection.',
    color: 'text-accent'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Everything you need to explore and understand the world around you, 
            right in your pocket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass p-8 rounded-2xl hover:scale-105 transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 glow-primary">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;