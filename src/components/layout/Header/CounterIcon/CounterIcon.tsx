import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CounterIcon.module.scss';

interface Props {
  icon: string;
  count: number;
  alt: string;
}

export const CounterIcon: React.FC<Props> = ({ icon, count, alt }) => {
  return (
    <div className={styles.wrapper}>
      <img
        src={icon}
        alt={alt}
        className={styles.icon}
      />

      <AnimatePresence mode="popLayout">
        {count > 0 && (
          <motion.span
            key={count}
            className={styles.badge}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 25,
            }}
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
