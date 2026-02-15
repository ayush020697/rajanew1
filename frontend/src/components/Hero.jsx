import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1767969217452-3cc1eb722703"
          alt="Premium wines and spirits"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-950"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge with Logo - Hero Version */}
          <div className="inline-flex items-center gap-3 bg-zinc-900/40 backdrop-blur-md border border-amber-600/20 rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-black/20">
            {/* Small Logo Icon - Perfectly Round */}
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-full p-1 border border-amber-600/20">
                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="https://customer-assets.emergentagent.com/job_d3158cd7-9e2a-4764-8ae8-32eafb7d67a9/artifacts/9wxmcvnh_image.png"
                    alt="Rajan Wines"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
            </div>
            <span className="text-amber-500 text-sm font-medium tracking-wide">Since 2001</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Premium Wines</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              & Fine Spirits
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover an exquisite collection of world-class wines and spirits. 
            From rare single malts to vintage champagnes, experience luxury in every pour.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collection"
              className="group inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50 hover:-translate-y-0.5">

              Explore Collection
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/stores"
              className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all duration-300 hover:-translate-y-0.5">

              Find a Store
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">23+</p>
              <p className="text-gray-400 text-sm">Years of Excellence</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">7</p>
              <p className="text-gray-400 text-sm">Store Locations</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">275+</p>
              <p className="text-gray-400 text-sm">Premium Brands</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">100%</p>
              <p className="text-gray-400 text-sm">Authentic Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-amber-500 rounded-full"></div>
        </div>
      </div>
    </section>);

};