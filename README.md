# 🧬 Aetheris Dynamics — Biotech Animated Landing Page

A premium, state-of-the-art, animation-driven biotechnology landing page showcasing Next-Generation Synthetic Biology, AI Protein Folding, and Quantum Molecular Therapeutics.

![Aetheris Dynamics Hero](https://img.shields.io/badge/Status-Active_v4.8-00F2FE?style=for-the-badge&logo=dna)
![Tech Stack](https://img.shields.io/badge/Stack-Vite_%7C_React_%7C_TypeScript_%7C_Three.js_%7C_Tailwind-00FF9D?style=for-the-badge)

---

## ✨ Features & Interactive Highlights

### 1. 3D WebGL Double-Helix DNA Hero
* Built with **Three.js** and **React Three Fiber**.
* Renders an interactive double-helix DNA strand with nucleotide hydrogen bond indicators and glowing particle matrices.
* Features user drag rotation, rotation toggle (*PAUSE SPIN / ROTATE*), and 3 live bioluminescent color schemes (*Cyan Bioluminescence*, *Quantum Emerald*, *Deep Nucleus Purple*).

### 2. Interactive Bio-Network Node Graph (Innovation Section)
* Interactive node matrix highlighting core platforms (*De Novo Protein Design*, *Precision Epigenetic Editing*, *Targeted mRNA Delivery*, *Smart Nanoparticle Matrix*, *Quantum Docking Simulator*).
* Real-time spatial resolution, computational throughput diagnostics, and interconnected graph pathways.

### 3. Aether Lab Workbench (Virtual 3D Molecular Simulator)
* Real-time sliders adjusting:
  * **Thermal Stability Target (°C)**
  * **Target Receptor Affinity (%)**
  * **CRISPR Nickase Vector Index**
  * **Aqueous Solubility Index (%)**
* Dynamic **3D `LabMoleculeViewer`** that shifts atomic positions, emissive glow, and rotational velocity in response to parameter changes.
* Real-time calculation of binding free energy ($\Delta G$ in kcal/mol), cytotoxicity safety index, and predicted half-life.
* One-click presets (*Oncology Target ATH-882*, *Neuro Repair ATH-409*, *Viral Envelope ATH-104*).

### 4. Therapeutic Pipeline & Clinical Matrix
* Filterable clinical candidate matrix across 5 developmental stages (*Pre-Clinical*, *Phase I*, *Phase II*, *Phase III*, *FDA Review*).
* Detailed candidate dossier drawers with target molecules, primary indications, tissue tropism rates, and international trial hubs.

### 5. Animated Impact Statistics & Live Bio-Compute Telemetry
* Animated counters highlighting synthetic protein counts, velocity multipliers, and target specificity.
* Live diagnostic terminal feed streaming real-time quantum docking outputs and sequence validation logs.

### 6. Clinical Access Portal & Web Audio Synthesizer
* Interactive modal inquiry portal with instant form validation and submission confirmation.
* Custom **Web Audio API Sound FX Synthesizer** (subtle sci-fi UI blips for clicks and lab workbench interactions, fully toggleable).
* Sci-fi targeting reticle custom cursor follower for desktop users.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework & Build** | [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **3D & WebGL Graphics** | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphic CSS Design System |
| **Audio** | Web Audio API Synthesizer (`src/utils/audio.ts`) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd biotech-animated-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Scripts Overview

- `npm run dev` — Start Vite dev server on port 3000 with HMR.
- `npm run build` — Run TypeScript check (`tsc`) and compile production bundle into `dist/`.
- `npm run preview` — Serve the production build locally for verification.

---

## 📁 Project Structure

```
biotech-animated-landing-page/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind theme & keyframe extensions
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── src/
    ├── main.tsx                # React app mount entry point
    ├── App.tsx                 # Main layout & section orchestration
    ├── index.css               # Design system tokens, glassmorphism & grid backgrounds
    ├── utils/
    │   └── audio.ts            # Web Audio API sci-fi sound effects engine
    └── components/
        ├── CustomCursor.tsx    # Sci-Fi reticle mouse cursor follower
        ├── Navbar.tsx          # Scroll progress, audio toggle & mobile navigation
        ├── HeroSection.tsx     # Hero text, CTAs & 3D DNA integration
        ├── AboutInnovation.tsx # Interactive Bio-Network node graph
        ├── LabSimulator.tsx    # Interactive lab workbench with real-time sliders
        ├── PipelineSection.tsx # Therapeutic pipeline cards & candidate dossier modal
        ├── ImpactStats.tsx     # Impact counters & live compute telemetry log feed
        ├── FinalCTA.tsx        # CTA banner, sub-footer & Clinical Access Modal
        └── 3d/
            ├── HeroDnaCanvas.tsx    # 3D Double-Helix WebGL Canvas
            └── LabMoleculeViewer.tsx # 3D Lab molecular topology visualizer
```

---

## 🛡️ License

Created for **Aetheris Dynamics** / Capitova Ventures. All rights reserved.
