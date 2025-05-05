import React from 'react';
import { useError } from '../../context/ErrorContext';
import errorNotificationStyles from './ErrorNotification.module.scss';
import { CloseButton } from '../CloseButton';

export const ErrorNotification = () => {
  const { error, clearError } = useError();

  return (
    <div className={errorNotificationStyles.errorNotification}>
      <div className={errorNotificationStyles.errorNotification__header}>
        <h2 className={errorNotificationStyles.errorNotification__title}>
          Error!
        </h2>
        <CloseButton onClose={clearError} />
      </div>
      <p className={errorNotificationStyles.errorNotification__message}>
        {error.message}
      </p>
    </div>
  );
};
