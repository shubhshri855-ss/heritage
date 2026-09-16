import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const NUM_CIRCLES = 100;

const CustomCursor = () => {
  const cursorRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = cursorRefs.current;

    circles.forEach(circle => {
      if (circle) {
        circle.x = 0;
        circle.y = 0;
      }
    });

    const handleMouseMove = e => {
      coords.x = e.clientX;
      coords.y = e.clientY;
      if (containerRef.current && containerRef.current.style.opacity !== '1') {
        containerRef.current.style.opacity = 1;
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationId;
    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        if (!circle) return;
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.x = x;
        circle.y = y;
        circle.style.scale = (circles.length - index) / circles.length;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.1;
        y += (nextCircle.y - y) * 0.1;
      });

      animationId = requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
      {Array.from({ length: NUM_CIRCLES }).map((_, i) => (
        <div
          className="cursor"
          key={i}
          ref={el => (cursorRefs.current[i] = el)}
        ></div>
      ))}
    </div>
  );
};

export default CustomCursor;
