'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Heart, Users, BookOpen, Briefcase, PartyPopper, Wine, Music, Camera, ArrowRight, ArrowUpRight, Phone, Send } from 'lucide-react';
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

// ─── Scroll Reveal ───
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
interface EventType {
  icon: React.ReactNode;
  title: string;
  description: string;
  capacity: string;
  image: string;
}

interface Amenity {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PastEvent {
  title: string;
  type: string;
  quote: string;
  image: string;
}

// ─── Data ───
const eventTypes: EventType[] = [
  {
    icon: <Heart size={20} />,
    title: 'Intimate Weddings',
    description: 'Exchange vows under the jackfruit trees, then dine beneath the stars. For up to 40 of your closest people.',
    capacity: 'Up to 40 guests',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Users size={20} />,
    title: 'Engagements',
    description: 'A private pod, candlelight, and the moment you ask the question. We handle the setting; you handle the ring.',
    capacity: '2 – 20 guests',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Office Occasions',
    description: 'Team lunches that do not feel like work. Off-site dinners where the wifi is weak and the conversation is strong.',
    capacity: '10 – 35 guests',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Book Launches',
    description: 'A quiet garden full of readers. Wine, words, and the kind of atmosphere that makes every passage feel profound.',
    capacity: '15 – 40 guests',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <PartyPopper size={20} />,
    title: 'Birthdays & Anniversaries',
    description: 'Milestones deserve more than a reservation. They deserve a garden, a toast, and a table set just for you.',
    capacity: 'Any size',
    image: 'https://images.unsplash.com/photo-1530103862676-de3c9a59aa38?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Wine size={20} />,
    title: 'Private Dinners',
    description: 'No occasion necessary. Just a long table, good people, and the freedom to eat, drink, and disappear for the evening.',
    capacity: 'Up to 40 guests',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80'
  }
];

const amenities: Amenity[] = [
  { icon: <Users size={16} />, title: 'Exclusive Garden Access', description: 'The entire venue is yours for the evening. No shared tables, no strangers.' },
  { icon: <Wine size={16} />, title: 'BYOB Welcome', description: 'Bring your own wine and spirits. We provide the glasses, the ice, and the zero corkage fee.' },
  { icon: <Music size={16} />, title: 'Ambient Sound', description: 'Soft acoustic music or curated playlists. We can arrange live musicians on request.' },
  { icon: <Camera size={16} />, title: 'Picture-Perfect Light', description: 'Golden hour here is not a filter. It is a guarantee. Every corner is a backdrop.' },
  { icon: <PartyPopper size={16} />, title: 'Custom Menu Planning', description: 'Work with our kitchen to build a set menu that matches your occasion and your guests.' },
  { icon: <Heart size={16} />, title: 'Personal Touch', description: 'Flowers, fairy lights, special seating. Tell us what you imagine and we will make it real.' }
];

const pastEvents: PastEvent[] = [
  {
    title: 'An Evening Under the Frangipani',
    type: 'Intimate Wedding',
    quote: 'We had twenty people and it felt like the whole world stopped for us. The food, the light, the quiet — it was exactly what we wanted.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Pages & Pinot',
    type: 'Book Launch',
    quote: 'There is something about reading beneath open sky that makes every sentence land harder. My guests are still talking about it.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Forty and Fearless',
    type: 'Birthday Gathering',
    quote: 'I did not want a club. I wanted my people, long tables, and food that kept coming. Wel Eliya gave me all three.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
  }
];

// ─── Component ───
export default function PrivateEventsPage() {
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/about' },
    { label: 'events', href: '/events' },
    { label: 'menu', href: '/#menu' },
    { label: 'gallery', href: '/#gallery' },
    { label: 'contact', href: '/contact' }
  ];
  const reserveAction: NavItem = { label: 'Inquire', sectionId: 'inquire' };

  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [inquiryType, setInquiryType] = useState('');

  const heroReveal = useScrollReveal();
  const introReveal = useScrollReveal();
  const eventsReveal = useScrollReveal();
  const amenitiesReveal = useScrollReveal();
  const pastReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#0E0B08] font-sans selection:bg-[#1B4332] selection:text-white">

      <Navbar items={navItems} reserveAction={reserveAction} />

      {/* ═══════════════════════════════════════
          HERO — Full bleed, warm, cinematic
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/hero.jpg"
            alt="Private celebration at Wel Eliya"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0E0B08]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08] via-transparent to-[#0E0B08]/30" />
        </div>

        {/* Decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif italic text-[140px] md:text-[240px] text-white/[0.03] leading-none text-center">
            Your<br />Moment
          </span>
        </div>

        {/* Double frame */}
        <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none" />
        <div className="absolute inset-6 md:inset-12 border border-white/5 pointer-events-none" />

        {/* Content */}
        <div
          ref={heroReveal.ref}
          className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[10px] text-[#D9CCB9]/60 tracking-[0.5em] uppercase mb-8">
            Private Events · Wel Eliya
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-px bg-white/20" />
            <div className="w-2 h-2 border border-white/30 rotate-45" />
            <div className="w-20 h-px bg-white/20" />
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[90px] text-white leading-[0.95] mb-8">
            The Garden<br />
            <em className="text-[#D9CCB9] not-italic italic">Is Yours.</em>
          </h1>

          <p className="text-white/50 text-base md:text-lg font-light tracking-wide max-w-xl mx-auto mb-14 leading-relaxed">
            Small weddings, quiet engagements, book launches, office escapes, and birthdays that actually feel like birthdays. For up to 40 people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#inquire"
              className="bg-[#1B4332] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#2D6A4F] transition"
            >
              Plan Your Event
            </a>
            <a
              href="#events"
              className="border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-white/8 transition"
            >
              See What We Host
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[9px] tracking-[0.45em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO — Warm, centered, emotional
          ═══════════════════════════════════════ */}
      <section className="py-32 md:py-40 px-6 bg-[#F5EFE3]">
        <div
          ref={introReveal.ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${introReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Ornament className="max-w-[160px] mx-auto mb-12" />
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-8">
            — Not Just a Reservation —
          </p>
          <h2 className="font-serif italic text-3xl md:text-5xl lg:text-[52px] text-[#0E0B08] leading-[1.1] mb-10">
            Some Moments Deserve<br />
            <span className="text-[#1B4332]/70">More Than a Table.</span>
          </h2>
          <Ornament className="max-w-[160px] mx-auto mb-12" />
          <p className="text-[#4A3728]/70 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            We have hosted twenty-person weddings where the couple forgot to plan a first dance because they were too busy laughing.
            We have held book launches where the author cried during the reading because the light was just right.
            We do not do banquet halls. We do gatherings that feel like secrets.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EVENT TYPES — Dark board, 1px gap grid
          ═══════════════════════════════════════ */}
      <section id="events" className="py-28 bg-[#1B4332] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,white 39px,white 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,white 39px,white 40px)'
          }}
        />

        <div
          ref={eventsReveal.ref}
          className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-1000 ${eventsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">— What We Host —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Every Occasion,<br />Every Size
            </h2>
            <Ornament light className="max-w-[180px] mx-auto" />
          </div>

          {/* 1px gap grid — 3 columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {eventTypes.map((event, idx) => (
              <div
                key={idx}
                className="group relative bg-[#1B4332] overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveEvent(idx)}
                onMouseLeave={() => setActiveEvent(null)}
              >
                {/* Image — grayscale until hover */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${activeEvent === idx ? 'scale-110 grayscale-0' : 'scale-100 grayscale-[40%]'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#D9CCB9]">{event.icon}</span>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-white/30">{event.capacity}</p>
                  </div>
                  <h3 className="font-serif italic text-2xl text-white mb-3 leading-snug group-hover:text-[#D9CCB9] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 group-hover:text-white/70 transition-colors">
                    <span>Inquire</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AMENITIES — Ruled list, warm background
          ═══════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#D9CCB9]">
        <div
          ref={amenitiesReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${amenitiesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid md:grid-cols-2 gap-20 items-start">
            {/* Left: Sticky heading */}
            <div className="md:sticky md:top-32">
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-6">
                — What Is Included —
              </p>
              <Ornament className="max-w-[120px] mb-8" />
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-[56px] text-[#0E0B08] leading-[1.05] mb-8">
                We Handle<br />
                <span className="text-[#1B4332]/70">the Details.</span>
              </h2>
              <p className="text-[#4A3728]/70 text-lg font-light leading-relaxed max-w-md">
                You bring the people and the reason. We bring the setting, the service, and the kind of attention that makes guests feel like family.
              </p>
            </div>

            {/* Right: Ruled amenity list */}
            <div className="border-t border-[#0E0B08]/10">
              {amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 py-7 border-b border-[#0E0B08]/10 group hover:bg-[#E8E0D5]/50 transition-colors px-4 -mx-4"
                >
                  <div className="w-10 h-10 border border-[#1B4332]/20 flex items-center justify-center flex-shrink-0 text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition-all">
                    {amenity.icon}
                  </div>
                  <div>
                    <h3 className="font-serif italic text-xl text-[#0E0B08] mb-1 group-hover:text-[#1B4332] transition-colors">
                      {amenity.title}
                    </h3>
                    <p className="text-[#4A3728]/65 text-sm font-light leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PAST EVENTS — Editorial cards, 1px gap
          ═══════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#F5EFE3]">
        <div
          ref={pastReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${pastReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-4">— Memories Made Here —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#0E0B08] mb-6">
              Stories From the Garden
            </h2>
            <Ornament className="max-w-[180px] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#0E0B08]/8">
            {pastEvents.map((event, idx) => (
              <div key={idx} className="bg-[#F5EFE3] group relative overflow-hidden">
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08]/70 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="text-[9px] tracking-[0.35em] uppercase text-white/50 bg-[#0E0B08]/40 px-3 py-1.5 backdrop-blur-sm">
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-[#1B4332]/20" />
                    <div className="w-2 h-2 border border-[#1B4332]/30 rotate-45" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-[#0E0B08] mb-4 leading-snug">
                    {event.title}
                  </h3>
                  <blockquote className="text-[#4A3728]/70 font-light leading-relaxed italic">
                    &ldquo;{event.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INQUIRY CTA — Dark, powerful, full
          ═══════════════════════════════════════ */}
      <section id="inquire" className="py-32 md:py-40 bg-[#0E0B08] text-white relative overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif italic text-[200px] md:text-[350px] text-white/[0.015] leading-none">
            Inquire
          </span>
        </div>

        <div
          ref={ctaReveal.ref}
          className={`max-w-4xl mx-auto px-6 relative z-10 transition-all duration-1000 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-white/15" />
              <div className="w-2 h-2 border border-white/25 rotate-45" />
              <div className="w-16 h-px bg-white/15" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Tell Us<br />
              <em className="text-[#D9CCB9] not-italic italic">Your Plan.</em>
            </h2>

            <p className="text-white/40 text-lg font-light max-w-lg mx-auto leading-relaxed">
              Share a few details and we will get back to you within a day with availability, ideas, and a rough sense of what it will cost.
            </p>
          </div>

          {/* Simple inquiry form */}
          <form className="max-w-2xl mx-auto space-y-px bg-white/5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-px bg-white/10">
              <div className="bg-[#0E0B08] p-6 md:p-8">
                <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">Your Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                  placeholder="Name"
                />
              </div>
              <div className="bg-[#0E0B08] p-6 md:p-8">
                <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                  placeholder="email@example.com"
                />
              </div>
              <div className="bg-[#0E0B08] p-6 md:p-8">
                <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">Event Type</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0E0B08]">Select occasion</option>
                  <option value="wedding" className="bg-[#0E0B08]">Intimate Wedding</option>
                  <option value="engagement" className="bg-[#0E0B08]">Engagement</option>
                  <option value="corporate" className="bg-[#0E0B08]">Office / Corporate</option>
                  <option value="birthday" className="bg-[#0E0B08]">Birthday / Anniversary</option>
                  <option value="book" className="bg-[#0E0B08]">Book Launch</option>
                  <option value="other" className="bg-[#0E0B08]">Something Else</option>
                </select>
              </div>
              <div className="bg-[#0E0B08] p-6 md:p-8">
                <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">Expected Guests</label>
                <input
                  type="number"
                  min="2"
                  max="40"
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors placeholder:text-white/20"
                  placeholder="Approximate number"
                />
              </div>
            </div>
            <div className="bg-[#0E0B08] p-6 md:p-8">
              <label className="block text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3">Tell Us More</label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/15 pb-3 text-white font-light text-lg focus:outline-none focus:border-[#D9CCB9]/50 transition-colors resize-none placeholder:text-white/20"
                placeholder="Date, vision, dietary needs, anything..."
              />
            </div>
            <div className="bg-[#0E0B08] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-white/30 font-light">
                We typically respond within 24 hours.
              </p>
              <button
                type="submit"
                className="bg-[#D9CCB9] text-[#0E0B08] px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#E8E0D5] transition flex items-center gap-3 flex-shrink-0"
              >
                <Send size={13} /> Send Inquiry
              </button>
            </div>
          </form>

          {/* Or call directly */}
          <div className="text-center mt-12 pt-12 border-t border-white/8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-4">Prefer to Talk?</p>
            <a
              href="tel:+94772217269"
              className="inline-flex items-center gap-3 text-white/60 hover:text-white transition font-serif italic text-2xl"
            >
              <Phone size={18} /> +94 77 221 7269
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="bg-[#0E0B08] text-white py-20 px-6 border-t border-white/5">
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
                <li><a href="/events" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Events</a></li>
                <li><a href="/contact" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Contact</a></li>
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
