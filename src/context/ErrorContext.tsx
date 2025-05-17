import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  ErrorItem,
  errorReducer,
  initialErrorState,
} from '../reducers/errorReducer';

type ErrorContextType = {
  errors: ErrorItem[];
  addError: (message: string) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
};

type Props = {
  children: React.ReactNode;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const removeError = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ERROR', payload: id });

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const addError = useCallback(
    (message: string) => {
      const id = crypto.randomUUID();

      dispatch({ type: 'ADD_ERROR', payload: { id, message } });

      timersRef.current[id] = setTimeout(() => {
        removeError(id);
      }, 9000);
    },
    [removeError],
  );

  const clearErrors = useCallback(() => dispatch({ type: 'CLEAR_ERRORS' }), []);

  return (
    <ErrorContext.Provider
      value={{
        errors: state.errors,
        addError,
        removeError,
        clearErrors,
      }}
    >
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
