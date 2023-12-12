import React, { useContext } from 'react';
import './FavoritesPage.scss';
import { BreadCrambs } from '../../components/BreadCrambs';
import { FavoriteContext } from '../../api/context/FavotiteContext';
import { ProductList } from '../../components/ProductList';
import { CardEmpty } from '../../components/CardEmpty';

export const FavoritesPage: React.FC = () => {
  const { favProducts } = useContext(FavoriteContext);

  return (
    <div className="favoritesPage">
      <BreadCrambs />
      <h1 className="favoritesPage__title">
        Favourites
      </h1>

      <div className="favoritesPage__content">
        <p className="favoritesPage__amount">
          {favProducts.length !== 1 ? (
            `${favProducts.length} items`
          ) : (
            '1 item'
          )}
        </p>

        {!favProducts.length ? (
          <CardEmpty />
        ) : (
          favProducts.length !== 0 && (
            <ProductList products={favProducts} />)
        )}
      </div>
    </div>
  );
};
