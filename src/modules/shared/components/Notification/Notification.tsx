import React, { useContext } from 'react';
import './Notification.scss';
import classNames from 'classnames';
import { StateContext } from '../../reduce/NotificationReduce';

type NotificationProps = {
  title: string;
};

export const Notification: React.FC<NotificationProps> = ({ title }) => {
  const state = useContext(StateContext);

  return (
    <div
      className={classNames('notification', {
        'notification--active': state.status,
        'notification--successfully':
          state.status || state.actionResult === 'successfully',
        'notification--alarm': state.status || state.actionResult === 'alarm',
      })}
    >
      <span className="notification__title">{title}</span>
    </div>
  );
};
