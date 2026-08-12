import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Filter, Info, ExternalLink } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface Candidate {
  id: string;
  code: string;
  name: string;
  target: string;
  indication: string;
  domain: 'Oncology' | 'Neurology' | 'Immunology' | 'Genetic';
  phase: 'Pre-Clinical' | 'Phase I' | 'Phase II' | 'Phase III' | 'FDA Review';
  progress: number; // 0 to 100
  mechanism: string;
  trialLocations: string;
  biomarkerAffinity: string;
}

export const PipelineSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const candidates: Candidate[] = [
    {
      id: 'ath-882',
      code: 'ATH-882',
      name: 'OncoShield Epigenic',
      target: 'KRAS G12D / EGFR Mutants',
      indication: 'Metastatic Pancreatic & Non-Small Cell Lung Carcinoma',
      domain: 'Oncology',
      phase: 'Phase II',
      progress: 65,
      mechanism: 'Selective degradation of mutant oncogenic transcription factors via Cas-14 nickase mRNA complexes.',
      trialLocations: 'Memorial Sloan Kettering, MD Anderson, Charité Berlin',
      biomarkerAffinity: '99.8% Tumor-Specific Binding',
    },
    {
      id: 'ath-409',
      code: 'ATH-409',
      name: 'NeuroRegen Synth',
      target: 'Tau Oligomer / Alpha-Synuclein',
      indication: 'Early-Onset Alzheimer\'s & Parkinsonian Degeneration',
      domain: 'Neurology',
      phase: 'Phase II',
      progress: 58,
      mechanism: 'Receptor-mediated transferrin liposome delivery of de novo neurotrophic peptide ligands.',
      trialLocations: 'Johns Hopkins, Karolinska Institute, Tokyo University Hospital',
      biomarkerAffinity: '78.4% BBB Penetration Coefficient',
    },
    {
      id: 'ath-104',
      code: 'ATH-104',
      name: 'EpiRepair Vector',
      target: 'HTT CAG Repeat Epigenome',
      indication: 'Huntington\'s Disease & Hereditary Ataxias',
      domain: 'Genetic',
      phase: 'Phase I',
      progress: 35,
      mechanism: 'Targeted DNA methylation silencing of expanded trinucleotide repeats in striatal neurons.',
      trialLocations: 'Mayo Clinic, Great Ormond Street London',
      biomarkerAffinity: '< 0.001% Off-Target Genomic Cut Rate',
    },
    {
      id: 'ath-650',
      code: 'ATH-650',
      name: 'FibroStop Core',
      target: 'TGF-β1 Receptor Cascade',
      indication: 'Idiopathic Pulmonary Fibrosis & Cardiac Scar Remodeling',
      domain: 'Immunology',
      phase: 'Phase III',
      progress: 82,
      mechanism: 'Synthetic decoy microRNA sponge suppressing profibrotic fibroblast activation.',
      trialLocations: 'Stanford Health Care, Cleveland Clinic, Zurich University Hospital',
      biomarkerAffinity: '91.5% Reduction in Collagen Type I Deposition',
    },
    {
      id: 'ath-920',
      code: 'ATH-920',
      name: 'ImmunoToler Bio',
      target: 'FOXP3 Treg Promoter',
      indication: 'Severe Refractory Type 1 Diabetes & Lupus Nephritis',
      domain: 'Immunology',
      phase: 'Pre-Clinical',
      progress: 20,
      mechanism: 'Epigenetic reactivation of regulatory T-cell suppressive networks via synthetic mRNA.',
      trialLocations: 'Pre-Clinical Optimization at Aetheris Discovery Hub',
      biomarkerAffinity: '4.8x Expansion of Functional Treg Population',
    },
  ];

  const domains = ['All', 'Oncology', 'Neurology', 'Immunology', 'Genetic'];

  const filteredCandidates = candidates.filter(
    (c) => selectedDomain === 'All' || c.domain === selectedDomain
  );

  const getPhaseBadgeColor = (phase: Candidate['phase']) => {
    switch (phase) {
      case 'Pre-Clinical': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Phase I': return 'bg-indigo-950 text-indigo-300 border-indigo-500/30';
      case 'Phase II': return 'bg-cyan-950 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]';
      case 'Phase III': return 'bg-emerald-950 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(0,255,157,0.3)]';
      case 'FDA Review': return 'bg-purple-950 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <section id="pipeline" className="py-24 bg-[#060911] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>CLINICAL PIPELINE & CAPABILITIES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Therapeutic Candidate <span className="text-gradient-purple">Pipeline Matrix</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Track our proprietary bio-engineered therapeutics as they advance through pre-clinical validation and international human clinical trials.
            </p>
          </div>

          {/* Domain Filter Buttons */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block mr-1" />
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedDomain(domain);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  selectedDomain === domain
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate List Cards */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              whileHover={{ scale: 1.005 }}
              onClick={() => {
                soundFX.playClick();
                setSelectedCandidate(candidate);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="glass-panel rounded-2xl p-5 cursor-pointer transition-all border border-slate-800 hover:border-cyan-500/40"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Candidate Code & Name */}
                <div className="md:col-span-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                      {candidate.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {candidate.domain}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mt-1">
                    {candidate.name}
                  </h3>
                </div>

                {/* Target & Indication */}
                <div className="md:col-span-4">
                  <span className="text-[11px] font-mono text-slate-400 block">TARGET MOLECULE</span>
                  <span className="text-xs font-medium text-cyan-200 block truncate">{candidate.target}</span>
                  <span className="text-xs text-slate-400 block truncate mt-0.5">{candidate.indication}</span>
                </div>

                {/* Clinical Phase Stage */}
                <div className="md:col-span-3">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getPhaseBadgeColor(candidate.phase)}`}>
                      {candidate.phase}
                    </span>
                    <span className="text-slate-400">{candidate.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${candidate.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Details */}
                <div className="md:col-span-2 flex items-center justify-end">
                  <span className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 hover:text-white transition-colors">
                    <span>INSPECT DOSSIER</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Candidate Modal Drawer */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0D1322] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,242,254,0.25)] space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-cyan-400 px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40">
                    {selectedCandidate.code}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {selectedCandidate.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-slate-400 hover:text-white font-mono text-xs p-1"
                >
                  [ CLOSE X ]
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">PRIMARY INDICATION</span>
                  <p className="text-sm font-semibold text-white mt-1">{selectedCandidate.indication}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block">BIOLOGICAL MECHANISM OF ACTION</span>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedCandidate.mechanism}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block">AFFINITY PROFILE</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">{selectedCandidate.biomarkerAffinity}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block">DEVELOPMENT PHASE</span>
                    <span className="text-sm font-bold text-cyan-300 mt-1 block">{selectedCandidate.phase} ({selectedCandidate.progress}%)</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block">PRIMARY CLINICAL TRIAL HUBS</span>
                  <p className="text-xs font-mono text-slate-300 mt-1">{selectedCandidate.trialLocations}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs hover:bg-slate-800 transition-colors"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
