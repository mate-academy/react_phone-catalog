import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageContext } from './utils/GlobalContext';
import { getProducts } from './api';
import { Loader } from './components/Loader';

export const App = () => {
  const {
    setProducts,
    setError,
    setTotalCount,
    products,
    cardList,
  } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [setError, setIsLoading, setProducts]);

  useEffect(() => {
    const productsOnCart = products.filter(p => cardList.includes(p.id));

    const initialTotalCount = productsOnCart.map(el => {
      const count = localStorage.getItem(el.id);

      if (count === null) {
        return {
          id: el.id,
          price: el.price,
          count: 1,
        };
      }

      return {
        id: el.id,
        price: el.price,
        count: JSON.parse(count),
      };
    });

    setTotalCount(initialTotalCount);
  }, [cardList, products, setTotalCount]);

  return (
    <div className="App">
      {isLoading
        ? <Loader />
        : (
          <>
            <Header />
            <div className="root">
              <Outlet />
            </div>
            <Footer />
          </>
        )}
    </div>
  );
};
