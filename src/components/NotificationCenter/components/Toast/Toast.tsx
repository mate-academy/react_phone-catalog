import React, { memo } from 'react';
import toastStyles from './Toast.module.scss';
import { CloseButton } from '../../../CloseButton';
import { NotificationItem } from '../../../../types/NotificationItem';
import classNames from 'classnames';
import { getNormalizedTitle } from '../../../../helpers/stringHelper';

type Props = {
  notification: NotificationItem;
  onClose: () => void;
};

export const Toast: React.FC<Props> = memo(({ notification, onClose }) => {
  return (
    <div
      className={classNames(
        toastStyles.toast,
        toastStyles[`toast--${notification.type}`],
      )}
    >
      <header className={toastStyles.toast__header}>
        <h3 className={toastStyles.toast__title}>
          {getNormalizedTitle(notification.type)}
        </h3>
        <CloseButton
          onClose={onClose}
          className={toastStyles.toast__closeButton}
        />
      </header>
      <p className={toastStyles.toast__message}>{notification.message}</p>
    </div>
  );
});

Toast.displayName = 'Toast';
