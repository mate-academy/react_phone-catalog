import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './FavoritesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { getLocalStorage } from '../../helpers/utils/getLocalStorage';
import { Direction } from '../../components/Direction';
import { ProductContext } from '../../helpers/utils/productsContext';
import { Product } from '../../helpers/types/Product';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';

type Props = {};

export const FavoritesPage: React.FC<Props> = () => {
  const { products } = useContext(ProductContext);
  const [favoritesGoods, setFavoritesGoods] = useState<Product[]>();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const getFavorites = () => {
    const favoriteIds = getLocalStorage<string[]>('favorites');

    if (products) {
      if (favoriteIds === null) {
        setFavoritesGoods([]);
      }

      if (favoriteIds) {
        const newFavoritesGoods = products.filter(p => {
          const loverName = p.name.toLocaleLowerCase();

          return favoriteIds.includes(p.itemId) && loverName.includes(query);
        });

        setFavoritesGoods(newFavoritesGoods);
      }
    }
  };

  const storageEventHandler = () => {
    getFavorites();
  };

  useEffect(() => {
    window.addEventListener('storage', storageEventHandler);

    getFavorites();

    return () => {
      window.removeEventListener('storage', storageEventHandler);
    };
  }, []);

  useEffect(() => {
    getFavorites();
  }, [searchParams]);

  return (
    <main className="favorites-page">
      <div className="container">
        <div className="favorites-page__content">
          <div className="favorites-page__direction">
            <Direction path={[{ name: 'favorites', path: `/favorites` }]} />
          </div>

          <div className="favorites-page__title">
            <h1 className="favorites-page__main-title">Favorites</h1>
            {favoritesGoods && (
              <span className="favorites-page__side-title">{`${favoritesGoods.length} models`}</span>
            )}
          </div>

          {favoritesGoods ? (
            <>
              {favoritesGoods.length === 0 ? (
                <NoResults categoryName="favorites" />
              ) : (
                <ProductsList
                  filteredProducts={favoritesGoods}
                  hasOnlyOnePage
                />
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </main>
  );
};
