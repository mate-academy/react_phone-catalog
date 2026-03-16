import React from 'react';
import styles from './ToastContainer.module.scss';

type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

type Props = {
  toasts: Toast[];
};

export const ToastContainer: React.FC<Props> = ({ toasts }) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <span className={styles.dot} />
          {toast.message}
        </div>
      ))}
    </div>
  );
};
