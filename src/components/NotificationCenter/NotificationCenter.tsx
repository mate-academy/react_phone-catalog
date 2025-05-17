import React from 'react';
import toastListStyles from './NotificationCenter.module.scss';
import { useError } from '../../context/ErrorContext';
import { Toast } from './components/Toast';
import { AnimatePresence, motion } from 'framer-motion';

export const NotificationCenter = () => {
  const { errors, removeError } = useError();

  return (
    <div className={toastListStyles.toastList}>
      <ul className={toastListStyles.toastList__list}>
        <AnimatePresence>
          {errors.map(error => (
            <motion.li
              key={error.id}
              className={toastListStyles.toastList__item}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <Toast
                errorMessage={error.message}
                onClose={() => removeError(error.id)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
