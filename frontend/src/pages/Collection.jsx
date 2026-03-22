import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { productCategories, featuredProducts } from '../mock';
import { ArrowRight } from 'lucide-react';

const Collection = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1674916084024-50cdd3f6b864"
            alt="Premium Collection"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Premium <span className="text-amber-500">Collection</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover an exquisite selection of the world's finest wines and spirits, carefully curated for the discerning connoisseur.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-amber-500">Selection</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hand-picked premium bottles that represent the best of our collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-3">{product.origin}</p>
                  
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Browse by <span className="text-amber-500">Category</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our diverse collection organized by spirit type
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Visit any of our stores and our expert staff will help you find the perfect bottle for any occasion.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
