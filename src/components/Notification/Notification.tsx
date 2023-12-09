/* eslint-disable consistent-return */
import { CSSTransition } from 'react-transition-group';
import './Notification.scss';
import React, {
  useContext, useEffect, useRef, useState, memo,
} from 'react';
import {
  NotificationContext,
} from '../../storage/NotificationContext';

export const Notification: React.FC = memo(() => {
  const { notification } = useContext(NotificationContext);
  const [show, setShow] = useState(false);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      return;
    }

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  return (
    <CSSTransition
      in={show}
      timeout={1000}
      classNames="notification"
      unmountOnExit
    >
      <div
        className="notification"
        style={{ color: notification.color }}
      >
        <p>{notification.message}</p>
      </div>
    </CSSTransition>
  );
});
