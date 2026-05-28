import { api } from '@/api/api';
import { Phone } from '@/shared/type';
import {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useRef,
  useState,
} from 'react';

type PhonesContextType = {
  phones: Phone[] | null;
  loading: boolean;
  error: string | null;
  loadPhones: () => Promise<Phone[]>;
};

const PhonesContext = createContext<PhonesContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function PhonesProvider({ children }: Props) {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestRef = useRef<Promise<Phone[]> | null>(null);

  const loadPhones = useCallback(async () => {
    if (phones) {
      return phones;
    }

    if (requestRef.current) {
      return requestRef.current;
    }

    setLoading(true);
    setError(null);

    requestRef.current = api
      .getPhones()
      .then((data) => {
        setPhones(data);
        return data;
      })
      .catch((error) => {
        setError('Failed to load phones');
        requestRef.current = null;
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });

    return requestRef.current;
  }, [phones]);

  return (
    <PhonesContext.Provider
      value={{
        phones,
        loading,
        error,
        loadPhones,
      }}
    >
      {children}
    </PhonesContext.Provider>
  );
}

export function usePhones() {
  const context = useContext(PhonesContext);

  if (!context) {
    throw new Error('usePhones must be used inside PhonesProvider');
  }

  return context;
}
