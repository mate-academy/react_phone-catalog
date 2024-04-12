import React, { useEffect, useState } from 'react';
import { Phone } from '../types/phone';

type CatalogType = {
  phones: Phone[] | undefined;
  setPhones: React.Dispatch<React.SetStateAction<Phone[] | undefined>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const CatalogContext = React.createContext<CatalogType>({
  phones: [],
  setPhones: () => {},
  loader: false,
  setLoader: () => {},
  error: '',
  setError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[] | undefined>();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dataUrl = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setPhones(data);
      } catch (error) {
        setError('Page not found');
      }
    };

    fetchData();
  }, []);

  const value = {
    phones,
    setPhones,
    loader,
    setLoader,
    error,
    setError,
  };

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};