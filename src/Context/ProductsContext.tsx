import { createContext, useEffect, useMemo, useState } from 'react';
import Product from '../types/Product';

type ProdContextType = {
  products: Product[];
  cartProds: Product[];
  addProdToCart: (product: Product) => void;
  favourites: Product[];
  addProdToFavourites: (product: Product) => void;
  isProdInFavourites: (product: Product) => boolean;
  isProdInCart: (product: Product) => boolean;
  // toggleCompleted: (id: number) => void;
  // toggleAll: () => void;
  // filter: Filter;
  // setFilter: (filter: Filter) => void;
  // deleteTodo: (id: number) => void;
  // editTodo: (updatedTodo: Todo) => void;
  // clearCompleted: () => void;
};

export const ProductsContext = createContext<ProdContextType>({
  products: [],
  cartProds: [],
  addProdToCart: () => {},
  favourites: [],
  addProdToFavourites: () => {},
  isProdInFavourites: () => false,
  isProdInCart: () => false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProds, setCartProds] = useState<Product[]>([]);
  const [favourites, setFavouritesArr] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        throw new Error('Error fetching data:', error);
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

      return [...prevArr, product];
    });
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
      favourites,
      addProdToFavourites,
      isProdInFavourites,
      isProdInCart,
    }),
    [products, cartProds, favourites],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
