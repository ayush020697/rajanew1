import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPin, Phone, Clock, Mail, MessageSquare } from 'lucide-react';
import { socialMedia } from '../mock';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-amber-500">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Visit any of our stores or reach out to us through the following channels. We're always happy to assist you.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-lg">
                      <Mail size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${socialMedia.email}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                      >
                        {socialMedia.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-lg">
                      <Phone size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <p className="text-gray-400">{socialMedia.phone}</p>
                      <p className="text-gray-500 text-sm mt-1">Mon-Sun: 10:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-lg">
                      <MapPin size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Locations</h3>
                      <p className="text-gray-400">7 stores across North India</p>
                      <p className="text-gray-500 text-sm mt-1">Agra, Noida, Ghaziabad, Jaipur & more</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-lg">
                      <MessageSquare size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Social Media</h3>
                      <p className="text-gray-400">Follow us @rajan.wines</p>
                      <p className="text-gray-500 text-sm mt-1">Instagram, Facebook, Twitter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
