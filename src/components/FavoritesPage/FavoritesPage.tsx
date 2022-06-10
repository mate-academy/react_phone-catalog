/* eslint-disable import/no-cycle */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../PageHeader';
import { NoSearchResult } from '../NoSearchResult';
import { Product } from '../../types/Product';
import './FavouritesPage.scss';
import { List } from '../List';

type Props = {
  favouriteCount: number;
};

export const filterProducts = (
  productList: Product[], searchParam: URLSearchParams,
) => {
  const query = searchParam.get('query')?.toLowerCase();

  if (!query) {
    return [...productList];
  }

  return productList.filter(product => (
    product.name.toLowerCase().includes(query)
  ));
};

export const FavoritesPage: React.FC<Props> = ({ favouriteCount }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParam] = useSearchParams();

  const filteredProducts
    = useMemo(() => filterProducts(products, searchParam),
      [searchParam, products]);

  useEffect(() => {
    if (localStorage.getItem('favouritesItems')) {
      setProducts(JSON.parse(localStorage.getItem('favouritesItems') || ''));
    }
  }, [favouriteCount]);

  return (
    <section className="favourites-page">
      <PageHeader title="Favourites" />
      <div className="container">
        <h2 className="title favourites-page__title">
          Favourites
        </h2>
        {favouriteCount ? (
          <div className="favourites-page__content">
            {filteredProducts.length === 0 ? (
              <NoSearchResult />
            ) : (
              <>
                <h4 className="favourites-page__subtitle">
                  {`${filteredProducts.length} ${filteredProducts.length > 1 ? 'items' : 'item'}`}
                </h4>
                <div className="favourites-page__list-box">
                  <List products={filteredProducts} />
                </div>
              </>
            )}

          </div>
        ) : (
          <h3 className="info-text favourites-page__info-text">
            No products marked as favorites
          </h3>
        )}

      </div>
    </section>
  );
};
