import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductChars } from '../types';
import { Header } from '../components/HomePage/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { CuteLoader } from '../components/loader/CuteLoader';

const PhonesContext = createContext<ProductChars[]>([]);

export const PhonesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phones, setPhones] = useState<ProductChars[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/phones.json')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPhones(data);
      })
      .catch(() => {
        setError('Failed to load phones');
        setLoading(false);
      });
  }, []);

  return (
    <PhonesContext.Provider value={phones}>
      {loading && (
        <>
          <Header />
          <CuteLoader />
          <Footer />
        </>
      )}
      {error && <div>{error}</div>}
      {children}
    </PhonesContext.Provider>
  );
};

export const usePhones = () => useContext(PhonesContext);
