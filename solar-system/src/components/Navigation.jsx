import { motion } from "framer-motion";
import { PLANETS, SUN_DATA } from "../data/planets";

const allBodies = [SUN_DATA, ...PLANETS];

export default function Navigation({ activeIndex, onNavigate }) {
  return (
    <nav className="nav-sidebar">
      {allBodies.map((body, i) => (
        <motion.button
          key={body.id}
          className={`nav-dot-wrapper ${activeIndex === i ? "active" : ""}`}
          onClick={() => onNavigate(i)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          title={body.name}
        >
          <div
            className="nav-dot"
            style={{
              background: activeIndex === i ? body.color : "rgba(255,255,255,0.2)",
              boxShadow: activeIndex === i ? `0 0 12px ${body.color}` : "none",
            }}
          />
          <motion.span
            className="nav-label"
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: activeIndex === i ? 1 : 0,
              x: activeIndex === i ? 0 : -8,
            }}
            transition={{ duration: 0.2 }}
          >
            {body.name}
          </motion.span>
        </motion.button>
      ))}
    </nav>
  );
}
