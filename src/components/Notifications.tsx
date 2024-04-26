import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationMessage } from '../components/NotificationMessage';
import { useNotification } from '../hooks/useNotification';

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <TransitionGroup
      className="
        fixed bottom-10 right-10 z-[10000] flex
        flex-col gap-2.5 overflow-hidden bg-none p-0
      "
    >
      {notifications.map(notification => (
        <CSSTransition
          unmountOnExit
          key={notification.id}
          timeout={300}
          classNames={{
            appear: 'opacity-0',
            appearActive: 'transition-opacity duration-300 opacity-100',
            enter: 'opacity-0',
            enterActive: 'transition-opacity duration-300 opacity-100',
            exitActive: 'transition-opacity duration-200 opacity-0',
          }}
        >
          <NotificationMessage
            className="notifications__notification"
            title={notification.title}
            description={notification.description}
            icon={notification.icon}
            onClose={() => removeNotification(notification.id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
