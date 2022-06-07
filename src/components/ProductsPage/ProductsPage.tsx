/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { ProductsList } from '../ProductsList';
import { PageHeader } from '../PageHeader';
import { filterProducts } from '../FavouritesPage';
import { Product } from '../../types/Product';
import { getPhones, getTablets, getAccessories } from '../../api/api';

import './ProductsPage.scss';
import { NoSearchResult } from '../NoSearchResult';

type Props = {
  type: string;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [isLoad, setIsLoad] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParam] = useSearchParams();

  const filteredProducts
    = useMemo(() => filterProducts(products, searchParam),
      [searchParam, products]);

  useEffect(() => {
    switch (type) {
      case 'Phones':
        getPhones().then(setProducts).then(() => setIsLoad(false));
        break;
      case 'Tablets':
        getTablets().then(setProducts).then(() => setIsLoad(false));
        break;
      case 'Accessories':
        getAccessories().then(setProducts).then(() => setIsLoad(false));
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className="products-page">
      <div className="products-page__top">
        <PageHeader title={type} />
      </div>

      <section className="products-page__content">
        <div className="container">
          <h2 className="title products-page__title">
            {type}
          </h2>
          {products.length > 0 ? (
            <>
              <span className="products-page__item-quantity">
                { `${filteredProducts.length} ${filteredProducts.length > 1 ? ' models' : ' model'}`}
              </span>
              {isLoad && <Loader />}
              {filteredProducts.length > 0
                ? <ProductsList products={filteredProducts} />
                : <NoSearchResult />}
            </>
          ) : (
            <h3 className="info-text favourites-page__info-text">
              There are no products in this category yet
            </h3>
          )}
        </div>
      </section>
    </div>
  );
};
