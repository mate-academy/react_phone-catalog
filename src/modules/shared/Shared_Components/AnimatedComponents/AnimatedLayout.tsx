import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  direction?: string;
}

export const AnimatedLayout: React.FC<Props> = ({ children, direction }) => {
  const variants = {
    basic: {
      hidden: { opacity: 0, x: -100, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 100, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: 100, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: -100, y: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -100, y: 0 },
      enter: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 100, y: 0 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={
        !direction
          ? variants.basic
          : direction === 'right'
            ? variants.right
            : variants.left
      }
      style={{ width: '100%' }}
      transition={{ duration: 0.3, type: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
