import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dna, CheckCircle2, Shield, Lock, Send, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FinalCTAProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  isModalOpen,
  onCloseModal,
  onOpenModal,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orgType, setOrgType] = useState('Pharmaceutical Partner');
  const [interest, setInterest] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    soundFX.playLabTune();
    setSubmitted(true);
    setTimeout(() => {
      // Keep modal feedback open briefly
    }, 1000);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setInterest('');
    setSubmitted(false);
    onCloseModal();
  };

  return (
    <footer className="relative bg-[#060911] pt-24 pb-12 overflow-hidden border-t border-slate-800/80">
      {/* Glow Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Call to Action Banner Box */}
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto border border-cyan-500/40 relative overflow-hidden mb-20">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICAL COLLABORATION PORTAL</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Accelerate Your <span className="text-gradient-green">Genomic Pipeline?</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto font-sans">
            Partner with Aetheris Dynamics to deploy proprietary AI protein folding models, custom mRNA payloads, and precision CRISPR vector suites.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenModal();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-600 text-slate-950 font-bold font-mono text-sm shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:shadow-[0_0_45px_rgba(0,255,157,0.8)] hover:scale-[1.03] transition-all flex items-center justify-center space-x-2"
            >
              <span>REQUEST CLINICAL ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Sub-Navigation & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-slate-800/80 items-center">
          
          <div className="md:col-span-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Dna className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-heading text-base font-bold text-white block">AETHERIS DYNAMICS</span>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">Precision Synthetic Biology</span>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-6 font-mono text-xs text-slate-400">
            <div className="flex items-center space-x-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>FDA 21 CFR Part 11</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>HIPAA & ISO 27001</span>
            </div>
            <span className="text-slate-700">|</span>
            <span>© {new Date().getFullYear()} Aetheris Dynamics Inc. All rights reserved.</span>
          </div>

        </div>

      </div>

      {/* Clinical Access Modal Portal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D1322] border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_60px_rgba(0,242,254,0.3)] relative overflow-hidden"
            >
              <button
                onClick={() => {
                  soundFX.playClick();
                  handleResetForm();
                }}
                className="absolute top-6 right-6 text-slate-400 hover:text-white font-mono text-xs"
              >
                [ CLOSE X ]
              </button>

              {!submitted ? (
                <>
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>CLINICAL PARTNERSHIP DOSSIER</span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Request Institutional Access
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mb-6">
                    Submit your research credentials to receive full pre-clinical datasets and high-resolution protein docking suites.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="text-slate-300 block mb-1">FULL NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Elena Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1">INSTITUTIONAL EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.vance@stanford.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1">ORGANIZATION CATEGORY</label>
                      <select
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 outline-none transition-colors"
                      >
                        <option>Pharmaceutical Partner</option>
                        <option>Academic Research Institute</option>
                        <option>Clinical Oncology Center</option>
                        <option>Venture Investor</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1">RESEARCH INTEREST / TARGET DISEASE</label>
                      <textarea
                        rows={3}
                        placeholder="Briefly state target receptors or therapeutic vector inquiries..."
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition-colors font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={() => soundFX.playHover()}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold font-mono text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,255,157,0.7)] transition-all mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT DOSSIER REQUEST</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Dossier Request Received
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Thank you, <span className="text-cyan-300 font-bold">{fullName}</span>. An encrypted access token and complete pre-clinical candidate files have been dispatched to <span className="text-cyan-300 font-bold">{email}</span>.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-mono text-xs border border-slate-800 transition-colors"
                  >
                    RETURN TO PLATFORM
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
