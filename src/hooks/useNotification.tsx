import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isNotificationShown) {
      timerId = setTimeout(() => {
        setIsNotificationShown(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isNotificationShown]);

  const showNotification = () => {
    setIsNotificationShown(true);
  };

  const hideNotification = () => {
    setIsNotificationShown(false);
  };

  return [isNotificationShown, showNotification, hideNotification] as const;
};
