import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [trail, setTrail] = useState([]);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updatePosition = (e) => {
      let targetX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      let targetY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      
      if (targetX === undefined || targetY === undefined) return;

      const interactive = e.target.closest('button, a');
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        targetX += (centerX - targetX) * 0.15;
        targetY += (centerY - targetY) * 0.15;
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      cursorX.set(targetX - 16);
      cursorY.set(targetY - 16);
      setMousePosition({ x: targetX, y: targetY });

      // Add to trail
      if (Math.abs(targetX - mousePosition.x) > 5 || Math.abs(targetY - mousePosition.y) > 5) {
        const newTrailIdx = Date.now();
        setTrail(prev => [{ id: newTrailIdx, x: targetX, y: targetY }, ...prev].slice(0, 8));
      }
    };

    const handleDown = (e) => {
      setIsClicking(true);
      let targetX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      let targetY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      
      if (targetX === undefined || targetY === undefined) return;

      const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43'];
      const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: targetX,
        y: targetY,
        angle: (i * 30) * (Math.PI / 180),
        color: colors[i % colors.length],
        scale: Math.random() * 1.5 + 0.5
      }));
      setSparkles(prev => [...prev.slice(-24), ...newSparkles]);
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
      if (sparkles.length > 0) setSparkles(prev => prev.slice(4));
    }, 100);
    return () => clearInterval(timer);
  }, [trail, sparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {trail.map((point, i) => (
        <motion.div
            key={point.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            className="absolute rounded-full bg-brand-primary"
            style={{
                left: point.x - 2,
                top: point.y - 2,
                width: 4,
                height: 4,
                filter: 'blur(1px)',
                opacity: (8 - i) / 20
            }}
        />
      ))}

      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0, x: s.x, y: s.y }}
            animate={{ 
              opacity: 0, 
              scale: s.scale, 
              x: s.x + Math.cos(s.angle) * 100, 
              y: s.y + Math.sin(s.angle) * 100,
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{ color: s.color }}
          >
            <Star fill="currentColor" size={12} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-primary/20 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicking ? 0.8 : (isHovering ? 2.2 : 1),
          borderColor: isHovering ? 'rgba(255, 107, 107, 1)' : 'rgba(255, 107, 107, 0.2)',
          backgroundColor: isHovering ? 'rgba(255, 107, 107, 0.05)' : 'transparent'
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
            >
              <Sparkles className="text-brand-primary animate-pulse" size={12} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(255,107,107,0.5)]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 2 : 1,
        }}
      />
    </div>
  );
};

export default CustomCursor;
