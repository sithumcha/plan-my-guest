'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#353023] font-sans flex flex-col justify-between selection:bg-[#F7CAC9] selection:text-[#755353]">
      <Navbar />

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[calc(100vh-160px)]">
        {/* Left Column: Form */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center space-y-8 max-w-xl mx-auto w-full">
          <div className="space-y-3">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#785655]">Let's Connect</h1>
            <p className="text-sm text-[#504444] leading-relaxed">
              Whether you have a question about our features, pricing, or need a little help planning your big day, our team is ready to answer all your questions.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-[fadeIn_0.3s_ease-out]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Thank you! Your message has been sent successfully. We will reply within 2 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[#1F1B0F] font-semibold">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-[#785655]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[#1F1B0F] font-semibold">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-[#785655]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[#1F1B0F] font-semibold">Email Address</label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-[#785655]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[#1F1B0F] font-semibold">How can we help?</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your event..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl p-4 focus:outline-none focus:border-[#785655] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#F7CAC9] hover:bg-[#F5E6E3] border border-[#F7CAC9] text-[#755353] font-bold rounded-2xl text-xs shadow-sm transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Column: Full Interactive Map Background with Floating Office Card Overlay */}
        <div className="relative min-h-[400px] lg:min-h-full bg-[#EBE2CE] overflow-hidden border-l border-[#EBE2CE] flex items-center justify-center p-8">
          {/* Map Graphic Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200"
              alt="Studio Map"
              className="w-full h-full object-cover opacity-60 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0]/40 to-transparent pointer-events-none" />
          </div>

          {/* Floating Office Details Card */}
          <div className="relative z-10 w-full max-w-sm bg-[#FFFDF9]/95 backdrop-blur-md border border-[#EBE2CE] p-8 rounded-3xl shadow-2xl space-y-6">
            <h3 className="font-serif text-3xl font-bold text-[#785655]">Our Office</h3>

            <div className="space-y-5 text-xs text-[#504444]">
              {/* Studio Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#F7EDD9] rounded-xl text-[#785655]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#353023] block">Studio Location</span>
                  <p className="mt-0.5 leading-relaxed">
                    15 Rue de la Paix, 75002 Paris, France <br />
                    <span className="text-[11px] text-[#827473]">Shangri-La Foyer, Colombo 02, Sri Lanka</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[#EBE2CE]/60">
                <div className="p-2 bg-[#F7EDD9] rounded-xl text-[#785655]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#353023] block">Email Us</span>
                  <a href="mailto:hello@planmyguest.com" className="text-[#785655] font-semibold hover:underline block mt-0.5">
                    hello@planmyguest.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[#EBE2CE]/60">
                <div className="p-2 bg-[#F7EDD9] rounded-xl text-[#785655]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#353023] block">Call Us</span>
                  <p className="text-[#785655] font-semibold mt-0.5">+33 1 23 45 67 89 / +94 11 234 5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
