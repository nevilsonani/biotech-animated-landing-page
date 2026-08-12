import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RefreshCw, Cpu, CheckCircle2, FlaskConical, AlertCircle } from 'lucide-react';
import { LabMoleculeViewer } from './3d/LabMoleculeViewer';
import { soundFX } from '../utils/audio';

export const LabSimulator: React.FC = () => {
  const [thermalStability, setThermalStability] = useState<number>(65);
  const [bindingAffinity, setBindingAffinity] = useState<number>(94);
  const [crisprVector, setCrisprVector] = useState<number>(85);
  const [solubility, setSolubility] = useState<number>(75);

  // Dynamic Bio-Compute Calculations
  const calculatedDeltaG = useMemo(() => {
    // Delta G formula approximation for virtual simulation
    const val = -8.5 - (bindingAffinity / 100) * 4.2 - (thermalStability / 100) * 1.5;
    return val.toFixed(2);
  }, [bindingAffinity, thermalStability]);

  const safetyIndex = useMemo(() => {
    const score = (solubility * 0.4) + (bindingAffinity * 0.4) + (100 - (thermalStability > 80 ? thermalStability - 50 : 20)) * 0.2;
    return Math.min(99.9, Math.max(60, score)).toFixed(1);
  }, [solubility, bindingAffinity, thermalStability]);

  const predictedHalfLife = useMemo(() => {
    const hours = (crisprVector * 1.8) + (thermalStability * 0.5);
    return Math.round(hours);
  }, [crisprVector, thermalStability]);

  const presetOncology = () => {
    soundFX.playLabTune();
    setThermalStability(72);
    setBindingAffinity(98);
    setCrisprVector(90);
    setSolubility(85);
  };

  const presetNeuro = () => {
    soundFX.playLabTune();
    setThermalStability(58);
    setBindingAffinity(92);
    setCrisprVector(95);
    setSolubility(60);
  };

  const presetViral = () => {
    soundFX.playLabTune();
    setThermalStability(84);
    setBindingAffinity(96);
    setCrisprVector(78);
    setSolubility(92);
  };

  return (
    <section id="lab-simulator" className="py-24 bg-bio-grid relative overflow-hidden">
      {/* Background ambient radial lights */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-4">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>AETHER LAB WORKBENCH v2.4</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive <span className="text-gradient-green">Molecular Synthesizer</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Adjust therapeutic candidate parameters to simulate real-time protein folding topology, binding free energy ($\Delta G$), and predicted pharmacokinetic safety profiles.
          </p>

          {/* Quick Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-xs text-slate-400 mr-2">PRESET VECTORS:</span>
            <button
              onClick={presetOncology}
              onMouseEnter={() => soundFX.playHover()}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-xs font-mono text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              ⚡ Oncology Target ATH-882
            </button>
            <button
              onClick={presetNeuro}
              onMouseEnter={() => soundFX.playHover()}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-purple-950 text-xs font-mono text-purple-300 border border-purple-500/30 transition-colors"
            >
              🧠 Neuro Repair ATH-409
            </button>
            <button
              onClick={presetViral}
              onMouseEnter={() => soundFX.playHover()}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-emerald-950 text-xs font-mono text-emerald-300 border border-emerald-500/30 transition-colors"
            >
              🛡️ Viral Envelope ATH-104
            </button>
          </div>
        </div>

        {/* Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>SYNTHETIC VARIABLE MATRIX</span>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setThermalStability(65);
                  setBindingAffinity(94);
                  setCrisprVector(85);
                  setSolubility(75);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                title="Reset Parameters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Parameter 1: Thermal Stability */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Thermal Stability Target (°C)</span>
                <span className="text-cyan-400 font-bold">{thermalStability}°C</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                value={thermalStability}
                onChange={(e) => setThermalStability(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>20°C (Ambient)</span>
                <span>55°C (Physiological)</span>
                <span>90°C (Hyperthermal)</span>
              </div>
            </div>

            {/* Parameter 2: Binding Affinity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Target Receptor Affinity (%)</span>
                <span className="text-emerald-400 font-bold">{bindingAffinity}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={bindingAffinity}
                onChange={(e) => setBindingAffinity(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50% (Moderate)</span>
                <span>85% (High)</span>
                <span>99% (Ultra-Selective)</span>
              </div>
            </div>

            {/* Parameter 3: CRISPR Delivery Vector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">CRISPR Nickase Vector Index</span>
                <span className="text-purple-400 font-bold">{crisprVector} / 100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={crisprVector}
                onChange={(e) => setCrisprVector(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Parameter 4: Aqueous Solubility */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Aqueous Solubility Index (%)</span>
                <span className="text-indigo-400 font-bold">{solubility}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={solubility}
                onChange={(e) => setSolubility(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            {/* Diagnostic Output Grid */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">BINDING ΔG</span>
                <span className="text-lg font-bold font-heading text-cyan-300 mt-1 block">
                  {calculatedDeltaG} <span className="text-[10px]">kcal/mol</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">SAFETY INDEX</span>
                <span className="text-lg font-bold font-heading text-emerald-400 mt-1 block">
                  {safetyIndex} / 100
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">IN VIVO HALF-LIFE</span>
                <span className="text-lg font-bold font-heading text-purple-300 mt-1 block">
                  {predictedHalfLife} <span className="text-[10px]">hrs</span>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic 3D Molecule Structural Visualizer */}
          <div className="lg:col-span-6 space-y-4">
            <LabMoleculeViewer
              thermalStability={thermalStability}
              bindingAffinity={bindingAffinity}
              crisprVector={crisprVector}
              solubility={solubility}
            />

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 flex items-start space-x-3 text-xs font-mono text-slate-300">
              <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-cyan-400 font-semibold block">QUALIFIED SYNTHESIS STATUS: OPTIMAL</span>
                <span>
                  Protein structure validates for automated mRNA liposome encapsulation with zero detected steric collisions.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
