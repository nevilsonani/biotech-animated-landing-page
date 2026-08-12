import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Terminal, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface LogItem {
  id: string;
  time: string;
  type: 'SUCCESS' | 'INFO' | 'CALC';
  message: string;
}

export const ImpactStats: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>([
    { id: '1', time: '11:19:02.4', type: 'SUCCESS', message: 'VQE Quantum Docking Converged: Binding ΔG = -12.4 kcal/mol' },
    { id: '2', time: '11:19:08.1', type: 'INFO', message: 'CRISPR Cas-14 nickase off-target genomic scan: 0 mutations detected' },
    { id: '3', time: '11:19:14.7', type: 'CALC', message: 'AlphaFold-3 Structural Tensor calculated for ATH-882 target ligand' },
    { id: '4', time: '11:19:22.0', type: 'SUCCESS', message: 'Lipid Nanoparticle encapsulation efficiency verified: 96.4%' },
  ]);

  useEffect(() => {
    // Periodically append live bio-compute telemetry logs
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${Math.floor(now.getMilliseconds() / 100)}`;

      const syntheticLogs: { type: LogItem['type']; message: string }[] = [
        { type: 'SUCCESS', message: 'Thermodynamic equilibrium confirmed for synthetic mRNA vector' },
        { type: 'CALC', message: 'Quantum cluster node #42 completed 10,000 ligand docking simulations' },
        { type: 'INFO', message: 'Streamed diagnostic telemetry to Clinical Phase II Monitoring System' },
        { type: 'SUCCESS', message: 'De Novo protein tertiary hinge stability verified at 55°C' },
      ];

      const chosen = syntheticLogs[Math.floor(Math.random() * syntheticLogs.length)];

      setLogs((prev) => [
        {
          id: String(Date.now()),
          time: timestamp,
          type: chosen.type,
          message: chosen.message,
        },
        ...prev.slice(0, 4),
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Synthetic Proteins Folded', value: '450+', subtext: 'Modeled with sub-angstrom accuracy', accent: 'text-cyan-400' },
    { label: 'Discovery Velocity', value: '14.2x', subtext: 'Faster than traditional wet labs', accent: 'text-emerald-400' },
    { label: 'Target Specificity', value: '99.9%', subtext: 'Zero detected off-target cytotoxicity', accent: 'text-purple-400' },
    { label: 'Clinical Phase II Vectors', value: '12', subtext: 'Actively advancing human trials', accent: 'text-indigo-400' },
  ];

  return (
    <section id="impact" className="py-24 bg-bio-grid relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>GLOBAL IMPACT & PERFORMANCE TELEMETRY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quantifiable <span className="text-gradient-cyan">Biomedical Breakthroughs</span>
          </h2>
        </div>

        {/* Big Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl p-6 border border-slate-800 text-center relative overflow-hidden group hover:border-cyan-500/30"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
              <span className={`font-heading text-4xl sm:text-5xl font-extrabold ${st.accent} tracking-tight block`}>
                {st.value}
              </span>
              <h3 className="font-heading font-semibold text-white text-base mt-2">
                {st.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                {st.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Live Bio-Compute Telemetry Feed Terminal */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="px-5 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-slate-200">
                LIVE COMPUTE CLUSTER TELEMETRY FEED // CLUSTER_US_EAST_01
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
          </div>

          <div className="p-5 font-mono text-xs space-y-2.5 min-h-[180px]">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-3 text-slate-300"
              >
                <span className="text-slate-500 flex-shrink-0">[{log.time}]</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                    log.type === 'SUCCESS'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : log.type === 'CALC'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                      : 'bg-purple-950 text-purple-400 border border-purple-500/30'
                  }`}
                >
                  {log.type}
                </span>
                <span className="line-clamp-1">{log.message}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
