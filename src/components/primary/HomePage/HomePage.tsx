import { getPhonesData } from '../../../api/PhonesApi';
import { Product } from '../../../types/Product';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react';
import { Footer } from '../Footer';
import { TopBar } from '../TopBar';

export const phonesContext = createContext<Product[] | null>(null);

export const HomePage = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);

  useEffect(() => {
    getPhonesData().then(response => {
      setPhones(response);
    });
  }, []);

  return (
    <>
      <TopBar />
      <phonesContext.Provider value={phones}>
        <Outlet />
      </phonesContext.Provider>
      <Footer />
    </>
  );
};
