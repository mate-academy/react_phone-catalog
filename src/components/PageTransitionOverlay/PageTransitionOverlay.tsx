import { motion, AnimatePresence } from 'framer-motion';
import styles from './PageTransitionOverlay.module.scss';
import { usePageTransition } from '../../providers/PageTransitionProvider';

export const PageTransitionOverlay = () => {
  const { isTransitioning, targetPageName } = usePageTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className={`${styles.pageOverlay}`}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.4,
          }}
        >
          <h1 className={styles.title}>{targetPageName}</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
