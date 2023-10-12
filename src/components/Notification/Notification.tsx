/* eslint-disable consistent-return */
import {
  useContext, useEffect, useState, useRef,
} from 'react';
import './notification.scss';
import { CSSTransition } from 'react-transition-group';
import { NotificationContext } from '../../storage/notificationContext';

export const Notification: React.FC = () => {
  const { notification } = useContext(NotificationContext);
  const [isShown, setIsShown] = useState(false);
  const randomKey = Math.random().toString(36);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      return;
    }

    setIsShown(true);

    const timeout = setTimeout(() => {
      setIsShown(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  return (
    <CSSTransition
      in={isShown}
      timeout={500}
      classNames="notification-fade"
      unmountOnExit
    >
      <div
        className="notification"
        key={randomKey}
        style={{ color: notification.color }}
      >
        {notification.message}
      </div>
    </CSSTransition>
  );
};
