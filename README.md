# 🪐 Solar Explorer

An immersive, cinematic 3D journey through our solar system built with React, Three.js, and Framer Motion. Scroll through space to explore all eight planets with realistic animations, detailed stats, and a premium space aesthetic.

![Solar Explorer Preview](https://img.shields.io/badge/status-live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Three.js](https://img.shields.io/badge/Three.js-r150-black) ![Vite](https://img.shields.io/badge/Vite-5-purple)

---

## ✨ Features

- **3D Solar System** — All 8 planets + the Sun rendered with Three.js via React Three Fiber
- **Cinematic Camera** — GSAP-powered smooth camera transitions between planets
- **Scroll Navigation** — Mouse wheel, touch swipe, and keyboard arrow key support
- **Procedural Fallback** — Each planet renders as a detailed sphere if no GLB is provided
- **Bloom & Glow Effects** — Post-processing bloom via `@react-three/postprocessing`
- **4,000 Star Field** — Animated starfield with random shooting stars
- **Planet Info Cards** — Glassmorphism cards with stats, descriptions, and fun facts
- **Framer Motion UI** — Staggered fade-in animations on all info panels
- **Fully Responsive** — Desktop sidebar layout + mobile bottom-sheet layout
- **Saturn & Uranus Rings** — Multi-band ring systems with realistic opacity
- **Earth Cloud Layer** — Separate rotating cloud sphere above Earth's surface

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/solar-explorer.git
cd solar-explorer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
solar-explorer/
├── public/
│   └── models/              # Place your .glb planet models here
│       ├── mercury.glb
│       ├── venus.glb
│       ├── earth.glb
│       ├── mars.glb
│       ├── jupiter.glb
│       ├── saturn.glb
│       ├── uranus.glb
│       └── neptune.glb
├── src/
│   ├── components/
│   │   ├── SolarSystem.jsx  # Canvas + scene composition
│   │   ├── Planet.jsx       # Planet mesh, GLB loader, rings, clouds, glow
│   │   ├── Sun.jsx          # Animated sun with corona + point light
│   │   ├── CameraController.jsx  # GSAP camera transitions
│   │   ├── Stars.jsx        # Starfield + shooting stars
│   │   ├── PlanetInfo.jsx   # Glassmorphism info panel
│   │   ├── Navigation.jsx   # Dot navigation sidebar
│   │   └── ScrollHint.jsx   # Scroll prompt + progress bar
│   ├── data/
│   │   └── planets.js       # All planet data, stats, fun facts, modelPaths
│   ├── hooks/
│   │   └── useScrollNavigation.js  # Wheel/touch/keyboard scroll logic
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

### Export from Blender

1. Open your planet model in Blender
2. Go to **File → Export → glTF 2.0 (.glb/.gltf)**
3. Use these settings:
   - Format: **GLB** (Binary)
   - ✅ Apply Modifiers
   - ✅ UVs
   - ✅ Normals
   - ✅ Materials
4. For best results, bake these texture maps in Blender before export:
   - **Color / Albedo** — surface photo or painted texture
   - **Normal map** — craters, ridges, surface detail
   - **Roughness map** — shiny oceans vs matte rock
   - **Emission map** — lava flows, city lights (Earth night side)

### Add to the Project

```
public/
└── models/
    └── earth.glb   ← place here
```

### Enable in `planets.js`

Each planet already has a commented `modelPath` line. Just uncomment it:

```js
{
  id: "earth",
  modelPath: "/models/earth.glb",   // ← uncomment this line
  color: "#2a7fd4",
  // ...
}
```

That's it. The planet will:
- Auto-center and auto-scale the GLB to fit the scene
- Show a pulsing wireframe placeholder while the model loads
- Fall back to the procedural sphere if the file is missing

You can enable planets one at a time as you finish modeling them.

---

## 🎮 Controls

| Input | Action |
|---|---|
| **Scroll wheel** | Navigate between planets |
| **Touch swipe** up/down | Navigate (mobile) |
| **Arrow keys** ↑ ↓ | Navigate between planets |
| **Nav dots** (right side) | Jump directly to any planet |

---

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [Three.js](https://threejs.org) | 3D rendering engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | Three.js helpers (Sphere, Torus, useGLTF) |
| [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | Bloom & glow effects |
| [Framer Motion](https://www.framer.com/motion/) | UI animations |
| [GSAP](https://gsap.com) | Camera transition tweens |

---

## 🌐 Deployment

This project is deployed on [Vercel](https://vercel.com). Any push to `main` triggers an automatic redeploy.

### Deploy Your Own

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your fork
4. Vercel auto-detects Vite with these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

---

## 📸 Planet Data Sources

All planetary statistics sourced from:
- [NASA Solar System Exploration](https://solarsystem.nasa.gov)
- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/planetfact.html)

---

## 📄 License

MIT — feel free to use this for your own projects.

---

<p align="center">Made with ☕ and a love for space exploration</p>
