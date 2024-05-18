import React, { useMemo, useState } from 'react';
import { Product } from './Product';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { ProductDeteils } from './ProductDeteils';

interface Props {
  setProduct: (product: Product[]) => void;
  product: Product[];
  setCard: (product: Product[]) => void;
  card: Product[];
  setDetails: (details: ProductDeteils) => void;
  details: ProductDeteils;
  setFavorites: (product: Product[]) => void;
  favorites: Product[];
  setAppliedQuery: (value: string) => void;
  category: string;
  setCategory: (category: string) => void;
  appliedQuery: string;
  dataImg: { url: string }[];
}

export const ProductContext = React.createContext<Props>({
  card: [],
  setCard: () => {},
  details: {
    id: '',
    category: '',
    namespaceId: '',
    name: '',
    capacityAvailable: [],
    capacity: '',
    priceRegular: 0,
    priceDiscount: 0,
    colorsAvailable: [],
    color: '',
    images: [],
    description: [
      {
        title: '',
        text: [],
      },
    ],
    screen: '',
    resolution: '',
    processor: '',
    ram: '',
    camera: '',
    zoom: '',
    cell: [],
  },
  setDetails: () => {},
  product: [],
  setProduct: () => {},
  favorites: [],
  setFavorites: () => {},
  category: '',
  setCategory: () => {},
  dataImg: [],
  appliedQuery: '',
  setAppliedQuery: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Prop> = ({ children }) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [card, setCard] = useLocalStorage<Product[]>('card', []);
  const [details, setDetails] = useLocalStorage<ProductDeteils>('details', {
    id: '',
    category: '',
    namespaceId: '',
    name: '',
    capacityAvailable: [],
    capacity: '',
    priceRegular: 0,
    priceDiscount: 0,
    colorsAvailable: [],
    color: '',
    images: [],
    description: [
      {
        title: '',
        text: [],
      },
    ],
    screen: '',
    resolution: '',
    processor: '',
    ram: '',
    camera: '',
    zoom: '',
    cell: [],
  });

  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [category, setCategory] = useState('');

  const dataImg = [
    { url: 'img/apple-2024-2.jpg' },
    { url: 'img/ipads-f.avif' },
    { url: 'img/intro-1697914594.jpg' },
  ];

  const value = useMemo(
    () => ({
      product,
      setProduct,
      favorites,
      setFavorites,
      card,
      setCard,
      details,
      setDetails,
      dataImg,
      appliedQuery,
      setAppliedQuery,
      category,
      setCategory,
    }),
    [
      product,
      favorites,
      setFavorites,
      card,
      setCard,
      details,
      setDetails,
      dataImg,
      appliedQuery,
      category,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
