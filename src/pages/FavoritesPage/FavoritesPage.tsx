import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './FavoritesPage.scss';
import { BreadCrambs } from '../../components/BreadCrambs';
import { FavoriteContext } from '../../api/context/FavotiteContext';
import { ProductList } from '../../components/ProductList';
import { CardEmpty } from '../../components/CardEmpty';
import { Filter } from '../../helpers/Filters';

export const FavoritesPage: React.FC = () => {
  const { favProducts } = useContext(FavoriteContext);
  const [searchParams] = useSearchParams();
  const filteredProducts = useMemo(() => {
    return Filter(favProducts, searchParams);
  }, [favProducts, searchParams]);

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
          filteredProducts.length !== 0 && (
            <ProductList products={filteredProducts} />)
        )}
      </div>
    </div>
  );
};
