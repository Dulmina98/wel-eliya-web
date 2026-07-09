'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock, MapPin, Phone, ChevronDown,
  ArrowRight, Star
} from 'lucide-react';
import { Navbar, NavItem } from '../components/Navbar';

// Social icons (not in lucide-react v1.23)
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

// Ornamental diamond rule — classic bistro / menu separator
const Ornament = ({ light = false, className = '' }: { light?: boolean; className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className={`flex-1 h-px ${light ? 'bg-white/20' : 'bg-[#1B4332]/20'}`} />
    <div className={`w-2 h-2 border rotate-45 ${light ? 'border-white/30' : 'border-[#1B4332]/40'}`} />
    <div className={`flex-1 h-px ${light ? 'bg-white/20' : 'bg-[#1B4332]/20'}`} />
  </div>
);

// --- Types ---
interface ExperienceCard {
  title: string;
  description: string;
  image: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface GalleryImage {
  url: string;
  caption: string;
  className?: string;
}

interface Review {
  text: string;
  author: string;
  origin: string;
}

// --- Data ---
const experiences: ExperienceCard[] = [
  {
    title: "Pathway to Paradise",
    description: "Watch the sky change colors from the comfort of your private pod.",
    image: "/assets/images/highlights/wmremove-transformed%20(2)%203.jpg"
  },
  {
    title: "Al Fresco Evenings",
    description: "Pull up a chair and unwind. We'll handle the food and the mood.",
    image: "/assets/images/highlights/Mask%20group-1.jpg"
  },
  {
    title: "Rustic Comfort",
    description: "Brick walls, wooden tables, and fresh air. The perfect setting for a relaxing meal.",
    image: "/assets/images/highlights/Mask%20group-2.jpg"
  },
  {
    title: "Your Private Retreat",
    description: "A quiet corner for you and your favorite people, right in the heart of nature.",
    image: "/assets/images/highlights/Mask%20group.jpg"
  }
];

const menuItems: MenuItem[] = [
  {
    name: "Chicken Chop Suey",
    description: "Tender chicken with vegetables in a rich savory sauce",
    price: "1,200 LKR",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Devilled Chicken",
    description: "Sri Lankan-style spiced chicken, bold and fiery",
    price: "1,100 LKR",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Grilled Octopus",
    description: "Char-grilled to perfection with herbs and citrus",
    price: "1,800 LKR",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Fruit Salad & Ice Cream",
    description: "Seasonal tropical fruits with house-made ice cream",
    price: "650 LKR",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  }
];

const galleryImages: GalleryImage[] = [
  { url: "/assets/images/gallery/Mask group.jpg", caption: "Wel Eliya Ambiance" },
  { url: "/assets/images/gallery/Mask group-1.jpg", caption: "Garden Setup" },
  { url: "/assets/images/gallery/Mask group-2.jpg", caption: "Dining Area", className: "object-center" },
  { url: "/assets/images/gallery/Mask group-3.jpg", caption: "Evening Vibes", className: "object-center" },
  { url: "/assets/images/gallery/Mask group-5.jpg", caption: "Wel Eliya Special", className: "object-center" }
];

const reviews: Review[] = [
  {
    text: "The most beautiful dining experience in Matara. The garden pods at sunset are magical, and the food is absolutely incredible.",
    author: "Sarah M.",
    origin: "Colombo"
  },
  {
    text: "We celebrated our anniversary here and it was perfect. The octopus dish is a must-try. Already planning our next visit.",
    author: "Dinesh P.",
    origin: "Galle"
  },
  {
    text: "Such a hidden gem. The ambiance is unmatched and the delivery is super quick too. Love this place.",
    author: "Amara F.",
    origin: "Matara"
  }
];

// --- Component ---
const WelEliyaHomepage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = galleryImages.length;
  
  const navItems: NavItem[] = [
    { label: 'Our Story', href: '/about' },
    { label: 'experience', sectionId: 'experience' },
    { label: 'menu', sectionId: 'menu' },
    { label: 'gallery', sectionId: 'gallery' },
    { label: 'contact', sectionId: 'contact' }
  ];
  const reserveAction: NavItem = { label: 'Reserve', sectionId: 'contact' };

  // Auto-advance carousel every 4s, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);

  // Touch swipe handling
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? nextSlide() : prevSlide();
    touchStartX.current = null;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#0E0B08] font-sans selection:bg-[#1B4332] selection:text-white">

      {/* ─── NAVIGATION ─── */}
      <Navbar items={navItems} reserveAction={reserveAction} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/hero.jpg"
            alt="Wel Eliya Garden Dining"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-[#0E0B08]/68" />
        </div>

        {/* Decorative inner frame — classic bistro menu border */}
        <div className="absolute inset-3 md:inset-6 border border-white/12 pointer-events-none" />
        <div className="absolute inset-5 md:inset-9 border border-white/6 pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-8 pt-20 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase mb-10">
            Unala · Palatuwa · Matara
          </p>

          <img
            src="/logo.svg"
            alt="Wel Eliya"
            className="h-24 md:h-32 mb-8 opacity-90 transition-all duration-700 hover:scale-105"
            style={{ filter: 'brightness(0) invert(1)' }}
          />

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[90px] text-white leading-[0.95] mb-8">
            Taste the <br />
            <em className="text-[#D9CCB9] not-italic italic">Tranquility.</em>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-px bg-white/25" />
            <div className="w-2 h-2 border border-white/35 rotate-45" />
            <div className="w-20 h-px bg-white/25" />
          </div>

          <p className="text-white/55 text-base md:text-lg font-light tracking-wide max-w-lg mx-auto mb-12 leading-relaxed">
            Escape the ordinary. Experience culinary craftsmanship in a serene garden setting under the open sky.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#1B4332] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#2D6A4F] transition"
            >
              Reserve Your Table
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="border border-white/45 text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-white/8 transition"
            >
              See Our Menu
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 hover:text-white/70 transition"
        >
          <span className="text-[9px] tracking-[0.45em] uppercase">Scroll</span>
          <ChevronDown size={15} className="animate-bounce" />
        </button>

        {/* Social icons */}
        <div className="absolute bottom-10 right-8 hidden md:flex flex-col gap-4">
          <a href="#" className="text-white/30 hover:text-white/70 transition"><InstagramIcon size={15} /></a>
          <a href="#" className="text-white/30 hover:text-white/70 transition"><FacebookIcon size={15} /></a>
        </div>
      </section>

      {/* ─── INFO BAR ─── */}
      <div className="bg-[#1B4332] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-5 md:gap-14 text-[10px] tracking-[0.2em] uppercase text-white/65">
          <span className="flex items-center gap-2.5">
            <Clock size={13} className="text-[#D9CCB9]" /> Every Day · 10 AM – 11 PM
          </span>
          <span className="hidden md:block w-px h-3 bg-white/15" />
          <span className="flex items-center gap-2.5">
            <MapPin size={13} className="text-[#D9CCB9]" /> Unala, Palatuwa, Matara
          </span>
          <span className="hidden md:block w-px h-3 bg-white/15" />
          <span className="flex items-center gap-2.5">
            <Phone size={13} className="text-[#D9CCB9]" /> +94 77 221 7269 · +94 77 840 2231
          </span>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-32 px-6 bg-[#F5EFE3]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-7">Welcome</p>
          <Ornament className="max-w-[180px] mx-auto mb-10" />
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-[#0E0B08] leading-tight mb-8">
            A View to<br />Dine For
          </h2>
          <p className="text-[#4A3728]/75 text-lg font-light leading-relaxed">
            Wel Eliya is a private garden retreat where rustic comfort meets open-sky dining.
            Whether it&apos;s a sunset overlooking the fields or a quiet evening under fairy lights,
            every table here is set for a moment worth savoring.
          </p>
          <div className="mt-8">
            <a
              href="/about"
              className="inline-block border border-[#1B4332] text-[#1B4332] px-8 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[#1B4332] hover:text-white transition"
            >
              Read Our Story
            </a>
          </div>
          <Ornament className="max-w-[180px] mx-auto mt-10" />
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="py-28 bg-[#D9CCB9]">
        <div className="max-w-7xl mx-auto px-6 mb-14">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-3">— The Experience —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#0E0B08]">Ambience Highlights</h2>
          </div>
        </div>

        {/* 1px gap grid — tight editorial grid, not spaced cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0E0B08]/10 max-w-7xl mx-auto px-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group relative overflow-hidden aspect-[3/4] cursor-pointer bg-[#D9CCB9]">
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 grayscale-[30%] group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08]/85 via-[#0E0B08]/15 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-[9px] tracking-[0.35em] uppercase text-white/40 mb-2">— 0{idx + 1} —</p>
                <h3 className="font-serif italic text-xl leading-snug mb-2">{exp.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MENU — Bistro board ─── */}
      <section id="menu" className="py-28 bg-[#1B4332] text-white relative overflow-hidden">
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,white 39px,white 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,white 39px,white 40px)'
          }}
        />

        <div className="max-w-3xl mx-auto px-6 relative">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/35 mb-4">— From Our Kitchen —</p>
            <h2 className="font-serif italic text-5xl md:text-6xl text-white mb-6">Customer Favourites</h2>
            <Ornament light className="max-w-[200px] mx-auto" />
          </div>

          {/* Menu board list — items with thumbnail, name, dotted leader, price */}
          <div className="border border-white/10">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-stretch gap-0 border-b border-white/8 last:border-b-0 group hover:bg-white/4 transition-colors"
              >
                {/* Thumbnail — grayscale until hover */}
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden self-center mx-4 my-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Name & description */}
                <div className="flex-1 py-6 pr-4 border-r border-white/8">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 mb-1">0{idx + 1}</p>
                  <h3 className="font-serif italic text-xl text-white leading-snug">{item.name}</h3>
                  <p className="text-xs text-white/40 font-light mt-1 leading-relaxed">{item.description}</p>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end justify-center px-6 text-right">
                  <p className="font-serif text-xl text-[#D9CCB9]">{item.price}</p>
                  <button className="text-[9px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition mt-2">
                    Order →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="border border-white/25 text-white text-[11px] tracking-[0.28em] uppercase px-8 py-3.5 hover:bg-white/8 transition flex items-center gap-3 mx-auto">
              View Full Menu <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── DELIVERY ─── */}
      <section className="py-32 px-6 bg-[#F5EFE3]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-7">Delivery</p>
          <Ornament className="max-w-[180px] mx-auto mb-10" />
          <h2 className="font-serif italic text-5xl md:text-6xl text-[#0E0B08] leading-tight mb-6">
            You Relax.<br />We Deliver.
          </h2>
          <p className="text-[#4A3728]/70 text-lg font-light leading-relaxed mb-3">
            Too tired to cook? We&apos;ve got it. Set the table — or just grab a spot on the couch —
            and we&apos;ll bring paradise to your door.
          </p>
          <p className="text-[#1B4332] font-medium text-sm tracking-wide mb-10">
            Delivering within 5km · 200 LKR flat fee
          </p>
          <Ornament className="max-w-[180px] mx-auto mb-10" />
          <a
            href="tel:+94772217269"
            className="inline-flex items-center gap-3 bg-[#1B4332] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[#2D6A4F] transition"
          >
            <Phone size={13} /> Order by Phone
          </a>
        </div>
      </section>

      {/* ─── GROUP DINING ─── */}
      <section className="py-32 px-6 bg-[#D9CCB9]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-4">For Groups</p>
          <h2 className="font-serif italic text-5xl md:text-6xl text-[#0E0B08] mb-6">Gather Your Crowd</h2>
          <p className="text-[#4A3728]/75 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Good food tastes better with great company. Whether it&apos;s a family lunch,
            a weekend escape, or a night out with friends — bring your people,
            we&apos;ll bring the bites. BYOB welcome.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="border border-[#1B4332] text-[#1B4332] px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[#1B4332] hover:text-white transition"
          >
            Book for Your Group
          </button>
        </div>
      </section>

      {/* ─── GALLERY CAROUSEL ─── */}
      <section id="gallery" className="py-24 bg-[#0E0B08]">
        {/* Header */}
        <div className="px-6 mb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/25 mb-3">— Gallery —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-white">A Peek Into Paradise</h2>
          </div>
          {/* Slide counter */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/25 font-light">
            {String(activeSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </p>
        </div>

        {/* Carousel viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides — absolute stacked, crossfade */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className={`w-full h-full object-cover ${img.className || ''}`}
                />
                {/* Dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08]/70 via-transparent to-[#0E0B08]/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E0B08]/40 via-transparent to-[#0E0B08]/40" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12 flex items-end justify-between">
                  <p className="font-serif italic text-2xl md:text-3xl text-white/90 leading-snug">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/25 text-white/60 hover:border-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-white/8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/25 text-white/60 hover:border-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:bg-white/8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot indicators + progress bar */}
        <div className="px-6 mt-8 max-w-7xl mx-auto">
          {/* Progress bar */}
          <div className="w-full h-px bg-white/10 mb-6 overflow-hidden">
            <div
              className="h-full bg-white/40 transition-all duration-500"
              style={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>

          {/* Dots + thumbnail strip */}
          <div className="flex items-center gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative overflow-hidden transition-all duration-300 flex-shrink-0 ${idx === activeSlide
                  ? 'w-16 h-10 opacity-100'
                  : 'w-8 h-8 opacity-30 hover:opacity-60'
                  }`}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                {idx === activeSlide && (
                  <div className="absolute inset-0 border border-white/50" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-32 px-6 bg-[#F5EFE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-4">— Testimonials —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#0E0B08]">What Our Guests Say</h2>
          </div>

          {/* 1px gap grid — no card rounding, just panels */}
          <div className="grid md:grid-cols-3 gap-px bg-[#0E0B08]/8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-[#F5EFE3] p-10 relative overflow-hidden group">
                {/* Decorative large quotation mark */}
                <span className="absolute -top-2 right-6 font-serif text-[120px] leading-none text-[#1B4332]/6 select-none pointer-events-none group-hover:text-[#1B4332]/10 transition-colors duration-500">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-7">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#B8894A] text-[#B8894A]" />
                  ))}
                </div>

                {/* Review text */}
                <p className="font-serif italic text-[#0E0B08]/75 text-lg leading-relaxed mb-8">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#1B4332]/25" />
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#4A3728]/60">{review.author}</p>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#4A3728]/35 mt-0.5">{review.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-32 px-6 bg-[#D9CCB9]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/55 mb-6">Visit Us</p>
            <Ornament className="max-w-[180px] mb-8" />
            <h2 className="font-serif italic text-5xl md:text-6xl text-[#0E0B08] leading-tight mb-6">
              Your Table<br />Is Waiting
            </h2>
            <p className="text-[#4A3728]/75 text-lg font-light mb-14 leading-relaxed max-w-md">
              Gather with your loved ones for authentic flavors and unforgettable memories.
            </p>

            {/* Contact details — table-style with ruled lines */}
            <div className="border-t border-[#0E0B08]/10">
              {[
                { icon: <MapPin size={14} />, label: 'Location', value: 'Unala, Palatuwa, Matara' },
                { icon: <Clock size={14} />, label: 'Hours', value: 'Every Day · 10 AM – 11 PM' },
                { icon: <Phone size={14} />, label: 'Phone', value: '+94 77 221 7269 · +94 77 840 2231' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 py-5 border-b border-[#0E0B08]/10">
                  <span className="text-[#1B4332] mt-0.5 flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3728]/45 mb-1">{label}</p>
                    <p className="text-[#0E0B08] font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href="tel:+94772217269"
                className="bg-[#1B4332] text-white px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase hover:bg-[#2D6A4F] transition flex items-center gap-2"
              >
                <Phone size={12} /> Call Now
              </a>
              <a
                href="https://maps.google.com/?q=Unala,Palatuwa,Matara"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#1B4332] text-[#1B4332] px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase hover:bg-[#1B4332] hover:text-white transition flex items-center gap-2"
              >
                <MapPin size={12} /> Get Directions
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="aspect-square md:aspect-auto md:h-[580px] bg-[#E8E0D5] overflow-hidden relative border border-[#0E0B08]/10">
            <iframe
              src="https://www.google.com/maps?q=Wel+Eliya+Family+Restaurant,+Matara&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wel Eliya Location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0E0B08] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Top grid */}
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
                <li>
                  <a href="/about" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">
                    Our Story
                  </a>
                </li>
                {['menu', 'gallery', 'contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide"
                    >
                      {item}
                    </button>
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
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-white/8 transition w-full"
              >
                Book a Table
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-white/18 tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Wel Eliya · All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelEliyaHomepage;