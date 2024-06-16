import React, { useContext } from 'react';
import './Favorites.scss';
import cn from 'classnames';
import { ItemsContext } from '../../ItemsContext';
import { ProductsList } from '../ProductsList';
import { Link, useOutletContext } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favoriteProducts } = useContext(ItemsContext);

  const darkTheme = useOutletContext<boolean>();

  return (
    <section className="favorites-page">
      <div className="favorites-page__bread-crumbs bread-crumbs">
        <Link
          to="/"
          className={cn('bread-crumbs__home-link icon-home', {
            'bread-crumbs__home-link--dark-theme': darkTheme,
          })}
        ></Link>
        <div className="bread-crumbs__arrow icon-arrow-right"></div>
        <Link
          to="."
          className="bread-crumbs__link bread-crumbs__link--selected"
        >
          Favorites
        </Link>
      </div>

      <h1 className="favorites-page__title title title--big">Favorites</h1>

      <p className="favorites-page__number-of-models">{`${favoriteProducts.length} models`}</p>
      <ProductsList products={favoriteProducts} />
    </section>
  );
};
