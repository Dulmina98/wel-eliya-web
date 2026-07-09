'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export type NavItem = {
  label: string;
  href?: string;
  sectionId?: string;
};

interface NavbarProps {
  items: NavItem[];
  reserveAction: NavItem;
}

export const Navbar: React.FC<NavbarProps> = ({ items, reserveAction }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5EFE3]/96 backdrop-blur-md border-b border-[#0E0B08]/8' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <img
            src="/logo.svg"
            alt="Wel Eliya"
            className="h-14 transition-all duration-500"
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {items.map((item, idx) => {
            if (item.href) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-50 ${scrolled ? 'text-[#0E0B08]' : 'text-white'}`}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => item.sectionId && scrollToSection(item.sectionId)}
                className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-50 ${scrolled ? 'text-[#0E0B08]' : 'text-white'}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Reserve */}
        <div className="hidden md:flex">
          {reserveAction.href ? (
            <a
              href={reserveAction.href}
              className={`text-[11px] tracking-[0.22em] uppercase px-6 py-2.5 border transition-all ${scrolled
                ? 'border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white'
                : 'border-white/60 text-white hover:bg-white/10'
                }`}
            >
              {reserveAction.label}
            </a>
          ) : (
            <button
              onClick={() => reserveAction.sectionId && scrollToSection(reserveAction.sectionId)}
              className={`text-[11px] tracking-[0.22em] uppercase px-6 py-2.5 border transition-all ${scrolled
                ? 'border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white'
                : 'border-white/60 text-white hover:bg-white/10'
                }`}
            >
              {reserveAction.label}
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-[#0E0B08]' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5EFE3] border-t border-[#0E0B08]/10 px-6 py-8 space-y-6">
          {items.map((item, idx) => {
            if (item.href) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="block w-full text-left text-[11px] tracking-[0.22em] uppercase text-[#0E0B08]/60 hover:text-[#1B4332] transition"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => item.sectionId && scrollToSection(item.sectionId)}
                className="block w-full text-left text-[11px] tracking-[0.22em] uppercase text-[#0E0B08]/60 hover:text-[#1B4332] transition"
              >
                {item.label}
              </button>
            );
          })}
          {reserveAction.href ? (
            <a
              href={reserveAction.href}
              className="block w-full border border-[#1B4332] text-[#1B4332] py-3.5 text-[11px] tracking-[0.22em] uppercase mt-2 hover:bg-[#1B4332] hover:text-white transition text-center"
            >
              {reserveAction.label}
            </a>
          ) : (
            <button
              onClick={() => reserveAction.sectionId && scrollToSection(reserveAction.sectionId)}
              className="w-full border border-[#1B4332] text-[#1B4332] py-3.5 text-[11px] tracking-[0.22em] uppercase mt-2 hover:bg-[#1B4332] hover:text-white transition text-center"
            >
              {reserveAction.label}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
