import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollNavigation(totalItems) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(null);

  const LOCK_MS = 1200; // must match camera transition duration

  const navigate = useCallback((dir) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= totalItems) {
        isScrolling.current = false;
        return prev;
      }
      return next;
    });
    setTimeout(() => { isScrolling.current = false; }, LOCK_MS);
  }, [totalItems]);

  const navigateTo = useCallback((index) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setActiveIndex(Math.max(0, Math.min(totalItems - 1, index)));
    setTimeout(() => { isScrolling.current = false; }, LOCK_MS);
  }, [totalItems]);

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(delta) > 30) navigate(delta > 0 ? 1 : -1);
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate]);

  return { activeIndex, navigateTo };
}