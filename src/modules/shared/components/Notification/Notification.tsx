import React, { useContext } from 'react';
import './Notification.scss';
import classNames from 'classnames';
import { NotifStateContext } from '../../reduce/NotificationReduce';

type NotificationProps = {
  title: string;
};

export const Notification: React.FC<NotificationProps> = ({ title }) => {
  const notifState = useContext(NotifStateContext);

  return (
    <div
      className={classNames('notification', {
        'notification--active': notifState.status,
        'notification--successfully':
          notifState.status || notifState.actionResult === 'successfully',
        'notification--alarm':
          notifState.status || notifState.actionResult === 'alarm',
      })}
    >
      <span className="notification__title">{title}</span>
    </div>
  );
};
