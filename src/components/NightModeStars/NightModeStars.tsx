import React, { useEffect, useState } from 'react';
import styles from './NightModeStars.module.scss';

export const NightModeStars: React.FC = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();

      setIsNight(hour >= 20 || hour <= 7);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!isNight) {
    return null;
  }

  return (
    <div className={styles.stars}>
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};
