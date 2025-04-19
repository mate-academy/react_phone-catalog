import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';

// Import phone images
import iphone10Silver from '../assets/img/phones/10_Silver.png';
import iphone11Purple from '../assets/img/phones/11_Purple.png';
import iphone11ProMaxGold from '../assets/img/phones/11pro_max_Gold.png';
import iphone14PlusRed from '../assets/img/phones/14plus_Red.png';
import iphone14ProSilver from '../assets/img/phones/14pro_Silver.png';

interface ProductContextType {
  products: Product[];
}

const defaultProducts = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro 128GB Silver',
    price: 999,
    oldPrice: 1099,
    image: iphone14ProSilver,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    name: 'Apple iPhone 11 Pro Max 64GB Gold',
    price: 799,
    oldPrice: 999,
    image: iphone11ProMaxGold,
    screen: '6.5" OLED',
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: 3,
    name: 'Apple iPhone 11 256GB Purple',
    price: 799,
    oldPrice: 899,
    image: iphone11Purple,
    screen: '6.1" IPS',
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: 4,
    name: 'Apple iPhone X 256GB Silver',
    price: 859,
    oldPrice: 899,
    image: iphone10Silver,
    screen: '5.8" OLED',
    capacity: '256 GB',
    ram: '3 GB',
  },
  {
    id: 5,
    name: 'Apple iPhone 14 Plus 128GB Red',
    price: 859,
    oldPrice: 959,
    image: iphone14PlusRed,
    screen: '6.7" OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
];

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products] = useState(defaultProducts);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};
