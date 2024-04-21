import React from 'react';
import './Notification.scss';

interface Props {
  message: string;
}

export const Notification: React.FC<Props> = ({ message }) => (
  <div className="notification">
    <p className="notification__message">
      {message}
    </p>
  </div>
);
