import React from 'react';
import toastListStyles from './NotificationCenter.module.scss';
import { useNotification } from '../../context/NotificationContext';
import { Toast } from './components/Toast';
import { AnimatePresence, motion } from 'framer-motion';

export const NotificationCenter = () => {
  const { notifications, removeNotification: removeError } = useNotification();

  return (
    <div className={toastListStyles.toastList}>
      <ul className={toastListStyles.toastList__list}>
        <AnimatePresence>
          {notifications.map(notification => (
            <motion.li
              key={notification.id}
              className={toastListStyles.toastList__item}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <Toast
                notification={notification}
                onClose={() => removeError(notification.id)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
