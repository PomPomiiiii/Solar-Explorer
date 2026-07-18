import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export default function Sun({ registerSun }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const coronaRef = useRef();
  const corona2Ref = useRef();

  // Register group ref so CameraController can read its world position
  useMemo(() => {
    if (registerSun) registerSun(groupRef);
  }, [registerSun]);

  useFrame((state, delta) => {
    if (meshRef.current)   meshRef.current.rotation.y += delta * 0.005;
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.003;
      const p = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      coronaRef.current.scale.setScalar(p);
    }
    if (corona2Ref.current) {
      corona2Ref.current.rotation.z -= delta * 0.002;
      const p2 = 1 + Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.015;
      corona2Ref.current.scale.setScalar(p2);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[3.5, 64, 64]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF6600"
          emissiveIntensity={1.5}
          roughness={1}
          metalness={0}
        />
      </Sphere>
      <Sphere args={[3.85, 32, 32]}>
        <meshBasicMaterial color="#FF8800" transparent opacity={0.13} side={2} />
      </Sphere>
      <Sphere ref={coronaRef} args={[4.4, 32, 32]}>
        <meshBasicMaterial color="#FF6600" transparent opacity={0.07} side={2} />
      </Sphere>
      <Sphere ref={corona2Ref} args={[5.4, 32, 32]}>
        <meshBasicMaterial color="#FF4400" transparent opacity={0.035} side={2} />
      </Sphere>
      <pointLight position={[0,0,0]} intensity={4} distance={300} decay={1.2} color="#FFF5E0" castShadow />
    </group>
  );
}