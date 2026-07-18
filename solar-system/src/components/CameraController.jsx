import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

// Fixed offset from planet center — camera sits here relative to the planet
const CAM_OFFSETS = [
  { x: 0, y: 3,   z: 14  }, // Sun
  { x: 0, y: 1.5, z: 4   }, // Mercury
  { x: 0, y: 2,   z: 5.5 }, // Venus
  { x: 0, y: 2,   z: 5.5 }, // Earth
  { x: 0, y: 1.5, z: 4.5 }, // Mars
  { x: 0, y: 4,   z: 13  }, // Jupiter
  { x: 0, y: 5,   z: 16  }, // Saturn
  { x: 0, y: 3,   z: 10  }, // Uranus
  { x: 0, y: 3,   z: 10  }, // Neptune
];

export default function CameraController({ activeIndex, getPlanetPosition }) {
  const { camera } = useThree();

  // These are the SINGLE source of truth for where the camera is going.
  // We do NOT use lerp in useFrame — GSAP owns the values directly.
  const camPos = useRef(new THREE.Vector3(0, 3, 14));
  const lookPos = useRef(new THREE.Vector3(0, 0, 0));
  const tweenObj = useRef({ cx: 0, cy: 3, cz: 14, lx: 0, ly: 0, lz: 0 });
  const tweenRef = useRef(null);
  const prevIndex = useRef(-1);

  // Set camera to initial position immediately on mount
  useEffect(() => {
    camera.position.set(0, 3, 14);
    camera.lookAt(0, 0, 0);
    tweenObj.current = { cx: 0, cy: 3, cz: 14, lx: 0, ly: 0, lz: 0 };
  }, [camera]);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    prevIndex.current = activeIndex;

    // Get world position of target planet RIGHT NOW (snapshot, not reactive)
    const planetPos = getPlanetPosition(activeIndex);
    const offset = CAM_OFFSETS[activeIndex] ?? { x: 0, y: 2, z: 8 };

    const targetCam = {
      cx: planetPos.x + offset.x,
      cy: planetPos.y + offset.y,
      cz: planetPos.z + offset.z,
    };
    const targetLook = { lx: planetPos.x, ly: planetPos.y, lz: planetPos.z };

    // Kill any in-progress tween
    if (tweenRef.current) tweenRef.current.kill();

    // Snapshot current values into tweenObj so GSAP starts from exactly here
    tweenObj.current.cx = camera.position.x;
    tweenObj.current.cy = camera.position.y;
    tweenObj.current.cz = camera.position.z;
    tweenObj.current.lx = lookPos.current.x;
    tweenObj.current.ly = lookPos.current.y;
    tweenObj.current.lz = lookPos.current.z;

    tweenRef.current = gsap.to(tweenObj.current, {
      ...targetCam,
      ...targetLook,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        // GSAP writes directly — useFrame just reads
        camPos.current.set(tweenObj.current.cx, tweenObj.current.cy, tweenObj.current.cz);
        lookPos.current.set(tweenObj.current.lx, tweenObj.current.ly, tweenObj.current.lz);
      },
    });
  }, [activeIndex, getPlanetPosition, camera]);

  // useFrame ONLY applies the values GSAP has written — no extra lerp
  useFrame(() => {
    camera.position.copy(camPos.current);
    camera.lookAt(lookPos.current);
  });

  return null;
}