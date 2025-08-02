import styles from './Modal.module.scss';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  open: boolean;
  onClose: (arg: boolean) => void;
  onApprove: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, open, onApprove }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button className={styles.icon} onClick={() => onClose(false)}>
              <img src="/icons/close-icon.svg" alt="Close modal" />
            </button>
            <h3 className={styles.title}>
              CHECKOUT IS NOT IMPLEMENTED YET <br />
              DO YOU WANT TO CLEAR THE CART?
            </h3>
            <button className={styles.button} onClick={onApprove}>
              <p>Approve</p>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
