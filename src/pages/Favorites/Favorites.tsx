import React from 'react';
import { Link } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import './Favorites.scss';

export const Favorites: React.FC = () => {
  const { state } = useFavorites();
  const { t } = useLanguage();

  return (
    <section className="favorites-page">      
      <nav className="favorites-page__breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="favorites-page__home-link" aria-label="Home">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6.5L8 2L14 6.5V13.5C14 13.7761 13.7761 14 13.5 14H10V10H6V14H2.5C2.22386 14 2 13.7761 2 13.5V6.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="favorites-page__arrow">&gt;</span>
        <span className="favorites-page__current">{t('favorites')}</span>
      </nav>

      <h1 className="favorites-page__title">{t('favorites')}</h1>
      <p className="favorites-page__count">
        {state.items.length} {t('models') || 'models'}
      </p>

      {state.items.length === 0 ? (
        <p className="favorites-page__empty">{t('favoritesEmpty')}</p>
      ) : (
        <ProductsList products={state.items} />
      )}
    </section>
  );
};