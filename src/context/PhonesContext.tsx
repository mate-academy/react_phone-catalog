import { createContext, useContext, useEffect, useState } from 'react';
import { Gadget } from '../types/Gadgets';

const BASE_URL = import.meta.env.BASE_URL || '/';

type PhonesContextType = {
  phones: Gadget[];
  loading: boolean;
  error: boolean;
};

const PhonesContext = createContext<PhonesContextType | undefined>(undefined);

export const PhonesProvider = ({ children }: { children: React.ReactNode }) => {
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPhones = async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch(`${BASE_URL}/api/phones.json`);
      const data = await response.json();

      setPhones([...data]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <PhonesContext.Provider value={{ phones, loading, error }}>
      {children}
    </PhonesContext.Provider>
  );
};

export const usePhones = () => {
  const context = useContext(PhonesContext);

  if (!context) {
    throw new Error('usePhones must be used within a PhonesProvider');
  }

  return context;
};
