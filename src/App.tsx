import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutInnovation } from './components/AboutInnovation';
import { LabSimulator } from './components/LabSimulator';
import { PipelineSection } from './components/PipelineSection';
import { ImpactStats } from './components/ImpactStats';
import { FinalCTA } from './components/FinalCTA';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 relative overflow-hidden">
      {/* Sci-Fi Target Reticle Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Glassmorphism Navigation Bar */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section with 3D DNA WebGL Helix */}
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />

        {/* Innovation & Interactive Bio-Network Node Graph */}
        <AboutInnovation />

        {/* Technology & Interactive Virtual Lab Workbench */}
        <LabSimulator />

        {/* Clinical Trial & Capabilities Pipeline Matrix */}
        <PipelineSection />

        {/* Animated Impact Statistics & Live Bio-Compute Telemetry */}
        <ImpactStats />

        {/* Final CTA Banner & Clinical Access Modal Portal */}
        <FinalCTA
          isModalOpen={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </main>
    </div>
  );
};

export default App;
