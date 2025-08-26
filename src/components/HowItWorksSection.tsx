import React from 'react';
import { Smartphone, ScanLine, Brain, Info } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Open InfoSnap',
    description: 'Launch the app and point your camera at any object or place you want to learn about.',
    number: '01'
  },
  {
    icon: ScanLine,
    title: 'Scan & Capture',
    description: 'Our advanced AI instantly recognizes what you\'re looking at using computer vision.',
    number: '02'
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Powerful machine learning algorithms analyze and identify the object or location.',
    number: '03'
  },
  {
    icon: Info,
    title: 'Get Information',
    description: 'Receive detailed information, facts, history, and insights about your subject.',
    number: '04'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Simple, intuitive, and incredibly powerful. Get information about 
            anything in just four easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 glow-accent">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <div className="w-full h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;