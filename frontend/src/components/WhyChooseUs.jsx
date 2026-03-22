import React from 'react';
import { ShieldCheck, Award, Users, MapPin, Tag, Clock } from 'lucide-react';
import { whyChooseUs } from '../mock';

const iconMap = {
  'shield-check': ShieldCheck,
  'award': Award,
  'users': Users,
  'map-pin': MapPin,
  'tag': Tag,
  'clock': Clock
};

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-amber-500">Rajan Wines</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your trusted destination for premium wines and spirits with unmatched service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="group relative bg-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-300">
                    <Icon size={32} className="text-amber-500" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-bl-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
