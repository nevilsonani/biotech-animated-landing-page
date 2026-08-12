import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface LabMoleculeViewerProps {
  thermalStability: number; // 20 to 90 °C
  bindingAffinity: number;  // 50 to 99 %
  crisprVector: number;     // 10 to 100
  solubility: number;       // 10 to 100 %
}

interface AtomNode {
  position: [number, number, number];
  radius: number;
  color: string;
  label: string;
}

const MoleculeCluster: React.FC<LabMoleculeViewerProps> = ({
  thermalStability,
  bindingAffinity,
  crisprVector,
  solubility,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Normalize parameters to 3D modifiers
  const speed = useMemo(() => (thermalStability / 50) * 0.5, [thermalStability]);
  const scaleFactor = useMemo(() => 0.8 + (crisprVector / 100) * 0.4, [crisprVector]);
  const glowIntensity = useMemo(() => (bindingAffinity / 100) * 1.5, [bindingAffinity]);
  const particleSpread = useMemo(() => 1 + (solubility / 100) * 0.8, [solubility]);

  // Construct molecular atom nodes & bonds
  const { atoms, bonds } = useMemo(() => {
    const rawAtoms: AtomNode[] = [
      { position: [0, 0, 0], radius: 0.5, color: '#00F2FE', label: 'C-0' }, // Core Carbon
      { position: [1.2 * particleSpread, 0.8, 0.4], radius: 0.35, color: '#00FF9D', label: 'N-1' },
      { position: [-1.2 * particleSpread, -0.6, -0.5], radius: 0.38, color: '#E024A5', label: 'O-2' },
      { position: [0.5, -1.3 * particleSpread, 0.8], radius: 0.32, color: '#A855F7', label: 'S-3' },
      { position: [-0.7, 1.4 * particleSpread, -0.6], radius: 0.36, color: '#38BDF8', label: 'P-4' },
      { position: [1.8 * particleSpread, -0.9, -0.2], radius: 0.28, color: '#00FF9D', label: 'N-5' },
      { position: [-1.9 * particleSpread, 0.7, 0.6], radius: 0.25, color: '#F43F5E', label: 'H-6' },
      { position: [0.9, 1.8 * particleSpread, 1.1], radius: 0.28, color: '#00F2FE', label: 'C-7' },
    ];

    const rawBonds: { start: [number, number, number]; end: [number, number, number] }[] = [
      { start: [0, 0, 0], end: [1.2 * particleSpread, 0.8, 0.4] },
      { start: [0, 0, 0], end: [-1.2 * particleSpread, -0.6, -0.5] },
      { start: [0, 0, 0], end: [0.5, -1.3 * particleSpread, 0.8] },
      { start: [0, 0, 0], end: [-0.7, 1.4 * particleSpread, -0.6] },
      { start: [1.2 * particleSpread, 0.8, 0.4], end: [1.8 * particleSpread, -0.9, -0.2] },
      { start: [-1.2 * particleSpread, -0.6, -0.5], end: [-1.9 * particleSpread, 0.7, 0.6] },
      { start: [-0.7, 1.4 * particleSpread, -0.6], end: [0.9, 1.8 * particleSpread, 1.1] },
    ];

    return { atoms: rawAtoms, bonds: rawBonds };
  }, [particleSpread]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      {/* Chemical Bonds */}
      {bonds.map((bond, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...bond.start, ...bond.end]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00F2FE" transparent opacity={0.6} linewidth={2} />
        </line>
      ))}

      {/* Atomic Spheres */}
      {atoms.map((atom, idx) => (
        <Sphere key={idx} position={atom.position} args={[atom.radius, 24, 24]}>
          <meshStandardMaterial
            color={atom.color}
            emissive={atom.color}
            emissiveIntensity={glowIntensity}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      ))}
    </group>
  );
};

export const LabMoleculeViewer: React.FC<LabMoleculeViewerProps> = (props) => {
  return (
    <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl bg-slate-950/90 border border-cyan-500/20 overflow-hidden">
      {/* Diagnostics Visual HUD Overlay */}
      <div className="absolute top-3 left-3 z-10 font-mono text-[11px] text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded border border-cyan-500/30">
        STRUCTURAL SIMULATION: ACTIVE
      </div>

      <div className="absolute bottom-3 left-3 z-10 font-mono text-[11px] text-slate-400">
        SPECTRA: {props.thermalStability}°C | AFFINITY: {props.bindingAffinity}%
      </div>

      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00F2FE" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00FF9D" />

        <MoleculeCluster {...props} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
