import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ShootingStar() {
  const ref = useRef();
  const dataRef = useRef({
    active: false,
    timer: Math.random() * 8,
    interval: 6 + Math.random() * 10,
    startX: 0,
    startY: 0,
    startZ: 0,
    dx: 0,
    dy: 0,
    progress: 0,
  });

  useFrame((_, delta) => {
    const d = dataRef.current;
    d.timer += delta;

    if (!d.active) {
      if (d.timer > d.interval) {
        d.active = true;
        d.timer = 0;
        d.progress = 0;
        d.interval = 6 + Math.random() * 10;
        d.startX = (Math.random() - 0.5) * 80;
        d.startY = 20 + Math.random() * 20;
        d.startZ = -30 - Math.random() * 20;
        d.dx = (Math.random() - 0.5) * 40;
        d.dy = -(20 + Math.random() * 20);
      }
    } else {
      d.progress += delta * 0.6;
      if (d.progress >= 1) {
        d.active = false;
        ref.current.visible = false;
        return;
      }
      ref.current.visible = true;
      ref.current.position.set(
        d.startX + d.dx * d.progress,
        d.startY + d.dy * d.progress,
        d.startZ
      );
      const fade =
        d.progress < 0.2
          ? d.progress / 0.2
          : d.progress > 0.7
          ? 1 - (d.progress - 0.7) / 0.3
          : 1;
      ref.current.material.opacity = fade * 0.9;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.03, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} />
    </mesh>
  );
}

export default function Stars() {
  const starsRef = useRef();

  const [positions, sizes, colors] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const starColors = [
      [1.0, 1.0, 1.0],
      [0.9, 0.95, 1.0],
      [1.0, 0.9, 0.8],
      [0.8, 0.9, 1.0],
      [1.0, 0.95, 0.7],
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 120;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() < 0.05 ? 2.5 : 0.4 + Math.random() * 1.2;
      const c = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    return [positions, sizes, colors];
  }, []);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
        />
      </points>
      {Array.from({ length: 6 }, (_, i) => (
        <ShootingStar key={i} />
      ))}
    </>
  );
}
