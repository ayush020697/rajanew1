import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AgeVerification } from '../components/AgeVerification';
import { Hero } from '../components/Hero';
import { CollectionPreview } from '../components/CollectionPreview';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StoreLocator } from '../components/StoreLocator';
import { featuredProducts, offers } from '../mock';
import { Tag, Calendar, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <AgeVerification />
      <Header />
      <Hero />
      <CollectionPreview />
      <WhyChooseUs />
      
      {/* Special Offers Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Special <span className="text-amber-500">Offers</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Exclusive deals on premium wines and spirits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="group relative bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-amber-500/10 p-3 rounded-lg">
                    <Tag size={24} className="text-amber-500" />
                  </div>
                  <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1 rounded-full">
                    {offer.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {offer.description}
                </p>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Calendar size={14} />
                  <span>{offer.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StoreLocator />
      
      {/* Newsletter Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Exclusive Offers
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to our newsletter and be the first to know about new arrivals and special promotions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-zinc-950 border border-zinc-700 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
