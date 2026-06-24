import { useEffect, useMemo, useState } from 'react';
import Product from '../types/Product';
import { CartItemType } from '../types/CartItem';
import { createContext } from 'use-context-selector';

type ProdContextType = {
  products: Product[];
  cartProds: CartItemType[];
  addProdToCart: (product: Product) => void;
  removeProdFromCart: (id: number) => void;
  changeQuontityInCart: (id: number, action: string) => void;
  favourites: Product[];
  addProdToFavourites: (product: Product) => void;
  isProdInFavourites: (product: Product) => boolean;
  isProdInCart: (product: Product) => boolean;
  clearCart: () => void;
  isLoading: boolean;
};

export const ProductsContext = createContext<ProdContextType>({
  products: [],
  cartProds: [],
  addProdToCart: () => {},
  removeProdFromCart: () => {},
  changeQuontityInCart: () => {},
  favourites: [],
  addProdToFavourites: () => {},
  isProdInFavourites: () => false,
  isProdInCart: () => false,
  clearCart: () => {},
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProds, setCartProds] = useState<CartItemType[]>([]);
  const [favourites, setFavouritesArr] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${window.location.origin}${import.meta.env.BASE_URL}/api/products.json`,
    )
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        throw new Error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');

    if (storedFavourites === null) {
      return;
    }

    if (storedFavourites) {
      setFavouritesArr(JSON.parse(storedFavourites));
    }

    const storedCart = localStorage.getItem('cartProds');

    if (storedCart === null) {
      return;
    }

    if (storedCart) {
      setCartProds(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
    localStorage.setItem('cartProds', JSON.stringify(cartProds));
  }, [favourites, cartProds]);

  function addProdToCart(product: Product) {
    setCartProds(prevArr => {
      if (prevArr.find(item => item.id === product.id)) {
        return prevArr;
      }

      return [...prevArr, { ...product, quantity: 1 }];
    });
  }

  function removeProdFromCart(id: number) {
    setCartProds(prevArr => prevArr.filter(item => item.id !== id));
  }

  function clearCart() {
    setCartProds([]);
  }

  function changeQuontityInCart(id: number, action: string) {
    const updatedCart = cartProds.map(item => {
      if (item.id === id) {
        if (action === 'incr') {
          return { ...item, quantity: item.quantity + 1 };
        }

        if (action === 'decr') {
          return { ...item, quantity: item.quantity - 1 };
        }
      }

      return item;
    });

    setCartProds(updatedCart);
  }

  function addProdToFavourites(product: Product) {
    setFavouritesArr(prevArr => {
      if (prevArr.find(item => item.id === product.id)) {
        return prevArr.filter(item => item.id !== product.id);
      }

      return [...prevArr, product];
    });
  }

  const isProdInFavourites = (product: Product): boolean => {
    return favourites.some(item => item.id === product.id);
  };

  const isProdInCart = (product: Product): boolean => {
    return cartProds.some(item => item.id === product.id);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const value = useMemo(
    () => ({
      products,
      cartProds,
      addProdToCart,
      removeProdFromCart,
      changeQuontityInCart,
      favourites,
      addProdToFavourites,
      isProdInFavourites,
      isProdInCart,
      clearCart,
      isLoading,
    }),
    [products, cartProds, favourites, isLoading],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
