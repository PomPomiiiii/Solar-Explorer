import { motion, AnimatePresence } from "framer-motion";
import { PLANETS, SUN_DATA } from "../data/planets";

const allBodies = [SUN_DATA, ...PLANETS];

const containerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function StatGrid({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map((s) => (
        <motion.div key={s.label} variants={itemVariants} className="stat-item">
          <span className="stat-label">{s.label}</span>
          <span className="stat-value">{s.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function FunFact({ fact, index }) {
  return (
    <motion.div variants={itemVariants} className="fun-fact">
      <span className="fact-index">0{index + 1}</span>
      <p>{fact}</p>
    </motion.div>
  );
}

export default function PlanetInfo({ activeIndex }) {
  const body = allBodies[activeIndex];
  if (!body) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={body.id}
        className="planet-info"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants} className="planet-header">
          <div
            className="planet-dot"
            style={{ background: body.color, boxShadow: `0 0 20px ${body.color}66` }}
          />
          <motion.h1 className="planet-name">{body.name}</motion.h1>
        </motion.div>

        <motion.p variants={itemVariants} className="planet-description">
          {body.description}
        </motion.p>

        <motion.div variants={itemVariants} className="section-title">
          STATISTICS
        </motion.div>
        <StatGrid stats={body.stats} />

        <motion.div variants={itemVariants} className="section-title" style={{ marginTop: "1.5rem" }}>
          FUN FACTS
        </motion.div>
        <div className="fun-facts-list">
          {body.funFacts.map((fact, i) => (
            <FunFact key={i} fact={fact} index={i} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
