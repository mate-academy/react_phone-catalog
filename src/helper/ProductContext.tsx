import React, { useMemo, useState } from 'react';
import { Product } from './Product';

interface Props {
  phones: Product[];
  setPhones: (product: Product[]) => void;
  tablets: Product[];
  setTablets: (product: Product[]) => void;
  accessories: Product[];
  setAccessories: (product: Product[]) => void;
  dataImg: { url: string }[];
  phonesAmount: number;
  setPhonesAmount: (phonesAmount: number) => void;
  tabletsAmount: number;
  setTabAmount: (phonesAmount: number) => void;
  accessAmount: number;
  setAccessAmount: (phonesAmount: number) => void;
  appliedQuery: string;
  setAppliedQuery: (value: string) => void;
}

export const ProductContext = React.createContext<Props>({
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  dataImg: [],
  phonesAmount: 0,
  setPhonesAmount: () => {},
  tabletsAmount: 0,
  setTabAmount: () => {},
  accessAmount: 0,
  setAccessAmount: () => {},
  appliedQuery: '',
  setAppliedQuery: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Prop> = ({ children }) => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabAmount] = useState(0);
  const [accessAmount, setAccessAmount] = useState(0);

  const dataImg = [
    { url: '_new/img/banner-phones.png' },
    { url: '_new/img/banner-tablets.png' },
    { url: '_new/img/banner-accessories.png' },
  ];

  const value = useMemo(
    () => ({
      dataImg,
      phonesAmount,
      setPhonesAmount,
      appliedQuery,
      setAppliedQuery,
      tabletsAmount,
      setTabAmount,
      accessAmount,
      setAccessAmount,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
    }),
    [
      dataImg,
      appliedQuery,
      phonesAmount,
      tabletsAmount,
      accessAmount,
      phones,
      tablets,
      accessories,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
