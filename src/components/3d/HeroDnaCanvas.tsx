import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface DnaMeshProps {
  isRotating: boolean;
  colorScheme: 'cyan' | 'emerald' | 'purple';
}

const DnaStrand: React.FC<DnaMeshProps> = ({ isRotating, colorScheme }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Define palette based on color scheme
  const colors = useMemo(() => {
    switch (colorScheme) {
      case 'emerald':
        return { primary: '#00FF9D', secondary: '#10B981', accent: '#00F2FE', rung: '#059669' };
      case 'purple':
        return { primary: '#C084FC', secondary: '#E024A5', accent: '#38BDF8', rung: '#7E22CE' };
      default: // cyan
        return { primary: '#00F2FE', secondary: '#00FF9D', accent: '#6366F1', rung: '#0284C7' };
    }
  }, [colorScheme]);

  // Generate 3D Helix parametric nodes and connecting base pair rungs
  const { nodes, rungs } = useMemo(() => {
    const numPairs = 30;
    const radius = 1.8;
    const heightStep = 0.35;
    const twistFactor = 0.45;

    const nodePositions: { pos1: [number, number, number]; pos2: [number, number, number]; colorIndex: number }[] = [];
    const rungData: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];

    for (let i = 0; i < numPairs; i++) {
      const y = (i - numPairs / 2) * heightStep;
      const angle = i * twistFactor;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      const pos1: [number, number, number] = [x1, y, z1];
      const pos2: [number, number, number] = [x2, y, z2];

      nodePositions.push({ pos1, pos2, colorIndex: i % 3 });
      rungData.push({
        start: pos1,
        end: pos2,
        color: i % 4 === 0 ? colors.primary : i % 4 === 1 ? colors.secondary : i % 4 === 2 ? colors.accent : colors.rung
      });
    }

    return { nodes: nodePositions, rungs: rungData };
  }, [colors]);

  // Generate background molecular particle field
  const particlePositions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={colors.primary}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* DNA Helix Backbones and Base Pairs */}
      {nodes.map((item, idx) => {
        const rung = rungs[idx];
        const midX = (rung.start[0] + rung.end[0]) / 2;
        const midY = (rung.start[1] + rung.end[1]) / 2;
        const midZ = (rung.start[2] + rung.end[2]) / 2;

        return (
          <group key={idx}>
            {/* Strand 1 Backbone Sphere Node */}
            <Sphere position={item.pos1} args={[0.16, 16, 16]}>
              <meshStandardMaterial
                color={idx % 2 === 0 ? colors.primary : colors.accent}
                emissive={idx % 2 === 0 ? colors.primary : colors.accent}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>

            {/* Strand 2 Backbone Sphere Node */}
            <Sphere position={item.pos2} args={[0.16, 16, 16]}>
              <meshStandardMaterial
                color={idx % 2 === 0 ? colors.secondary : colors.primary}
                emissive={idx % 2 === 0 ? colors.secondary : colors.primary}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>

            {/* Rung Connection Cylinder / Line Visual */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([...rung.start, ...rung.end]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={rung.color} linewidth={2} transparent opacity={0.7} />
            </line>

            {/* Nucleotide Hydrogen Bond Center Node */}
            <Sphere position={[midX, midY, midZ]} args={[0.07, 12, 12]}>
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

export const HeroDnaCanvas: React.FC = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [colorScheme, setColorScheme] = useState<'cyan' | 'emerald' | 'purple'>('cyan');

  return (
    <div className="relative w-full h-[500px] md:h-[640px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 group">
      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>WEBGL 3D: DNA_SYNTHESIS_MODEL</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setColorScheme('cyan')}
            className={`w-5 h-5 rounded-full bg-cyan-400 transition-transform ${colorScheme === 'cyan' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
            title="Cyan Bioluminescence"
          />
          <button
            onClick={() => setColorScheme('emerald')}
            className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${colorScheme === 'emerald' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
            title="Quantum Emerald"
          />
          <button
            onClick={() => setColorScheme('purple')}
            className={`w-5 h-5 rounded-full bg-purple-400 transition-transform ${colorScheme === 'purple' ? 'scale-125 ring-2 ring-white' : 'opacity-70'}`}
            title="Deep Nucleus Purple"
          />
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/30 transition-colors"
          >
            {isRotating ? 'PAUSE SPIN' : 'ROTATE'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Context */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F2FE" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#00FF9D" />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <DnaStrand isRotating={isRotating} colorScheme={colorScheme} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Interactive Helper Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[11px] font-mono text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">
        ✦ Drag to rotate 3D strand matrix ✦
      </div>
    </div>
  );
};
