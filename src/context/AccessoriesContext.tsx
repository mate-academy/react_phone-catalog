import { createContext, useContext, useEffect, useState } from 'react';
import { Gadget } from '../types/Gadgets';

const BASE_URL = import.meta.env.BASE_URL || '/';

type AccessoriesContextType = {
  accessories: Gadget[];
  loading: boolean;
  error: boolean;
};

const AccessoriesContext = createContext<AccessoriesContextType | undefined>(
  undefined,
);

export const AccessoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAccessories = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${BASE_URL}/api/accessories.json`);
      const data = await response.json();

      setAccessories([...data]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessories();
  }, []);

  return (
    <AccessoriesContext.Provider value={{ accessories, loading, error }}>
      {children}
    </AccessoriesContext.Provider>
  );
};

export const useAccessories = () => {
  const context = useContext(AccessoriesContext);

  if (!context) {
    throw new Error(
      'useAccessories must be used within an AccessoriesProvider',
    );
  }

  return context;
};
