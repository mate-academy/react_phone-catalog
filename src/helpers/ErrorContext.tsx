import React, { useMemo, useState } from 'react';
import { ErrorText } from '../types/ErrorText';

interface ErrorContextType {
  error: ErrorText,
  setError: (error: ErrorText) => void,
}

interface NotificationContextType {
  notification: string,
  setNotification: (natofocation: string) => void,
}

export const ErrorContext = React.createContext<ErrorContextType>({
  error: ErrorText.NONE,
  setError: () => {},
});

export const NotificationContext = React
  .createContext<NotificationContextType>({
  notification: '',
  setNotification: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [error, setError] = useState(ErrorText.NONE);
  const [notification, setNotification] = useState('');

  const ErrorContextValues = useMemo(() => (
    {
      error,
      setError,
    }
  ), [error]);

  const NotificationContextValues = useMemo(() => (
    {
      notification,
      setNotification,
    }
  ), [notification]);

  return (
    <ErrorContext.Provider value={ErrorContextValues}>
      <NotificationContext.Provider value={NotificationContextValues}>
        {children}
      </NotificationContext.Provider>
    </ErrorContext.Provider>
  );
};
