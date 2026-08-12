import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowRight, Activity, Terminal } from 'lucide-react';
import { HeroDnaCanvas } from './3d/HeroDnaCanvas';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-bio-grid">
      {/* Glow Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Live Bio-Compute Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>SYNTHETIC BIOLOGY v4.8 ACTIVE</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">AI DE NOVO FOLDING</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting Next-Gen{' '}
              <span className="text-gradient-cyan">Genomic Synthetics</span> & Bio-Quantum Intelligence
            </h1>

            {/* Hero Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
              Aetheris Dynamics converges quantum bio-computing, CRISPR epigenetics, and deep neural protein folding to engineer targeted molecular therapeutics in days, not decades.
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenModal();
                }}
                onMouseEnter={() => soundFX.playHover()}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-600 text-slate-950 font-bold font-mono text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,255,157,0.7)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
              >
                <span>REQUEST CLINICAL DOSSIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#lab-simulator"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-cyan-500/20 hover:border-cyan-500/50 font-mono text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>LAUNCH LAB WORKBENCH</span>
              </a>
            </div>

            {/* Quick Live Telemetry Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center space-x-1 text-cyan-400 text-xs font-mono">
                  <Activity className="w-3.5 h-3.5" />
                  <span>AFFINITY</span>
                </div>
                <div className="text-xl font-bold font-heading text-white mt-1">99.8%</div>
                <div className="text-[10px] text-slate-400">Target Specificity</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center space-x-1 text-emerald-400 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>VELOCITY</span>
                </div>
                <div className="text-xl font-bold font-heading text-white mt-1">14.2x</div>
                <div className="text-[10px] text-slate-400">Discovery Speed</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center space-x-1 text-purple-400 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TRIALS</span>
                </div>
                <div className="text-xl font-bold font-heading text-white mt-1">12 Phase II</div>
                <div className="text-[10px] text-slate-400">Active Pipeline</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive WebGL DNA Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <HeroDnaCanvas />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
