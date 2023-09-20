import React, { useMemo, useState, useEffect } from 'react';
import { Phone } from '../types/Phone';
import { getData } from '../services/phones';

type PhonesContextProps = {
  phones: Phone[];
  isError: boolean;
  loading: boolean;
};

export const PhonesContext = React.createContext<PhonesContextProps>({
  phones: [],
  isError: false,
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPhones = async () => {
    setIsError(false);
    setLoading(true);
    try {
      const loadedPhones = await getData();

      setPhones(loadedPhones);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhones();
  }, []);

  const value = useMemo(() => ({
    phones,
    isError,
    loading,
  }), [phones, isError, loading]);

  return (
    <PhonesContext.Provider value={value}>
      {children}
    </PhonesContext.Provider>
  );
};
