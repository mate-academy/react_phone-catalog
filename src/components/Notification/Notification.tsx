import { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NotificationContext } from '../../helpers/ErrorContext';
import './Notification.scss';

export const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const handleCloseNotification = () => (
    setNotification('')
  );

  return (
    <CSSTransition
      in={!!notification}
      classNames="notification"
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <div className="notification">
        {notification}
        <button
          type="button"
          onClick={handleCloseNotification}
          className="notification__button-close"
        >
          <img src="icons/close.svg" alt="close notification button" />
        </button>
      </div>
    </CSSTransition>
  );
};
