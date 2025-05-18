import React, { memo } from 'react';
import toastStyles from './Toast.module.scss';
import { CloseButton } from '../../../CloseButton';

type Props = {
  errorMessage: string;
  onClose: () => void;
};

export const Toast: React.FC<Props> = memo(({ errorMessage, onClose }) => {
  return (
    <div className={toastStyles.toast}>
      <header className={toastStyles.toast__header}>
        <h3 className={toastStyles.toast__title}>Error!</h3>
        <CloseButton
          onClose={onClose}
          className={toastStyles.toast__closeButton}
        />
      </header>
      <p className={toastStyles.toast__message}>{errorMessage}</p>
    </div>
  );
});

Toast.displayName = 'Toast';
