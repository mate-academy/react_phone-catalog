import { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import './FavoritesPage.scss';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const FavoritesPage: FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const queryFilter = searchParams.get('query');

  useEffect(() => {
    const stringLS = localStorage.getItem('fav');

    if (stringLS !== null) {
      setFavorites(JSON.parse(stringLS));
    }
  }, []);

  const renderFavItems = favorites.filter(el => {
    if (queryFilter?.trim()) {
      return el.name.toLowerCase().includes(queryFilter.trim().toLowerCase());
    }

    return el;
  });

  return (
    <main className="page">
      <BreadCrumbs name="Favorites" />
      {favorites.length > 0 ? (
        <div className="page__content">
          <h1 className="page__title">Favorites</h1>
          <p className="page__count">{renderFavItems.length} items</p>
          <ProductsList items={renderFavItems} setFavorites={setFavorites} />
        </div>
      ) : (
        <div className="page__content">
          <h1 className="page__title">Favorites is empty</h1>
        </div>
      )}
    </main>
  );
};
