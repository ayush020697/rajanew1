import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { storeLocations } from '../mock';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const Stores = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-amber-500">Locations</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Visit any of our 7 premium stores across North India for an exceptional shopping experience
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl mb-12">
            <div className="relative bg-zinc-900 aspect-[21/9] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&h=600&fit=crop"
                alt="Store locations map"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={64} className="text-amber-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-xl">Interactive Map Coming Soon</p>
                  <p className="text-gray-500 text-sm mt-2">Find your nearest Rajan Wines store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Listings */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All <span className="text-amber-500">Store Locations</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find a store near you and experience premium service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {storeLocations.map((store) => (
              <div
                key={store.id}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                {/* City Badge */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-amber-500">{store.city}</h3>
                  <div className="bg-amber-500/10 p-3 rounded-lg">
                    <MapPin size={24} className="text-amber-500" />
                  </div>
                </div>

                {/* Store Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">{store.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-500 flex-shrink-0" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-gray-300 text-sm hover:text-amber-400 transition-colors duration-300"
                    >
                      {store.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gray-500 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{store.timing}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50">
                    <Navigation size={16} />
                    <span>Get Directions</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                    <Phone size={16} />
                    <span>Call Store</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Features */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What to Expect at <span className="text-amber-500">Our Stores</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Expert Staff', description: 'Knowledgeable team to guide your selection' },
              { title: 'Premium Selection', description: '275+ brands of wines and spirits' },
              { title: 'Climate Controlled', description: 'Optimal storage conditions' },
              { title: 'Easy Parking', description: 'Convenient parking at all locations' }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stores;
