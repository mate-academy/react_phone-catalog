import React from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { SecondNavBar } from '../../components/SecondNavBar/SecondNavBar';
import { NotFound } from '../../components/NotFound/NotFound';
import { ModelsCounter } from '../../components/ModelsCounter/ModelsCounter';
import { ProductList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader';
import './categoryPage.scss';

export type Props = {
  products: Product[];
  isLoading: boolean,
};

export const CategoryPage:React.FC<Props> = ({ products, isLoading }) => {
  const { pathname } = useLocation();

  const productName = pathname.slice(1);

  return (
    <>
      {!isLoading ? (
        <div className={`page__${productName}`}>
          <SecondNavBar />
          <h1 className="main-title">{productName}</h1>
          <ModelsCounter number={products.length} />

          {!products.length ? (
            <NotFound
              title={
                `Sorry, we are temporarily not selling ${productName}. 
                Please come back in a month.`
              }
            />
          ) : (
            <ProductList
              products={products}
              isSortDropdownShown
              isPaginationShown
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
