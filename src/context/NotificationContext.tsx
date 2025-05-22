import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  notificationReducer,
  initialNotificationState,
} from '../reducers/notificationReducer';
import { NotificationItem } from '../types/NotificationItem';
import { NotificationType } from '../types/NotificationType';

type NotificationContextType = {
  notifications: NotificationItem[];
  addNotification: (type: NotificationType, message: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

type Props = {
  children: React.ReactNode;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotificationState,
  );
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const addNotification = useCallback(
    (type: NotificationType, message: string) => {
      const id = crypto.randomUUID();

      dispatch({ type: 'ADD_NOTIFICATION', payload: { id, message, type } });

      timersRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, 9000);
    },
    [removeNotification],
  );

  const clearNotifications = useCallback(
    () => dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
    [],
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within an NotificationProvider',
    );
  }

  return context;
};
