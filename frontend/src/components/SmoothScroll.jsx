import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Decreased for snappier, optimized feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Mobile native scroll is usually preferred
      touchMultiplier: 2,
    });

    // Make lenis globally available for GSAP ScrollTrigger if needed later
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Instantly scroll to top on page navigation
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
