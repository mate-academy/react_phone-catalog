import React, { useContext } from 'react';
import './AddToCartNotif.scss';
import classNames from 'classnames';
import { NotifStateContext } from '../../../reducer/NotificationReduce';

type AddToCartNotifProps = {
  title: string;
};

export const AddToCartNotif: React.FC<AddToCartNotifProps> = ({ title }) => {
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
