import { useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Stars from "./Stars";
import Sun from "./Sun";
import Planet from "./Planet";
import CameraController from "./CameraController";
import { PLANETS } from "../data/planets";

export default function SolarSystem({ activeIndex }) {
  // Store refs to each planet group — index 0 = Sun, 1-8 = planets
  // These are refs-to-refs: planetRefs[i].current = the THREE.Group
  const sunRef = useRef();
  const planetRefs = useRef({}); // { 0: sunRef, 1: groupRef, ... }

  // Sun registers itself
  const registerSun = useCallback((ref) => {
    planetRefs.current[0] = ref;
  }, []);

  // Each planet registers its group ref by body-index (1-8)
  const registerPosition = useCallback((bodyIndex, ref) => {
    planetRefs.current[bodyIndex] = ref;
  }, []);

  // CameraController calls this to snapshot a planet's current world position
  const getPlanetPosition = useCallback((bodyIndex) => {
    const ref = planetRefs.current[bodyIndex];
    if (ref?.current) {
      const pos = new THREE.Vector3();
      ref.current.getWorldPosition(pos);
      return pos;
    }
    return new THREE.Vector3(0, 0, 0);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 3, 14], fov: 60, near: 0.1, far: 1000 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#000005" }}
    >
      <ambientLight intensity={0.06} />
      <fog attach="fog" args={["#000005", 90, 240]} />

      <Stars />

      <Sun groupRef={sunRef} registerSun={registerSun} />

      {PLANETS.map((planet, i) => (
        <Planet
          key={planet.id}
          planet={planet}
          index={i}
          registerPosition={registerPosition}
        />
      ))}

      <CameraController
        activeIndex={activeIndex}
        getPlanetPosition={getPlanetPosition}
      />

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}