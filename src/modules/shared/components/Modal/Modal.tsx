import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { FC, ReactNode } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import { Button } from '@/modules/shared/components/Button';

import { AnimatePresence, motion, Variants } from 'motion/react';

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    x: '-50%',
    y: '-40%',
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

interface ModalComponent extends FC<Props> {
  Body: FC<{ children: ReactNode; className?: string }>;
  Actions: FC<{
    onCancel: () => void;
    onSubmit: () => void;
  }>;
}

export const Modal: ModalComponent = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {createPortal(
            <div className={styles.wrapper}>
              <motion.div
                className={styles.overlay}
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              ></motion.div>
              <motion.div
                className={classNames(styles.modal, className)}
                ref={ref}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {children}
              </motion.div>
            </div>,
            document.body,
          )}
        </>
      )}
    </AnimatePresence>
  );
};

Modal.Body = function ModalBody({ children, className }) {
  return <div className={className}>{children}</div>;
};

Modal.Actions = function ModalActions({ onCancel, onSubmit }) {
  return (
    <div className={styles.actions}>
      <Button
        variant="outline"
        className={classNames(styles.actionsBtn, styles.cancelBtn)}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className={classNames(styles.actionsBtn, styles.confirmBtn)}
        onClick={onSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};
