import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '../mock';

export const CollectionPreview = () => {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Premium <span className="text-amber-500">Collection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our carefully curated selection of the world's finest wines and spirits
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category) => (
            <Link
              key={category.id}
              to={`/collection#${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 text-sm font-medium">
                    {category.count}+ varieties
                  </span>
                  <ArrowRight
                    size={20}
                    className="text-amber-500 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50 hover:-translate-y-0.5"
          >
            View Full Collection
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};
