import React, { useState, useEffect } from 'react';
import { Product } from '../type/Product';
import { getProducts } from '../helpers/ProductServices';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GlobalContextType } from '../type/Context';

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [],
  hasError: '',
  setProducts: () => { },
  localStore: [],
  setLocalStore: () => { },
  setHasError: () => { },
  handleAddCard: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [localStore, setLocalStore]
    = useLocalStorage<Product[]>('products', []);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setHasError('');

      try {
        const loadedProducts = await getProducts();
        const updatedProducts = loadedProducts.map(item => {
          const elem = localStore.find(e => item.id === e.id);

          if (elem) {
            return elem;
          }

          return {
            ...item,
            inFavourite: false,
            inCart: false,
            discount: item.fullPrice - item.price,
          };
        });

        setProducts(updatedProducts);
      } catch (error) {
        setHasError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  const handleAddCard = (card: Product, action: string) => {
    const currentProducts = [...products];
    let currentStore = [...localStore];
    let updatedCard: Product = { ...card };

    if (action === 'addCard') {
      updatedCard = { ...card, isAddCard: !card.isAddCard };
    }

    if (action === 'favourites') {
      updatedCard = { ...card, inFavourite: !card.inFavourite };
    }

    if (!updatedCard.isAddCard && !updatedCard.inFavourite) {
      currentStore = currentStore
        .filter(el => el.id !== updatedCard.id);
    } else {
      const indexStore = currentStore
        .findIndex(storeEl => storeEl.id === card.id);

      if (indexStore !== -1) {
        currentStore.splice(indexStore, 1, updatedCard);
      } else {
        currentStore = [...currentStore, updatedCard];
      }
    }

    const index = currentProducts.findIndex(el => el.id === card.id);

    currentProducts.splice(index, 1, updatedCard);

    setProducts(currentProducts);
    setLocalStore(currentStore);
  };

  const value = {
    hasError,
    products,
    setProducts,
    localStore,
    setLocalStore,
    setHasError,
    handleAddCard,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
