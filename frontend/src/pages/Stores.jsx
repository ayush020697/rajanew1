import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { storeLocations, warehouseOffice, corporateOffice } from '../mock';
import { LazyStoreMap } from '../components/LazyStoreMap';
import { MapPin, Phone, Clock, Navigation, Building2, Warehouse } from 'lucide-react';

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
              Visit any of our premium stores across North India for an exceptional shopping experience
            </p>
          </div>
        </div>
      </section>

      {/* Corporate & Warehouse Offices */}
      <section className="py-12 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Corporate Office */}
            <div
              data-testid="corporate-office-card"
              className="bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl p-8 hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-amber-500/10 p-3 rounded-xl">
                  <Building2 size={28} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80 font-medium mb-1">Head Office</p>
                  <h3 className="text-2xl font-bold text-white">{corporateOffice.title}</h3>
                </div>
              </div>
              <div className="space-y-3 ml-1">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{corporateOffice.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{corporateOffice.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-amber-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{corporateOffice.timing}</p>
                </div>
              </div>
            </div>

            {/* Warehouse Office */}
            <div
              data-testid="warehouse-office-card"
              className="bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl p-8 hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-amber-500/10 p-3 rounded-xl">
                  <Warehouse size={28} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80 font-medium mb-1">Logistics</p>
                  <h3 className="text-2xl font-bold text-white">{warehouseOffice.title}</h3>
                </div>
              </div>
              <div className="space-y-3 ml-1">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{warehouseOffice.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{warehouseOffice.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-amber-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{warehouseOffice.timing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-center">
            <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-medium mb-2">Find Us On Map</p>
            <p className="text-gray-400 text-sm">Tap any pin to view shop details and get directions</p>
          </div>
          <LazyStoreMap height="560px" />
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
                data-testid={`stores-page-card-${store.id}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                {/* Store Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-3">
                    <h3 className="text-2xl font-bold text-amber-500 leading-snug">{store.name}</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.18em] mt-1">{store.city}</p>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-lg flex-shrink-0">
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
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50">
                    <Navigation size={16} />
                    <span>Get Directions</span>
                  </a>
                  
                  <a
                    href={`tel:${store.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                    <Phone size={16} />
                    <span>Call Store</span>
                  </a>
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
              { title: 'Premium Selection', description: '1000+ brands of wines and spirits' },
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
