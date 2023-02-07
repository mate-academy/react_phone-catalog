import React, { useContext, useEffect } from 'react';
import './Notification.scss';
import { Context } from '../../helpers/ContextProvider';

export const Notification: React.FC = () => {
  const { notification, setNotification } = useContext(Context);

  useEffect(() => {
    const timeoutId = setTimeout(() => setNotification(null), 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="notification">
      <span className="text__body notification__message">
        {notification}
      </span>
    </div>
  );
};
