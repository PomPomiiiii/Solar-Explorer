import { motion, AnimatePresence } from "framer-motion";

export default function ScrollHint({ visible, activeIndex, total }) {
  const progress = activeIndex / (total - 1);

  return (
    <>
      <AnimatePresence>
        {visible && activeIndex === 0 && (
          <motion.div
            className="scroll-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="scroll-icon">
              <motion.div
                className="scroll-dot"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <span>Scroll to explore</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="progress-bar-container">
        <motion.div
          className="progress-bar-fill"
          animate={{ scaleY: progress }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="body-counter">
        <motion.span
          key={activeIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="counter-current"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
        <span className="counter-sep"> / </span>
        <span className="counter-total">{String(total).padStart(2, "0")}</span>
      </div>
    </>
  );
}
