// src/components/Toast/ToastContext.tsx
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  PropsWithChildren,
  useRef,
  useEffect,
} from 'react';
import './toast.css';

type Toast = {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'error';
};

type ToastContextValue = {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/* -------------------------
   ToastContainer (apenas apresentação)
   Declarado antes do provider para evitar "used before defined"
   ------------------------- */
const ToastContainer: React.FC<{
  toasts: Toast[];
  removeToast: (id: number) => void;
}> = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast ${t.type ?? 'success'}`}
          role="status"
          onClick={() => removeToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'success') => {
      const id = Date.now() + Math.floor(Math.random() * 1000);

      setToasts(prev => [...prev, { id, message, type }]);

      const timerId = window.setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
        timersRef.current = timersRef.current.filter(t => t !== timerId);
      }, 2500);

      timersRef.current.push(timerId);
    },
    [],
  );

  const value = useMemo(
    () => ({ toasts, showToast, removeToast }),
    [toasts, showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }

  return ctx;
};
