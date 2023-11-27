import cn from 'classnames';
import './style.scss';

type NotificationProps = {
  message: string,
};

export const Notification: React.FC<NotificationProps> = ({
  message,
}) => {
  return (
    <div className={cn(
      'notification',
      {
        'notification--hidden': !message,
      },
    )}
    >
      {message}
    </div>
  );
};
