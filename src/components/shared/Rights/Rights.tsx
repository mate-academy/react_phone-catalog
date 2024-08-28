// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import AppleIcon from '@mui/icons-material/Apple';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';

export const RightsPage = () => {
  const { isSunSelected } = useContext(GlobalContext);

  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
  });

  const generateRandomDirection = () => {
    const randomX = Math.random() * 400 - 200;
    const randomY = Math.random() * 400 - 200;

    return {
      x: [0, randomX, randomX * -1, 0],
      y: [0, randomY, randomY * -1, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'loop' as const,
        duration: Math.random() * 5 + 5,
        ease: 'easeInOut',
      },
    };
  };

  const iconSizes = ['2rem', '3rem', '4rem', '5rem'];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        backgroundColor: isSunSelected ? 'white' : '#0F1121',
      }}
    >
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            ...generateRandomPosition(),
            fontSize: iconSizes[Math.floor(Math.random() * iconSizes.length)],
            color: isSunSelected ? '#000' : '#fff',
          }}
          animate={generateRandomDirection()}
        >
          <AppleIcon />
        </motion.div>
      ))}

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          border: isSunSelected ? '2px solid black' : '2px solid white',
          borderRadius: '10px',
          backgroundColor: isSunSelected
            ? 'rgba(255, 255, 255, 0.8)'
            : ' rgba(50, 53, 66, 0.8)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: isSunSelected ? 'black' : 'white',
            marginBottom: '60px',
          }}
        >
          © 2024 Nazar. All rights reserved.
        </h2>
        <p
          style={{
            color: isSunSelected ? 'black' : 'white',
          }}
        >
          Your right to privacy and protection of personal data is a priority
          for us. We always strive to provide the highest level of security and
          privacy. Your trust is our most valuable asset.
        </p>
      </div>
    </div>
  );
};
