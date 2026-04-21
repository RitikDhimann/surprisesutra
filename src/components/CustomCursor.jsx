import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BalloonIcon = ({ color, isHovering }) => (
  <motion.div
    animate={{ 
      rotate: [0, -5, 5, 0],
      y: [0, -4, 4, 0]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className="relative"
  >
    <svg width="50" height="100" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <defs>
        <radialGradient id="balloonGradient" cx="25%" cy="25%" r="75%" fx="25%" fy="25%">
          <stop offset="0%" stopColor="#a34b55" />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor="#4a1a20" />
        </radialGradient>
      </defs>
      {/* Balloon String (Wavy) */}
      <motion.path 
        d="M20 48 Q 20 60 15 70 T 20 90" 
        stroke="rgba(0,0,0,0.4)" 
        strokeWidth="1"
        animate={{ d: ["M20 48 Q 20 60 15 70 T 20 90", "M20 48 Q 25 60 20 70 T 25 90", "M20 48 Q 20 60 15 70 T 20 90"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Balloon Body - Moved down to cx=20, cy=25 to avoid clipping */}
      <ellipse 
        cx="20" cy="25" rx="18" ry="22" 
        fill="url(#balloonGradient)" 
      />
      {/* Balloon Knot */}
      <path d="M17 46 L20 50 L23 46 Z" fill="#4a1a20" />
      {/* Glossy Reflection */}
      <path 
        d="M10 15 A 10 12 0 0 1 12 23" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round" 
        opacity="0.3" 
      />
    </svg>
  </motion.div>
);


const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [trail, setTrail] = useState([]);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updatePosition = (e) => {
      let targetX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      let targetY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      
      if (targetX === undefined || targetY === undefined) return;

      const interactive = e.target.closest('button, a, [role="button"]');
      if (interactive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      cursorX.set(targetX - 20); // Center the balloon body
      cursorY.set(targetY - 20);
      setMousePosition({ x: targetX, y: targetY });

      if (Math.abs(targetX - mousePosition.x) > 10 || Math.abs(targetY - mousePosition.y) > 10) {
        const newTrailIdx = Date.now();
        setTrail(prev => [{ id: newTrailIdx, x: targetX, y: targetY }, ...prev].slice(0, 5));
      }
    };

    const handleDown = (e) => {
      setIsClicking(true);
      let targetX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      let targetY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      
      if (targetX === undefined || targetY === undefined) return;

      const colors = ['#FF6B6B', '#DD2A7B', '#8134AF', '#F58529'];
      const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: targetX,
        y: targetY,
        angle: (i * 45) * (Math.PI / 180),
        color: colors[i % colors.length],
        scale: Math.random() * 1.2 + 0.5
      }));
      setSparkles(prev => [...prev.slice(-16), ...newSparkles]);
    };

    const handleUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchmove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('touchstart', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', updatePosition);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [cursorX, cursorY, mousePosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (trail.length > 0) setTrail(prev => prev.slice(0, -1));
      if (sparkles.length > 0) setSparkles(prev => prev.slice(2));
    }, 150);
    return () => clearInterval(timer);
  }, [trail, sparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0, x: s.x, y: s.y }}
            animate={{ 
              opacity: 0, 
              scale: s.scale, 
              x: s.x + Math.cos(s.angle) * 80, 
              y: s.y + Math.sin(s.angle) * 80,
              rotate: 180
            }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{ color: s.color }}
          >
            <Sparkles fill="currentColor" size={10} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 will-change-transform pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.4 : (isHovering ? 0.8 : 0.5),
          filter: isHovering ? 'drop-shadow(0 0 12px rgba(180, 37, 51, 0.4))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
        }}
      >
        <BalloonIcon color="#b42533" isHovering={isHovering} />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
