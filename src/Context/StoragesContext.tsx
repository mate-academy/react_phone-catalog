import React, { useMemo } from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFetch } from '../hooks/useFetch';
import { Fetch } from '../enum/Fetch';

type CartCard = {
  id: string,
  name: string,
  image: string,
  phoneId: string,
  price: number,
  qnty: number,
};

type StorageContext = {
  cartStorage: CartCard[],
  likesStorage: Phone[],
  addedProducts: string[],
  existingLikes: string[],
  totalAmountAndQnty: { amount: number, qnty: number },
  handleQntyOfProduct: (id: string, operation: 'plus' | 'minus') => void,
  handleDeleteProduct: (id: string) => void,
  handleAddToLikeStorage: (phoneId: string) => void,
  handleAddToCart: (phoneId: string) => void,
};

export const StoragesContext = React.createContext<StorageContext>({
  cartStorage: [],
  likesStorage: [],
  existingLikes: [],
  addedProducts: [],
  totalAmountAndQnty: { amount: 0, qnty: 0 },
  handleQntyOfProduct: () => { },
  handleDeleteProduct: () => { },
  handleAddToCart: () => { },
  handleAddToLikeStorage: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const StoragesProvider: React.FC<Props> = ({ children }) => {
  const [phones] = useFetch(Fetch.allProducts);
  const [cartStorage, setCartStorage] = useLocalStorage<CartCard[]>('cart', []);
  const [likesStorage, setLikesStorage] = useLocalStorage<Phone[]>('likes', []);

  const handleAddToCart = (phoneId: string) => {
    const product = phones.find(currPhone => currPhone.phoneId === phoneId);

    const newProduct = {
      id: product?.id || '',
      name: product?.name || '',
      image: product?.image || '',
      phoneId: product?.phoneId || '',
      price: product?.price || 0,
      qnty: 1,
    };

    return setCartStorage([...cartStorage, newProduct]);
  };

  const handleAddToLikeStorage = (phoneId: string) => {
    const product = phones.find(currPhone => currPhone.phoneId === phoneId);

    const sameLike = likesStorage.filter(like => like.id !== product?.id);

    if (sameLike.length !== likesStorage.length) {
      setLikesStorage(sameLike);

      return;
    }

    setLikesStorage([...likesStorage, product as Phone]);
  };

  const handleDeleteProduct = (id: string) => {
    const deleteProduct = cartStorage.filter(product => product.id !== id);

    setCartStorage(deleteProduct);
  };

  const handleQntyOfProduct = (id: string, operation: 'plus' | 'minus') => {
    const handleOperation = cartStorage.map(product => {
      if (product.id === id) {
        if (operation === 'plus') {
          return { ...product, qnty: product.qnty + 1 };
        }

        if (operation === 'minus') {
          return { ...product, qnty: product.qnty - 1 };
        }
      }

      return product;
    });

    setCartStorage(handleOperation);
  };

  const totalAmountAndQnty = useMemo(() => {
    const amount = cartStorage
      .reduce((num, product) => (product.price * product.qnty) + num, 0);

    const qnty = cartStorage
      .reduce((num, product) => product.qnty + num, 0);

    return { amount, qnty };
  }, [cartStorage]);

  const existingLikes = useMemo(() => {
    return likesStorage.map(like => like.itemId);
  }, [likesStorage]);

  const addedProducts = useMemo(() => {
    return cartStorage.map(product => product.phoneId);
  }, [cartStorage]);

  const todoState = useMemo(() => ({
    cartStorage,
    likesStorage,
    existingLikes,
    addedProducts,
    totalAmountAndQnty,
    handleQntyOfProduct,
    handleDeleteProduct,
    handleAddToCart,
    setCartStorage,
    handleAddToLikeStorage,
  }), [cartStorage, likesStorage, phones]);

  return (
    <StoragesContext.Provider value={todoState}>
      {children}
    </StoragesContext.Provider>
  );
};
