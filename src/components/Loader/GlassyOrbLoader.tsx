import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './GlassyOrbLoader.scss';

export const GlassyOrbLoader = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 1) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const radius = 180;
  const satellites = Array.from({ length: 7 }, (_, i) => i * (360 / 7));

  return (
    <div className="orb-backdrop">
      <motion.div
        className="orb-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="orb-core"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        />
        {satellites.map((deg, i) => {
          const rad = ((deg + angle) * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          const baseX = 150 + x;
          const baseY = 150 + y;

          return (
            <motion.div
              key={i}
              className="orb-satellite"
              style={{
                top: baseY - 10,
                left: baseX - 10,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

// export default GlassyOrbLoader;
