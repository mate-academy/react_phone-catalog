import { useContext, useEffect } from 'react';
import './NotificationWindow.scss';
import cn from 'classnames';
import { CartContext } from '../CartContext/CartContext';
import { Message } from '../../type/Message';

export const NotificationWindow = () => {
  const { message, setMessage } = useContext(CartContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(Message.None);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  return (
    <div
      className={cn('notification', {
        'notification--hidden': !message,
        'notification--red': message === Message.DeleteProduct
                            || message === Message.NotImplemented
                            || message === Message.Dislike,
        'notification--green': message === Message.AddProduct
                            || message === Message.Like,
      })}
    >
      <h3 className="notification__text">
        {message}
      </h3>
    </div>
  );
};
