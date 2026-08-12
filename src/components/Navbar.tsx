import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.setEnabled(nextState);
    if (nextState) {
      soundFX.playClick();
    }
  };

  const navItems = [
    { label: 'Innovation', href: '#innovation' },
    { label: 'Technology', href: '#technology' },
    { label: 'Lab Workbench', href: '#lab-simulator' },
    { label: 'Capabilities', href: '#pipeline' },
    { label: 'Impact', href: '#impact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060911]/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/30'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Glow Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              AETHERIS <span className="text-cyan-400 font-normal">DYNAMICS</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase -mt-1">
              Genomic Bio-Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Sound FX Toggle Button */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFX.playHover()}
            className={`p-2 rounded-full border transition-all ${
              soundEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(0,255,157,0.3)]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Mute Sci-Fi Sound FX' : 'Enable Sci-Fi Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Launch Portal CTA */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenModal();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="relative group overflow-hidden rounded-full p-[1px] font-mono text-xs font-semibold"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500 rounded-full animate-pulse-glow" />
            <span className="relative px-5 py-2.5 rounded-full bg-slate-950 flex items-center space-x-2 text-cyan-300 group-hover:text-white group-hover:bg-slate-900 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>REQUEST ACCESS</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border ${
              soundEnabled ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-slate-200 hover:text-cyan-400 py-1 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                    onOpenModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>REQUEST ACCESS PORTAL</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
