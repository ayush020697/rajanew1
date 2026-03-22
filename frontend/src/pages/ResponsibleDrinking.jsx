import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShieldAlert, Users, Heart, AlertCircle, Car, Phone } from 'lucide-react';

const ResponsibleDrinking = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-2 mb-6">
              <Heart size={16} className="text-amber-500" />
              <span className="text-amber-400 text-sm font-medium">Your Well-being Matters</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Drink <span className="text-amber-500">Responsibly</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              At Rajan Wines, we're committed to promoting responsible consumption of alcoholic beverages. Your health and safety are our top priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Responsible Drinking <span className="text-amber-500">Guidelines</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Follow these important principles for safe and responsible alcohol consumption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldAlert,
                title: 'Know Your Limits',
                description: 'Understand your personal tolerance and drink in moderation. Never feel pressured to drink more than you\'re comfortable with.'
              },
              {
                icon: Car,
                title: 'Never Drink & Drive',
                description: 'Always arrange alternative transportation if you plan to drink. Use taxis, ride-sharing services, or designate a sober driver.'
              },
              {
                icon: Users,
                title: 'Age Restrictions',
                description: 'You must be 21 years or older to purchase or consume alcohol. Always carry valid ID when purchasing alcoholic beverages.'
              },
              {
                icon: Heart,
                title: 'Health First',
                description: 'Avoid alcohol if you\'re pregnant, on medication, or have health conditions. Consult your doctor if unsure.'
              },
              {
                icon: AlertCircle,
                title: 'Stay Hydrated',
                description: 'Drink water between alcoholic beverages and eat food while drinking to slow alcohol absorption.'
              },
              {
                icon: Phone,
                title: 'Get Help',
                description: 'If you or someone you know is struggling with alcohol, seek professional help. Support is available.'
              }
            ].map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <div
                  key={index}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20"
                >
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-300">
                      <Icon size={32} className="text-amber-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {guideline.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Important <span className="text-amber-500">Facts</span>
            </h2>

            <div className="space-y-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Standard Drink Sizes</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Beer: 12 oz (regular beer, 5% alcohol)</li>
                  <li>• Wine: 5 oz (table wine, 12% alcohol)</li>
                  <li>• Spirits: 1.5 oz (distilled spirits, 40% alcohol)</li>
                </ul>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-500 mb-3">Moderate Drinking Defined</h3>
                <p className="text-gray-300 leading-relaxed">
                  According to health guidelines, moderate drinking is defined as up to 1 drink per day for women and up to 2 drinks per day for men. These are general guidelines and individual tolerance varies.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-500 mb-3">When NOT to Drink</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• When driving or operating machinery</li>
                  <li>• During pregnancy or trying to conceive</li>
                  <li>• When taking certain medications</li>
                  <li>• If under the legal drinking age</li>
                  <li>• When you have certain medical conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help or Support?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              If you're concerned about your drinking or someone else's, help is available. Reach out to healthcare professionals or support organizations for guidance.
            </p>
            <div className="space-y-4">
              <p className="text-gray-300">
                <span className="font-semibold text-amber-500">National Helpline:</span> Available 24/7 for support
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-amber-500">Local Resources:</span> Consult your healthcare provider for local support groups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our <span className="text-amber-500">Commitment</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Rajan Wines is committed to promoting responsible drinking practices. We train our staff to refuse service to intoxicated individuals and those under the legal drinking age. We partner with local authorities and organizations to promote alcohol awareness and safety.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Together, we can enjoy premium wines and spirits responsibly while prioritizing health, safety, and well-being.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResponsibleDrinking;
