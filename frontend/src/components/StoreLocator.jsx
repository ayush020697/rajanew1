import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { storeLocations } from '../mock';

export const StoreLocator = () => {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visit Our <span className="text-amber-500">Stores</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find the nearest Rajan Wines location and experience premium service
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="relative bg-zinc-900 aspect-[21/9] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&h=600&fit=crop"
              alt="Store locations map"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-amber-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storeLocations.map((store) => (
            <div
              key={store.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/20"
            >
              {/* City Name */}
              <h3 className="text-2xl font-bold text-amber-500 mb-4">{store.city}</h3>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{store.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{store.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-500 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{store.timing}</p>
                </div>
              </div>

              {/* Get Directions Button */}
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-amber-600/10 hover:bg-amber-600 text-amber-500 hover:text-white font-medium py-2.5 px-4 rounded-lg border border-amber-600/30 hover:border-amber-600 transition-all duration-300">
                <Navigation size={16} />
                <span>Get Directions</span>
              </button>
            </div>
          ))}
        </div>

        {/* View All Stores Link */}
        <div className="text-center mt-12">
          <Link
            to="/stores"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold transition-colors duration-300"
          >
            View All Store Details
            <Navigation size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
