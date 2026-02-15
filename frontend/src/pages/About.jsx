import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1627503607711-3b427348cbd7"
            alt="About Rajan Wines"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-amber-500">Rajan Wines</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Over 23 years of excellence in bringing the world's finest wines and spirits to discerning connoisseurs across India.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-amber-500">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Since 2001, Rajan Wines has been the premier destination for wine and spirits enthusiasts. What began as a single store in Agra has grown into a trusted network of seven locations across major cities.
                </p>
                <p>
                  Our passion for quality and authenticity drives everything we do. We carefully curate our collection, sourcing directly from renowned distilleries and vineyards worldwide to ensure every bottle meets our exacting standards.
                </p>
                <p>
                  Today, Rajan Wines stands as a symbol of trust, quality, and exceptional service in the premium beverage industry.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1758790121744-0ead6c5e63fe"
                alt="Our collection"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-amber-500">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide us every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: "Quality First",
                description: "Only authentic, premium products from authorized sources"
              },
              {
                icon: Users,
                title: "Customer Focus",
                description: "Personalized service and expert guidance for every customer"
              },
              {
                icon: Target,
                title: "Integrity",
                description: "Transparent pricing and honest recommendations"
              },
              {
                icon: Heart,
                title: "Passion",
                description: "Deep love for fine wines and spirits"
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
                    <Icon size={32} className="text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our <span className="text-amber-500">Mission</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              To be India's most trusted destination for premium wines and spirits, offering an unparalleled selection, expert guidance, and exceptional service that enhances every celebration and special moment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <p className="text-3xl font-bold text-amber-500 mb-2">275+</p>
                <p className="text-gray-400">Premium Brands</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <p className="text-3xl font-bold text-amber-500 mb-2">50K+</p>
                <p className="text-gray-400">Happy Customers</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <p className="text-3xl font-bold text-amber-500 mb-2">23+</p>
                <p className="text-gray-400">Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
