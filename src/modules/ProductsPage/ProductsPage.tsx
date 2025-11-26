//#region StateApp
import { useEffect, useState } from 'react';
//#endregion

//#region i18n
// Переводы (i18next) — доступ к функциям перевода.
import { useTranslation } from 'react-i18next';
//#endregion

//#region API / Data fetching
import { getData } from '@Fetch';
//#endregion

//#region Hooks
import { useTimer } from '../../Hooks/useTimer';
//#endregion

//#region Types
import { Products } from 'src/types/products';
//#endregion

//#region Styles
import style from './productsPage.module.scss';
//#endregion

//#region Global / Shared Components
import { ErrorComponent, ProductList, ProductsEmpty } from '@GlobalComponents';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
//#endregion

//#region Business logic / Utilities

import { getFilteredProducts } from './getProducts';
//#endregion

//#region React-router
import { useLocation } from 'react-router-dom';
//#endregion

export const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [updateAt, setUpdateAt] = useState(new Date());

  const { start, clear } = useTimer();
  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[1];
  const { t } = useTranslation();

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
                title={
                  t(`categoryDevice.${categoryName}`) || 'Loading Category'
                }
                data={products}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
};
