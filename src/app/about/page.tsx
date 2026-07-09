'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navbar, NavItem } from '../../components/Navbar';

// ─── Shared Icons (same as homepage) ───
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

const OrnamentVertical = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-col items-center gap-3 ${className}`}>
    <div className="w-px h-12 bg-[#1B4332]/15" />
    <div className="w-2 h-2 border border-[#1B4332]/30 rotate-45" />
    <div className="w-px h-12 bg-[#1B4332]/15" />
  </div>
);

// ─── Types ───
interface StoryChapter {
  chapter: string;
  label: string;
  title: string;
  body: string[];
  image: string;
  align: 'left' | 'right';
}

interface Value {
  number: string;
  title: string;
  description: string;
}

interface SpaceImage {
  url: string;
  caption: string;
  span: string;
}

// ─── Data ───
const storyChapters: StoryChapter[] = [
  {
    chapter: '01',
    label: 'The Beginning',
    title: 'A Garden First, A Restaurant Second',
    body: [
      'Wel Eliya started not with a business plan, but with a clearing. A patch of land in Unala where the afternoon light filtered through jackfruit trees and the breeze carried the scent of cinnamon from nearby gardens.',
      'We built a simple shelter to serve tea to friends who wandered by. Then came a few tables. Then a kitchen. Before we knew it, strangers were becoming regulars, and regulars were becoming family.'
    ],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    align: 'left'
  },
  {
    chapter: '02',
    label: 'The Philosophy',
    title: 'Let the Setting Do the Talking',
    body: [
      'We never wanted walls. The best dining rooms in the world have no ceilings — just sky, birdsong, and the rustle of leaves. We designed every pod, every table, every pathway to frame nature, not fight it.',
      'The food followed the same logic. Simple, honest flavors. Ingredients that travel minutes, not miles. Recipes passed down and then gently reimagined. No foam, no fuss. Just heat, herbs, and hunger.'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    align: 'right'
  }
];

const values: Value[] = [
  {
    number: '01',
    title: 'Open Air',
    description: 'We believe meals taste better under sky. Our dining pods and garden tables are designed to dissolve the boundary between inside and out.'
  },
  {
    number: '02',
    title: 'Honest Fire',
    description: 'No shortcuts in the kitchen. Everything that can be grilled over charcoal, slow-cooked, or prepared fresh to order, is.'
  },
  {
    number: '03',
    title: 'True Warmth',
    description: 'Hospitality is not a script here. It is the natural result of people who genuinely love feeding others and watching them relax.'
  }
];

const spaceImages: SpaceImage[] = [
  { url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80', caption: 'The Garden Pods', span: 'md:col-span-2 md:row-span-2' },
  { url: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=600&q=80', caption: 'Evening Light', span: 'md:col-span-1' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80', caption: 'Bar & Prep', span: 'md:col-span-1' },
  { url: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80', caption: 'Private Corners', span: 'md:col-span-2' }
];

// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Component ───
export default function AboutPage() {
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'experience', href: '/#experience' },
    { label: 'menu', href: '/#menu' },
    { label: 'gallery', href: '/#gallery' },
    { label: 'contact', href: '/contact' }
  ];
  const reserveAction: NavItem = { label: 'Reserve', href: '/contact' };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroReveal = useScrollReveal();
  const introReveal = useScrollReveal();
  const valuesReveal = useScrollReveal();
  const quoteReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#0E0B08] font-sans selection:bg-[#1B4332] selection:text-white">

      <Navbar items={navItems} reserveAction={reserveAction} />

      {/* ═══════════════════════════════════════
          HERO — Asymmetric, editorial, left-weighted
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background image with dual gradient */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
            alt="Wel Eliya garden atmosphere"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08] via-[#0E0B08]/50 to-[#0E0B08]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0B08]/80 via-transparent to-transparent" />
        </div>

        {/* Decorative watermark text */}
        <div className="absolute top-1/2 left-6 md:left-16 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-serif italic text-[120px] md:text-[200px] lg:text-[260px] text-white/[0.03] leading-none">
            Our<br />Story
          </span>
        </div>

        {/* Inner frame — offset to the right, not centered */}
        <div className="absolute inset-4 md:inset-8 border border-white/8 pointer-events-none" />
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bottom-4 left-4 md:left-8 border border-white/4 pointer-events-none" />

        {/* Content — anchored bottom-left */}
        <div
          ref={heroReveal.ref}
          className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pb-20 md:pb-28 transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-2xl">
            <p className="text-[10px] text-[#D9CCB9]/60 tracking-[0.5em] uppercase mb-6">
              Unala · Palatuwa · Matara
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-white/20" />
              <div className="w-2 h-2 border border-white/30 rotate-45" />
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[85px] text-white leading-[0.95] mb-8">
              Every Meal<br />
              <em className="text-[#D9CCB9] not-italic italic">Tells a Story.</em>
            </h1>

            <p className="text-white/50 text-base md:text-lg font-light tracking-wide max-w-md leading-relaxed">
              Ours begins in a garden, where the light changes by the hour and the only walls are the ones we chose not to build.
            </p>
          </div>
        </div>

        {/* Social — vertical, left side */}
        <div className="absolute bottom-10 left-6 md:left-16 hidden md:flex flex-col gap-5">
          <a href="#" className="text-white/25 hover:text-white/70 transition"><InstagramIcon size={15} /></a>
          <a href="#" className="text-white/25 hover:text-white/70 transition"><FacebookIcon size={15} /></a>
          <div className="w-px h-12 bg-white/15 mx-auto" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO — Pure typography, centered, sparse
          ═══════════════════════════════════════ */}
      <section className="py-32 md:py-40 px-6 bg-[#F5EFE3]">
        <div
          ref={introReveal.ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${introReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Ornament className="max-w-[160px] mx-auto mb-12" />
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-8">
            — A Note From the Garden —
          </p>
          <blockquote className="font-serif italic text-3xl md:text-5xl lg:text-[52px] text-[#0E0B08] leading-[1.15] mb-10">
            We did not set out to build a restaurant.
            <br className="hidden md:block" />
            <span className="text-[#4A3728]/60"> We set out to preserve a feeling.</span>
          </blockquote>
          <Ornament className="max-w-[160px] mx-auto mb-12" />
          <p className="text-[#4A3728]/70 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            The feeling of afternoon light on your shoulders. Of eating slowly because there is nowhere else to be.
            Of looking up from your plate and realizing the sky has turned violet while you were not paying attention.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STORY CHAPTERS — Alternating sticky layout
          ═══════════════════════════════════════ */}
      <section className="bg-[#E8E0D5]">
        {storyChapters.map((chapter, idx) => {
          const isLeft = chapter.align === 'left';
          const reveal = useScrollReveal();
          return (
            <div
              key={idx}
              ref={reveal.ref}
              className={`relative overflow-hidden transition-all duration-1000 ${reveal.visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Large background chapter number */}
              <div className={`absolute top-10 ${isLeft ? 'right-6 md:right-20' : 'left-6 md:left-20'} pointer-events-none select-none`}>
                <span className="font-serif italic text-[150px] md:text-[220px] text-[#0E0B08]/[0.03] leading-none">
                  {chapter.chapter}
                </span>
              </div>

              <div className="max-w-7xl mx-auto">
                <div className={`grid md:grid-cols-2 min-h-[80vh] ${isLeft ? '' : 'md:direction-rtl'}`}>
                  {/* Image side — sticky on desktop */}
                  <div className={`relative h-[50vh] md:h-auto md:sticky md:top-0 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-[#0E0B08]/10" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                      <p className="text-[9px] tracking-[0.35em] uppercase text-white/50 mb-1">Chapter</p>
                      <p className="font-serif italic text-2xl text-white/90">{chapter.chapter}</p>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`flex items-center px-6 md:px-16 py-20 md:py-32 ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="max-w-md">
                      <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-6">
                        — {chapter.label} —
                      </p>
                      <Ornament className="max-w-[120px] mb-8" />
                      <h2 className="font-serif italic text-3xl md:text-4xl lg:text-[42px] text-[#0E0B08] leading-tight mb-8">
                        {chapter.title}
                      </h2>
                      <div className="space-y-6">
                        {chapter.body.map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-[#4A3728]/75 text-base md:text-lg font-light leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-10 flex items-center gap-4">
                        <div className="w-12 h-px bg-[#1B4332]/20" />
                        <div className="w-2 h-2 border border-[#1B4332]/30 rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1px separator between chapters */}
              {idx < storyChapters.length - 1 && (
                <div className="h-px bg-[#0E0B08]/8 max-w-7xl mx-auto" />
              )}
            </div>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════
          VALUES — Dark bistro board, tight grid
          ═══════════════════════════════════════ */}
      <section className="py-28 bg-[#1B4332] text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,white 39px,white 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,white 39px,white 40px)'
          }}
        />

        <div
          ref={valuesReveal.ref}
          className={`max-w-7xl mx-auto px-6 relative transition-all duration-1000 ${valuesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">— What We Believe —</p>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-6">Three Simple Truths</h2>
            <Ornament light className="max-w-[180px] mx-auto" />
          </div>

          {/* Tight 1px gap grid */}
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#1B4332] p-10 md:p-12 group hover:bg-[#1B4332]/80 transition-colors duration-500 relative overflow-hidden"
              >
                {/* Large background number */}
                <span className="absolute -top-4 -right-4 font-serif italic text-[100px] text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
                  {val.number}
                </span>

                <p className="text-[9px] tracking-[0.35em] uppercase text-white/25 mb-6">{val.number}</p>
                <h3 className="font-serif italic text-2xl md:text-3xl text-white mb-4 leading-snug">
                  {val.title}
                </h3>
                <div className="w-8 h-px bg-[#D9CCB9]/30 mb-6 group-hover:w-16 transition-all duration-500" />
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE SPACE — Asymmetric masonry grid
          ═══════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#F5EFE3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#1B4332]/50 mb-3">— The Space —</p>
              <h2 className="font-serif italic text-4xl md:text-5xl text-[#0E0B08]">Built Around<br />What Was Already Here</h2>
            </div>
            <p className="text-[#4A3728]/60 text-sm font-light max-w-sm md:text-right leading-relaxed">
              We cleared the undergrowth, kept the old trees, and let the land tell us where the tables should go.
            </p>
          </div>

          {/* Masonry grid with 1px gaps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0E0B08]/10">
            {spaceImages.map((img, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden bg-[#F5EFE3] ${img.span} aspect-square ${idx === 0 ? 'md:aspect-auto' : ''}`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08]/80 via-[#0E0B08]/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-1">0{idx + 1}</p>
                  <p className="font-serif italic text-lg md:text-xl text-white/90">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUOTE — Full bleed, oversized typography
          ═══════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-[#D9CCB9] relative overflow-hidden">
        <div
          ref={quoteReveal.ref}
          className={`max-w-5xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${quoteReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Decorative giant quote mark */}
          <span className="block font-serif text-[140px] md:text-[200px] leading-none text-[#1B4332]/[0.05] select-none pointer-events-none mb-[-60px] md:mb-[-80px]">
            &ldquo;
          </span>

          <Ornament className="max-w-[140px] mx-auto mb-10" />

          <blockquote className="font-serif italic text-3xl md:text-5xl lg:text-[56px] text-[#0E0B08] leading-[1.1] mb-10">
            The best conversations<br className="hidden md:block" />
            happen when you forget<br className="hidden md:block" />
            <span className="text-[#1B4332]/70">you are in a restaurant.</span>
          </blockquote>

          <Ornament className="max-w-[140px] mx-auto mb-10" />

          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#1B4332]/20" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A3728]/50">
              A Regular Guest · 2024
            </p>
            <div className="w-8 h-px bg-[#1B4332]/20" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — Dark, minimal, powerful
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-28 md:py-36 bg-[#0E0B08] text-white relative overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif italic text-[200px] md:text-[350px] text-white/[0.015] leading-none">
            Visit
          </span>
        </div>

        <div
          ref={ctaReveal.ref}
          className={`max-w-4xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-white/15" />
            <div className="w-2 h-2 border border-white/25 rotate-45" />
            <div className="w-16 h-px bg-white/15" />
          </div>

          <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
            Come Find<br />
            <em className="text-[#D9CCB9] not-italic italic">Your Table.</em>
          </h2>

          <p className="text-white/40 text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed">
            Whether it is a Tuesday lunch or a Saturday sunset, we will keep a chair warm and a glass ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+94772217269"
              className="bg-[#1B4332] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#2D6A4F] transition flex items-center justify-center gap-3"
            >
              <Phone size={13} /> Call to Reserve
            </a>
            <a
              href="/"
              className="border border-white/25 text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-white/8 transition flex items-center justify-center gap-3"
            >
              Back to Home <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Info line */}
          <div className="mt-16 pt-10 border-t border-white/8 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-[10px] tracking-[0.2em] uppercase text-white/30">
            <span className="flex items-center gap-2.5">
              <Clock size={12} className="text-[#D9CCB9]/50" /> Every Day · 10 AM – 11 PM
            </span>
            <span className="hidden md:block w-px h-3 bg-white/10" />
            <span className="flex items-center gap-2.5">
              <MapPin size={12} className="text-[#D9CCB9]/50" /> Unala, Palatuwa, Matara
            </span>
            <span className="hidden md:block w-px h-3 bg-white/10" />
            <span className="flex items-center gap-2.5">
              <Phone size={12} className="text-[#D9CCB9]/50" /> +94 77 221 7269
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER — Consistent with homepage
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
                <li><a href="/#menu" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Menu</a></li>
                <li><a href="/#gallery" className="text-sm text-white/40 hover:text-white/80 transition font-light capitalize tracking-wide">Gallery</a></li>
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
                href="/contact"
                className="block text-center border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-white/8 transition w-full"
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