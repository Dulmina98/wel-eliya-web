'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Navbar, NavItem } from '../../components/Navbar';

// ─── Shared Icons ───
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ─── Ornaments ───
const Ornament = ({ light = false, className = '' }: { light?: boolean; className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className={`flex-1 h-px ${light ? 'bg-white/20' : 'bg-[#1B4332]/20'}`} />
    <div className={`w-2 h-2 border rotate-45 ${light ? 'border-white/30' : 'border-[#1B4332]/40'}`} />
    <div className={`flex-1 h-px ${light ? 'bg-white/20' : 'bg-[#1B4332]/20'}`} />
  </div>
);

// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Types ───
interface ContactMethod {
  icon: React.ReactNode;
  label: string;
  value: string;
  action: string;
  href?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// ─── Data ───
const contactMethods: ContactMethod[] = [
  {
    icon: <Phone size={18} />,
    label: 'Reservations',
    value: '+94 77 221 7269',
    action: 'Call Now',
    href: 'tel:+94772217269'
  },
  {
    icon: <Phone size={18} />,
    label: 'Delivery Orders',
    value: '+94 77 840 2231',
    action: 'Order by Phone',
    href: 'tel:+94778402231'
  },
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'hello@weleliya.com',
    action: 'Send Email',
    href: 'mailto:hello@weleliya.com'
  },
  {
    icon: <MapPin size={18} />,
    label: 'Address',
    value: 'Unala, Palatuwa, Matara',
    action: 'Get Directions',
    href: 'https://maps.google.com/?q=Unala,Palatuwa,Matara'
  }
];

const faqs: FAQ[] = [
  {
    question: 'Do I need a reservation?',
    answer: 'Walk-ins are welcome, but we recommend booking ahead for weekends and evenings. Our garden pods are limited and fill quickly.'
  },
  {
    question: 'Is there a dress code?',
    answer: 'Come as you are. This is a garden — sandals and linen are perfectly at home here. The only rule is to relax.'
  },
  {
    question: 'Can I bring my own bottle?',
    answer: 'Yes, BYOB is welcome. We keep glasses chilled and the mood easy. No corkage fee.'
  },
  {
    question: 'Do you accommodate large groups?',
    answer: 'Absolutely. We can host up to 40 guests across our pods and garden tables. For groups over 12, please call ahead so we can arrange the space.'
  }
];

const hours = [
  { day: 'Monday – Sunday', time: '10:00 AM – 11:00 PM' },
  { day: 'Kitchen closes', time: '10:30 PM' },
  { day: 'Last seating', time: '10:00 PM' }
];

// ─── Component ───
export default function ContactPage() {
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/about' },
    { label: 'events', href: '/events' },
    { label: 'menu', href: '/#menu' },
    { label: 'gallery', href: '/#gallery' },
    { label: 'contact', sectionId: 'contact' }
  ];
  const reserveAction: NavItem = { label: 'Reserve', sectionId: 'contact' };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'reservation',
    date: '',
    guests: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const heroReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const infoReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#0E0B08] font-sans selection:bg-[#1B4332] selection:text-white">

      <Navbar items={navItems} reserveAction={reserveAction} />

      {/* ═══════════════════════════════════════
          HERO — Split screen: image left, content right
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        {/* Left: Full height image with overlay */}
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
            alt="Wel Eliya garden contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0E0B08]/50" />
          
          {/* Decorative watermark on image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-serif italic text-[100px] md:text-[160px] text-white/[0.04] leading-none select-none">
              Reach<br />Out
            </span>
          </div>

          {/* Inner frame on image */}
          <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none" />
          <div className="absolute inset-6 md:inset-12 border border-white/5 pointer-events-none" />

          {/* Floating info card on image */}
          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
            <div className="bg-[#0E0B08]/60 backdrop-blur-sm border border-white/10 p-6 md:p-8">
              <p className="text-[9px] tracking-[0.35em] uppercase text-white/40 mb-4">— Quick Info —</p>
              <div className="space-y-4">
                {hours.map((h, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-white/50 font-light">{h.day}</span>
                    <span className="text-white/80 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex items-center px-6 md:px-16 py-20 md:py-0">
          <div
            ref={heroReveal.ref}
            className={`max-w-lg transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-6">
              — Get in Touch —
            </p>

            <Ornament className="max-w-[120px] mb-8" />

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] text-[#0E0B08] leading-[0.95] mb-8">
              Let's Start<br />
              <em className="text-[#1B4332] not-italic italic">a Conversation.</em>
            </h1>

            <p className="text-[#4A3728]/70 text-lg font-light leading-relaxed mb-12">
              Whether you are planning a quiet dinner, a group gathering, or just want to know if we have your favorite table free — we are here.
            </p>

            {/* Contact methods as ruled list */}
            <div className="border-t border-[#0E0B08]/10">
              {contactMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-5 border-b border-[#0E0B08]/10 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[#1B4332] mt-0.5">{method.icon}</span>
                    <div>
                      <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/40 mb-1">{method.label}</p>
                      <p className="text-[#0E0B08] font-medium text-sm">{method.value}</p>
                    </div>
                  </div>
                  {method.href && (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[10px] tracking-[0.2em] uppercase text-[#1B4332]/50 hover:text-[#1B4332] transition flex items-center gap-1 group-hover:gap-2"
                    >
                      {method.action} <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FORM SECTION — Dark bistro board treatment
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-28 md:py-36 bg-[#1B4332] text-white relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,white 39px,white 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,white 39px,white 40px)'
          }}
        />

        <div
          ref={formReveal.ref}
          className={`max-w-4xl mx-auto px-6 relative z-10 transition-all duration-1000 ${formReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">— Reserve or Inquire —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Send a Note
            </h2>
            <Ornament light className="max-w-[180px] mx-auto" />
          </div>

          {submitted ? (
            <div className="text-center py-20">
              <CheckCircle size={48} className="text-[#D9CCB9] mx-auto mb-6" />
              <h3 className="font-serif italic text-3xl text-white mb-4">Message Received</h3>
              <p className="text-white/50 font-light max-w-md mx-auto">
                We will get back to you within the day. If it is urgent, please call us directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-px bg-white/5">
              {/* Form grid: 2 columns on desktop */}
              <div className="grid md:grid-cols-2 gap-px bg-white/10">
                {/* Name */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                {/* Inquiry Type */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Type of Inquiry
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="reservation" className="bg-[#1B4332]">Table Reservation</option>
                    <option value="group" className="bg-[#1B4332]">Group Booking</option>
                    <option value="delivery" className="bg-[#1B4332]">Delivery Order</option>
                    <option value="feedback" className="bg-[#1B4332]">Feedback</option>
                    <option value="other" className="bg-[#1B4332]">Something Else</option>
                  </select>
                </div>

                {/* Date (conditional) */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Guests */}
                <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                  <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max="40"
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                    placeholder="2"
                  />
                </div>
              </div>

              {/* Message — full width */}
              <div className="bg-[#1B4332] p-6 md:p-8 group focus-within:bg-[#1B4332]/80 transition-colors">
                <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3 group-focus-within:text-[#D9CCB9]/60 transition-colors">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell us what you need..."
                />
              </div>

              {/* Submit row */}
              <div className="bg-[#1B4332] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-xs text-white/30 font-light">
                  We typically respond within 2 hours during operating hours.
                </p>
                <button
                  type="submit"
                  className="bg-[#D9CCB9] text-[#0E0B08] px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#E8E0D5] transition flex items-center gap-3 flex-shrink-0"
                >
                  <Send size={13} /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAP + INFO — Side by side, warm palette
          ═══════════════════════════════════════ */}
      <section className="py-28 bg-[#F5EFE3]">
        <div
          ref={infoReveal.ref}
          className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${infoReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid md:grid-cols-2 gap-px bg-[#0E0B08]/10">
            {/* Left: Map */}
            <div className="bg-[#F5EFE3] relative min-h-[400px] md:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Wel+Eliya+Family+Restaurant,+Matara&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) sepia(10%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wel Eliya Location"
                className="absolute inset-0"
              />
              {/* Map overlay card */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto">
                <div className="bg-[#F5EFE3]/95 backdrop-blur-sm border border-[#0E0B08]/10 p-6 max-w-xs">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-[#1B4332]/50 mb-2">Find Us</p>
                  <p className="font-serif italic text-lg text-[#0E0B08] leading-snug mb-3">
                    Unala, Palatuwa,<br />Matara, Sri Lanka
                  </p>
                  <a
                    href="https://maps.google.com/?q=Unala,Palatuwa,Matara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#1B4332] hover:text-[#2D6A4F] transition"
                  >
                    <MapPin size={12} /> Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Detailed info */}
            <div className="bg-[#F5EFE3] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-6">
                — Visit Us —
              </p>
              <Ornament className="max-w-[120px] mb-8" />

              <h2 className="font-serif italic text-3xl md:text-4xl text-[#0E0B08] leading-tight mb-10">
                Directions &<br />Details
              </h2>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#1B4332]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/40 mb-1">Location</p>
                    <p className="text-[#0E0B08] font-medium text-sm leading-relaxed">
                      Unala, Palatuwa, Matara<br />
                      <span className="text-[#4A3728]/50 font-light">Sri Lanka</span>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#1B4332]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/40 mb-1">Hours</p>
                    <p className="text-[#0E0B08] font-medium text-sm leading-relaxed">
                      Every Day · 10 AM – 11 PM<br />
                      <span className="text-[#4A3728]/50 font-light">Kitchen closes at 10:30 PM</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#1B4332]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/40 mb-1">Phone</p>
                    <p className="text-[#0E0B08] font-medium text-sm leading-relaxed">
                      +94 77 221 7269<br />
                      <span className="text-[#4A3728]/50 font-light">+94 77 840 2231 (Delivery)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#0E0B08]/10">
                <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/40 mb-4">Follow Along</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition">
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ — Accordion, warm background
          ═══════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#D9CCB9]">
        <div
          ref={faqReveal.ref}
          className={`max-w-3xl mx-auto transition-all duration-1000 ${faqReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-4">— Common Questions —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#0E0B08] mb-6">Before You Arrive</h2>
            <Ornament className="max-w-[180px] mx-auto" />
          </div>

          <div className="space-y-px bg-[#0E0B08]/10">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-[#D9CCB9] transition-colors duration-300 ${isOpen ? 'bg-[#E8E0D5]' : ''}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] tracking-[0.35em] uppercase text-[#1B4332]/30 font-mono">
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif italic text-lg md:text-xl text-[#0E0B08] group-hover:text-[#1B4332] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 border border-[#1B4332]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#1B4332] border-[#1B4332] text-white rotate-45' : 'text-[#1B4332]'}`}>
                      <span className="text-lg leading-none">{isOpen ? '×' : '+'}</span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pl-16 md:pl-20">
                      <p className="text-[#4A3728]/70 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA — Full bleed, atmospheric
          ═══════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Wel Eliya evening atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0E0B08]/75" />
        </div>

        <div
          ref={ctaReveal.ref}
          className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-white/20" />
            <div className="w-2 h-2 border border-white/30 rotate-45" />
            <div className="w-16 h-px bg-white/20" />
          </div>

          <h2 className="font-serif italic text-4xl md:text-6xl text-white leading-[0.95] mb-6">
            The Table is Set.<br />
            <em className="text-[#D9CCB9] not-italic italic">The Garden is Waiting.</em>
          </h2>

          <p className="text-white/45 text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed">
            No need to overthink it. Pick up the phone, send a message, or just show up. We will find you a spot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+94772217269"
              className="bg-[#1B4332] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#2D6A4F] transition flex items-center justify-center gap-3"
            >
              <Phone size={13} /> Call Now
            </a>
            <a
              href="/"
              className="border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-white/8 transition flex items-center justify-center gap-3"
            >
              Back to Home <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="bg-[#0E0B08] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-white/8">
            <div className="md:col-span-1">
              <img
                src="/logo.svg"
                alt="Wel Eliya"
                className="h-16 mb-2 opacity-75"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="text-white/35 text-sm font-light leading-relaxed">
                A private garden retreat where rustic comfort meets open-sky dining.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#" className="text-white/30 hover:text-white/70 transition"><InstagramIcon size={15} /></a>
                <a href="#" className="text-white/30 hover:text-white/70 transition"><FacebookIcon size={15} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-[9px] tracking-[0.35em] uppercase text-white/25 mb-6">Navigate</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Home</a></li>
                <li><a href="/about" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Our Story</a></li>
                {['menu', 'gallery'].map((item) => (
                  <li key={item}>
                    <a href={`/#${item}`} className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] tracking-[0.35em] uppercase text-white/25 mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-white/35 font-light leading-relaxed">
                <li>Unala, Palatuwa, Matara</li>
                <li>+94 77 221 7269</li>
                <li>Every Day · 10 AM – 11 PM</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[9px] tracking-[0.35em] uppercase text-white/25 mb-6">Reserve</h4>
              <a
                href="tel:+94772217269"
                className="block border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-white/8 transition text-center"
              >
                Book a Table
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-white/18 tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Wel Eliya · All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
