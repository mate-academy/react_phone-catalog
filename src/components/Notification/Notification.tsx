import './Notification.scss';
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { ProductContext } from '../../context/productContext';
import { Message } from '../../types/Message';

export const Notification = () => {
  const { message, dispatch } = useContext(ProductContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'setMessage', payload: Message.none });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, dispatch]);

  return (
    <div
      className={classNames('notification', {
        'notification-hidden': message === Message.none,
      })}
    >
      <h3 className="notification__text">{message}</h3>
    </div>
  );
};
