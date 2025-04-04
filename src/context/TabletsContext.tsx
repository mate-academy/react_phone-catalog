import { createContext, useContext, useEffect, useState } from 'react';
import { Gadget } from '../types/Gadgets';

const BASE_URL = import.meta.env.BASE_URL || '/';

type TabletsContextType = {
  tablets: Gadget[];
  loading: boolean;
  error: boolean;
};

const TabletsContext = createContext<TabletsContextType | undefined>(undefined);

export const TabletsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTablets = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${BASE_URL}/api/tablets.json`);
      const data = await response.json();

      setTablets([...data]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTablets();
  }, []);

  return (
    <TabletsContext.Provider value={{ tablets, loading, error }}>
      {children}
    </TabletsContext.Provider>
  );
};

export const useTablets = () => {
  const context = useContext(TabletsContext);

  if (!context) {
    throw new Error('useTablets must be used within a TabletsProvider');
  }

  return context;
};
