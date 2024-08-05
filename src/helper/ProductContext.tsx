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
  amounCard: number;
  setAmountCard: (value: number) => void;
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
  appliedQuery: '',
  setAppliedQuery: () => {},
  amounCard: 0,
  setAmountCard: () => {},
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
  const [amounCard, setAmountCard] = useState(0);

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
      appliedQuery,
      setAppliedQuery,
      category,
      setCategory,
      amounCard,
      setAmountCard,
    }),
    [
      product,
      favorites,
      setFavorites,
      card,
      setCard,
      details,
      setDetails,
      appliedQuery,
      category,
      amounCard,
      setAmountCard,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
