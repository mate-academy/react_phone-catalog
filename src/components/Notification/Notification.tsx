import { FC } from 'react';
import './notification.scss';

interface Props {
  message: string;
}

export const Notification: FC<Props> = ({ message }) => {
  return (
    <div className="notification">
      <h2 className="notification__message">{message}</h2>
    </div>
  );
};
