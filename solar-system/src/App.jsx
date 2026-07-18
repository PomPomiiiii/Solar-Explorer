import { Suspense } from "react";
import SolarSystem from "./components/SolarSystem";
import PlanetInfo from "./components/PlanetInfo";
import Navigation from "./components/Navigation";
import ScrollHint from "./components/ScrollHint";
import { useScrollNavigation } from "./hooks/useScrollNavigation";
import { PLANETS } from "./data/planets";
import "./App.css";

const TOTAL = PLANETS.length + 1;

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-orb" />
      <p className="loading-text">Initializing Solar System…</p>
    </div>
  );
}

export default function App() {
  const { activeIndex, navigateTo } = useScrollNavigation(TOTAL);

  return (
    <div className="app">
      <Suspense fallback={<LoadingScreen />}>
        <div className="canvas-wrapper">
          <SolarSystem activeIndex={activeIndex} />
        </div>
      </Suspense>

      <header className="site-header">
        <div className="logo">
          <span className="logo-dot" />
          SOLAR<strong>EXPLORER</strong>
        </div>
      </header>

      <PlanetInfo activeIndex={activeIndex} />

      <Navigation activeIndex={activeIndex} onNavigate={navigateTo} />

      <ScrollHint
        visible={activeIndex === 0}
        activeIndex={activeIndex}
        total={TOTAL}
      />
    </div>
  );
}
