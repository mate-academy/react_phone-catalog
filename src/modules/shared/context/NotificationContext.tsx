import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Notification } from '../components/Notification';

type NotificationType = 'success' | 'error';

interface NotificationData {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

const DISPLAY_DURATION = 3000;
const EXIT_DURATION = 350;
const TOTAL_DURATION = DISPLAY_DURATION + EXIT_DURATION;

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const notify = (message: string, type: NotificationType = 'success') => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setNotification({
      id: Date.now(),
      message,
      type,
    });

    timeoutRef.current = window.setTimeout(() => {
      setNotification(null);
    }, TOTAL_DURATION);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  return context;
};
