import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { offers } from '../mock';
import { Tag, Calendar, Gift, Percent } from 'lucide-react';

const Offers = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-2 mb-6">
              <Gift size={16} className="text-amber-500" />
              <span className="text-amber-400 text-sm font-medium">Special Deals</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Exclusive <span className="text-amber-500">Offers</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover incredible deals on premium wines and spirits. Limited time offers you don't want to miss.
            </p>
          </div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Current <span className="text-amber-500">Promotions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Take advantage of these special deals while they last
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-amber-500/10 p-4 rounded-xl">
                    <Tag size={32} className="text-amber-500" />
                  </div>
                  <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-4 py-2 rounded-full">
                    {offer.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {offer.title}
                </h3>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {offer.description}
                </p>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm border-t border-zinc-800 pt-4">
                  <Calendar size={16} className="text-amber-500" />
                  <span>{offer.validUntil}</span>
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              More Ways to <span className="text-amber-500">Save</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Additional benefits and special programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
                <Percent size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bulk Discounts</h3>
              <p className="text-gray-400">
                Save more when you buy in larger quantities. Perfect for events and celebrations.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
                <Gift size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Loyalty Rewards</h3>
              <p className="text-gray-400">
                Join our loyalty program and earn points on every purchase for exclusive rewards.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
                <Tag size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Festival Specials</h3>
              <p className="text-gray-400">
                Special promotions during major festivals and celebrations throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss an Offer
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to our newsletter and be the first to know about exclusive deals and promotions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-zinc-950 border border-zinc-700 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 whitespace-nowrap shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
