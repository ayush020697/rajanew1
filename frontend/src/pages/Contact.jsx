import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPin, Phone, Mail, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { socialMedia } from '../mock';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  // state: 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.first_name.trim()) next.first_name = 'First name is required';
    if (!form.last_name.trim()) next.last_name = 'Last name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Enter a valid email address';
    if (form.phone && !/^[+\d\s\-()]{6,20}$/.test(form.phone.trim()))
      next.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';
    else if (form.message.trim().length < 10)
      next.message = 'Message must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!API_BASE) {
      setStatus({
        state: 'error',
        message: 'Contact service is not configured. Please try again later.',
      });
      return;
    }
    setStatus({ state: 'submitting', message: '' });
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data?.detail;
        const msg = Array.isArray(detail)
          ? detail.map((d) => d.msg).join(', ')
          : detail || 'Something went wrong. Please try again.';
        setStatus({ state: 'error', message: msg });
        return;
      }
      setStatus({
        state: 'success',
        message: data.message || "Thank you! We'll be in touch shortly.",
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'error',
        message:
          'Network error. Please check your connection and try again, or email us directly at ' +
          socialMedia.email,
      });
    }
  };

  const inputClass = (field) =>
    `w-full bg-zinc-950 border ${
      errors[field] ? 'border-red-500/70' : 'border-zinc-700'
    } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300`;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section id="contact-top" className="relative pt-32 pb-20 overflow-hidden">
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
      <section id="contact-form" className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

              {/* Status banners */}
              {status.state === 'success' && (
                <div
                  data-testid="contact-success-banner"
                  role="status"
                  className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-lg">
                  <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{status.message}</p>
                </div>
              )}
              {status.state === 'error' && (
                <div
                  data-testid="contact-error-banner"
                  role="alert"
                  className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{status.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      data-testid="contact-first-name-input"
                      value={form.first_name}
                      onChange={handleChange}
                      className={inputClass('first_name')}
                      placeholder="John"
                    />
                    {errors.first_name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.first_name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      data-testid="contact-last-name-input"
                      value={form.last_name}
                      onChange={handleChange}
                      className={inputClass('last_name')}
                      placeholder="Doe"
                    />
                    {errors.last_name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.last_name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    data-testid="contact-email-input"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    data-testid="contact-phone-input"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="+91-XXXXXXXXXX"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    data-testid="contact-subject-input"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass('subject')}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    data-testid="contact-message-input"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={status.state === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/50">
                  {status.state === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
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
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
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
                      <a
                        href={`tel:${socialMedia.phone}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                        {socialMedia.phone}
                      </a>
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
                      <p className="text-gray-400">11 stores across North India</p>
                      <p className="text-gray-500 text-sm mt-1">Agra, Greater Noida, Ghaziabad, Farrukhabad &amp; more</p>
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
