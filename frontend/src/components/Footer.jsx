import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { socialMedia } from '../mock';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block group mb-4">
              <div className="flex items-center gap-3">
                {/* Logo Image with Premium Styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-full blur-lg"></div>
                  <div className="relative bg-gradient-to-br from-white to-amber-50 rounded-full p-1.5 border-2 border-amber-500/40 shadow-xl shadow-amber-900/30">
                    <img
                      src="https://customer-assets.emergentagent.com/job_d3158cd7-9e2a-4764-8ae8-32eafb7d67a9/artifacts/9wxmcvnh_image.png"
                      alt="Rajan Wines"
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                </div>
                
                {/* Brand Name */}
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 tracking-wide">
                    Rajan Wines
                  </span>
                  <span className="text-xs text-gray-500 tracking-widest uppercase">
                    Since 2003
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium wines and spirits since 2003. Your trusted partner for authentic, world-class beverages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-500 font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Our Collection
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Current Offers
                </Link>
              </li>
              <li>
                <Link to="/responsible-drinking" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                  Responsible Drinking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-amber-500 font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail size={16} className="mr-2 text-amber-500" />
                <a href={`mailto:${socialMedia.email}`} className="hover:text-amber-400 transition-colors duration-300">
                  {socialMedia.email}
                </a>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone size={16} className="mr-2 text-amber-500" />
                <span>{socialMedia.phone}</span>
              </li>
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin size={16} className="mr-2 text-amber-500 mt-1 flex-shrink-0" />
                <span>Multiple locations across Agra, Noida, Jaipur & more</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-amber-500 font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              @rajanwines
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Rajan Wines. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Please drink responsibly. Must be 21+ to purchase alcohol.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
