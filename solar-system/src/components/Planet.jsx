import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ─── GLB model loader (used when planet has a modelPath) ───────────────────
function PlanetModel({ planet, meshRef }) {
  const { scene } = useGLTF(planet.modelPath);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.scale.setScalar(planet.size);
    return c;
  }, [scene, planet.size]);

  return <primitive ref={meshRef} object={cloned} />;
}

// ─── Fallback procedural sphere ────────────────────────────────────────────
function PlanetSphere({ planet, meshRef }) {
  return (
    <Sphere ref={meshRef} args={[planet.size, 64, 64]} castShadow receiveShadow>
      <meshStandardMaterial
        color={planet.color}
        emissive={planet.emissive}
        emissiveIntensity={["jupiter","saturn","uranus","neptune"].includes(planet.id) ? 0.05 : 0.12}
        roughness={planet.roughness ?? 0.8}
        metalness={planet.metalness ?? 0.05}
      />
    </Sphere>
  );
}

function SaturnRings({ color, size }) {
  return (
    <>
      <Torus args={[size * 1.6, size * 0.18, 2, 80]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </Torus>
      <Torus args={[size * 2.05, size * 0.12, 2, 80]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.45} side={THREE.DoubleSide} />
      </Torus>
      <Torus args={[size * 2.4, size * 0.08, 2, 80]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.22} side={THREE.DoubleSide} />
      </Torus>
    </>
  );
}

function UranusRings({ color, size }) {
  return (
    <Torus args={[size * 1.8, size * 0.055, 2, 60]} rotation={[0, 0, 0]}>
      <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
    </Torus>
  );
}

function CloudLayer({ size }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.004; });
  return (
    <Sphere ref={ref} args={[size * 1.018, 32, 32]}>
      <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
    </Sphere>
  );
}

function Glow({ color, size }) {
  return (
    <Sphere args={[size * 1.22, 32, 32]}>
      <meshBasicMaterial color={color} transparent opacity={0.07} side={THREE.BackSide} />
    </Sphere>
  );
}

// ─── Main Planet component ──────────────────────────────────────────────────
export default function Planet({ planet, index, registerPosition }) {
  const groupRef = useRef();
  const meshRef  = useRef();
  const angleRef = useRef(index * ((Math.PI * 2) / 8));

  // Register this group's ref so CameraController can snapshot its position
  useMemo(() => {
    if (registerPosition) registerPosition(index + 1, groupRef);
  }, [index, registerPosition]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Orbit
    angleRef.current += delta * planet.orbitSpeed;
    const x = Math.cos(angleRef.current) * planet.orbitRadius;
    const z = Math.sin(angleRef.current) * planet.orbitRadius;
    const y = Math.sin(angleRef.current * 0.5) * 0.25;
    groupRef.current.position.set(x, y, z);

    // Self-rotation
    if (meshRef.current) meshRef.current.rotation.y += delta * planet.rotationSpeed * 2;
  });

  const tilt = planet.id === "uranus" ? Math.PI / 2 : 0.15;
  const hasModel = Boolean(planet.modelPath);

  return (
    <group ref={groupRef}>
      <group rotation={[tilt, 0, 0]}>
        {hasModel
          ? <PlanetModel planet={planet} meshRef={meshRef} />
          : <PlanetSphere planet={planet} meshRef={meshRef} />
        }
        {planet.id === "earth" && <CloudLayer size={planet.size} />}
        {planet.id === "saturn" && planet.ringColor && <SaturnRings color={planet.ringColor} size={planet.size} />}
        {planet.id === "uranus" && planet.ringColor && <UranusRings color={planet.ringColor} size={planet.size} />}
      </group>
      <Glow color={planet.glowColor} size={planet.size} />
    </group>
  );
}