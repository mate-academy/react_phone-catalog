import { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../api/httpClient';
import { ProductFull } from '../types/Product_full';
import { Product } from '../types/Product';
import { ErrorContext } from './ErrorContext';

type Context = {
  products: ProductFull[];
  phones: ProductFull[];
  tablets: ProductFull[];
  accessories: ProductFull[];

  favsIds: string[];
  favs: ProductFull[];
  setFavs: React.Dispatch<React.SetStateAction<ProductFull[]>>;
  handleFavs: (gadget: ProductFull) => void;

  cartIds: string[];
  cart: ProductFull[];
  setCart: React.Dispatch<React.SetStateAction<ProductFull[]>>;
  handleCart: (gadget: ProductFull) => void;
};

export const ProductContext = createContext<Context>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],

  favsIds: [],
  favs: [],
  setFavs: () => {},
  handleFavs: () => {},

  cartIds: [],
  cart: [],
  setCart: () => {},
  handleCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const { setErrorMessage, setIsLoading } = useContext(ErrorContext);

  const [phones, setPhones] = useState<ProductFull[]>([]);
  const [tablets, setTablets] = useState<ProductFull[]>([]);
  const [accessories, setAccessories] = useState<ProductFull[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const productsWithYear = (items?: ProductFull[]) => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map(item => {
      const productWithYear = allProducts.find(
        product => product.itemId === item.id,
      );

      return { ...item, year: productWithYear?.year };
    });
  };

  const products = [
    ...productsWithYear(phones),
    ...productsWithYear(tablets),
    ...productsWithYear(accessories),
  ];

  const [cart, setCart] = useState<ProductFull[]>(() => {
    try {
      const saved = localStorage.getItem('cart');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [favs, setFavs] = useState<ProductFull[]>(() => {
    try {
      const saved = localStorage.getItem('favs');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    setIsLoading(true);
    client
      .getPhones()
      .then(setPhones)
      .catch(() => setErrorMessage('Unable to load smartphones from server'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    client
      .getTablets()
      .then(setTablets)
      .catch(() => setErrorMessage('Unable to load tablets from server'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    client
      .getAllProducts()
      .then(setAllProducts)
      .catch(() => setErrorMessage('Unable to load products from server'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    client
      .getAccessories()
      .then(setAccessories)
      .catch(() => setErrorMessage('Unable to load accessories from server'))
      .finally(() => setIsLoading(false));
  }, []);

  const favsIds = favs.map(device => device.id);
  const cartIds = cart.map(device => device.id);

  const handleCart = (gadget: ProductFull) => {
    setCart(current => {
      const isCart = current.some(device => device.id === gadget.id);

      if (isCart) {
        return current.filter(device => device.id !== gadget.id);
      } else {
        return [...current, { ...gadget, quantity: gadget.quantity ?? 0 + 1 }];
      }
    });
  };

  const handleFavs = (gadget: ProductFull) => {
    setFavs(current => {
      const isFav = current.some(device => device.id === gadget.id);

      if (isFav) {
        return current.filter(device => device.id !== gadget.id);
      } else {
        return [...current, gadget];
      }
    });
  };

  const value = {
    products,
    phones,
    tablets,
    accessories,

    favsIds,
    favs,
    setFavs,
    handleFavs,
    cartIds,
    cart,
    setCart,
    handleCart,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
