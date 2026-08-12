import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Zap, Cpu, Atom, Layers, ChevronRight, Binary, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface BioNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  shortDesc: string;
  detailText: string;
  metrics: { label: string; value: string }[];
  connections: string[];
}

export const AboutInnovation: React.FC = () => {
  const nodes: BioNode[] = [
    {
      id: 'protein-folding',
      name: 'De Novo Protein Design',
      category: 'AI Bio-Compute',
      icon: <Atom className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Generative transformer models engineering novel 3D tertiary protein architectures.',
      detailText: 'Our proprietary neural engine models millions of synthetic amino acid sequences per second, predicting atomic binding pockets with sub-angstrom spatial accuracy.',
      metrics: [
        { label: 'Resolution', value: '0.02 Å' },
        { label: 'Compute Speed', value: '4.8 PFLOPS' },
      ],
      connections: ['crispr-epi', 'mrna-vectors'],
    },
    {
      id: 'crispr-epi',
      name: 'Precision Epigenetic Editing',
      category: 'Genomic Synthetics',
      icon: <Dna className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Programmable Cas-14 nickase complexes altering histone acetylation without DNA strand breaks.',
      detailText: 'Enables targeted transcriptional silencing and activation without double-stranded DNA breaks, dramatically mitigating off-target oncogenic mutations.',
      metrics: [
        { label: 'Off-Target Rate', value: '< 0.001%' },
        { label: 'Silencing Half-Life', value: '180+ Days' },
      ],
      connections: ['protein-folding', 'nano-carriers'],
    },
    {
      id: 'mrna-vectors',
      name: 'Targeted mRNA Delivery',
      category: 'Therapeutic Payload',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      shortDesc: 'Organ-tropic ionizable lipid nanoparticles delivering synthetic mRNA payloads.',
      detailText: 'Engineered cell surface receptor targeting ligands ensure 94%+ liver, pulmonary, and central nervous system tissue tropism with minimal systemic immune reaction.',
      metrics: [
        { label: 'Tissue Tropism', value: '94.2%' },
        { label: 'Payload Capacity', value: '12.5 kb' },
      ],
      connections: ['protein-folding', 'quantum-docking'],
    },
    {
      id: 'nano-carriers',
      name: 'Smart Nanoparticle Matrix',
      category: 'Bio-Materials',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      shortDesc: 'pH-responsive lipid envelopes releasing molecular cargo specifically within tumor microenvironments.',
      detailText: 'Biodegradable synthetic liposomes designed to cross blood-brain barriers via receptor-mediated transcytosis.',
      metrics: [
        { label: 'BBB Permeability', value: '78.4%' },
        { label: 'Half-Life Expansion', value: '4.2x' },
      ],
      connections: ['crispr-epi', 'quantum-docking'],
    },
    {
      id: 'quantum-docking',
      name: 'Quantum Docking Simulator',
      category: 'Molecular Physics',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      shortDesc: 'Quantum chemistry algorithms calculating electron density and van der Waals interactions.',
      detailText: 'Combines variational quantum eigensolvers (VQE) with GPU cluster simulation to map ligand binding thermodynamics in real time.',
      metrics: [
        { label: 'Thermodynamic Accuracy', value: '99.9%' },
        { label: 'Screening Throughput', value: '50M Molecules/day' },
      ],
      connections: ['mrna-vectors', 'nano-carriers'],
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>('protein-folding');

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section id="innovation" className="py-24 bg-[#060911] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
            <Binary className="w-3.5 h-3.5" />
            <span>CORE INNOVATION MATRIX</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Convergence of <span className="text-gradient-cyan">Quantum Physics</span> & Synthetic Genomics
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Click across our bio-engineering node graph to explore how we synthesize custom proteins, program epigenetic vectors, and accelerate drug discovery.
          </p>
        </div>

        {/* Interactive Bio-Network Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Node Selector Graph */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 flex items-center justify-between">
              <span>INTERACTIVE BIO-NODES</span>
              <span className="text-cyan-400">SELECT TO INSPECT</span>
            </div>

            {nodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const isConnected = activeNode.connections.includes(node.id);

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveNodeId(node.id);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.25)]'
                      : isConnected
                      ? 'bg-slate-950/80 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2.5 rounded-xl border ${
                        isActive ? 'bg-cyan-500/20 border-cyan-400' : 'bg-slate-900 border-slate-800'
                      }`}>
                        {node.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-heading font-semibold text-white text-base">
                            {node.name}
                          </h3>
                          {isConnected && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              LINKED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-sans mt-0.5 line-clamp-1">
                          {node.shortDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Node Deep Dive Readout Panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-cyan-500/30"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400">
                        {activeNode.icon}
                      </div>
                      <div>
                        <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                          {activeNode.category}
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {activeNode.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VALIDATED</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    {activeNode.detailText}
                  </p>

                  {/* Node Diagnostic Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {activeNode.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20">
                        <span className="text-xs font-mono text-slate-400 block">{m.label}</span>
                        <span className="text-xl font-bold font-heading text-cyan-300 mt-1 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interconnected Nodes Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">INTERCONNECTED GRAPH PATHWAYS:</span>
                  <div className="flex space-x-2">
                    {activeNode.connections.map((connId) => {
                      const connNode = nodes.find(n => n.id === connId);
                      return (
                        <button
                          key={connId}
                          onClick={() => {
                            soundFX.playClick();
                            setActiveNodeId(connId);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-emerald-400 border border-emerald-500/30 transition-colors"
                        >
                          → {connNode?.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
