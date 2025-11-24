import { useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getData } from '@Fetch';

import { Products } from 'src/types/products';

import style from './productsPage.module.scss';

import { useTimer } from '../../Hooks/useTimer';
import { getFilteredProducts } from './getProducts';
import { ErrorComponent, ProductList, ProductsEmpty } from '@GlobalComponents';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

export const ProductsPage = () => {
  const { start, clear } = useTimer();

  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[1];

  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [updateAt, setUpdateAt] = useState(new Date());

  function reload() {
    setUpdateAt(new Date());
    setIsError(false);
  }

  useEffect(() => {
    setIsLoading(true);

    start(() => {
      getData<Products[]>('/products')
        .then((data: Products[]) => {
          const result = getFilteredProducts(data, categoryName);

          setProducts(result);
        })
        .catch(error => {
          setIsError(true);

          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => {
      clear();
    };
  }, [categoryName, start, clear, updateAt]);

  return (
    <>
      <div className="container">
        <main className={style.main}>
          <section>
            <Breadcrumb />

            {isError && <ErrorComponent onRestart={reload} />}

            {!isLoading && !isError && products.length === 0 && (
              <ProductsEmpty title={categoryName || 'empty'} />
            )}

            {!isError && (isLoading || products.length > 0) && (
              <ProductList
                isLoading={isLoading}
                title={categoryName || 'Loading Category'}
                data={products}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
};
