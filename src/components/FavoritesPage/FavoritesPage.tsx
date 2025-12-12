import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectFavorites,
  selectFavoritesCount,
} from '../../features/favorites';
import { ProductCard } from '../ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

export const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();

  const favorites = useAppSelector(selectFavorites);
  const count = useAppSelector(selectFavoritesCount);

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs__link">
          <div className="home-icon"></div>
        </Link>
        <div className="arrow-icon"></div>
        <p className="breadcrumbs__title">{t('favourites')}</p>
      </div>

      <div className="favorites">
        <h1 className="favorites__title">{t('favourites')}</h1>
        <p className="favorites__subtitle">
          {count} {t('items')}
        </p>
        {favorites.length === 0 ? (
          <p className="favorites__empty">{t('nothing-here')}</p>
        ) : (
          <div className="favorites__list">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
