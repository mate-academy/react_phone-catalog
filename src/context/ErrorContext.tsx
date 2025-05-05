import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  errorReducer,
  ErrorState,
  initialErrorState,
} from '../reducers/errorReducer';

type ErrorContextType = {
  error: ErrorState;
  setError: (message: string) => void;
  clearError: () => void;
};

type Props = {
  children: React.ReactNode;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, dispatch] = useReducer(errorReducer, initialErrorState);

  const setError = useCallback(
    (message: string) => dispatch({ type: 'SET_ERROR', payload: message }),
    [],
  );

  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), []);

  useEffect(() => {
    if (error.message) {
      const timerId = setTimeout(clearError, 5000);

      return () => clearTimeout(timerId);
    }
  }, [error.message, clearError]);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
};
