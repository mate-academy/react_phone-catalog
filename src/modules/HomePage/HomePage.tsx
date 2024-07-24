import { Outlet } from 'react-router-dom';
import { Main } from './components/Main';
import React, { memo, useContext, useEffect, useState } from 'react';
import { getProducts } from '../utils/getProduct';
import { DispatchContext } from '../utils/GlobalStateProvider';

type Props = {
  minLoadDelay: number;
};

// eslint-disable-next-line react/display-name
export const Home: React.FC<Props> = memo(({ minLoadDelay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setIsLoading(true);

    getProducts('api/products.json')
      .then(products => {
        dispatch({ type: 'setProducts', payload: products });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, minLoadDelay);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    document.title = 'Phone catalog';
  }, []);

  return (
    <>
      <div className="home">
        <Main isLoading={isLoading} />
      </div>
      <Outlet />
    </>
  );
});
