import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProductCard } from '@components/product/ProductCard';
import { Product } from '@/types/Product';
import { getAccessories, getPhones, getTablets } from '@api/products';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { useAppContext } from '@hooks/useAppContext';
import { Loader } from '@components/ui/Loader/Loader';
import Heart from './Heart';

import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useAppContext();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);
        setAllProducts([...phones, ...tablets, ...accessories]);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return allProducts.filter((product) =>
      favorites.includes(String(product.itemId)),
    );
  }, [allProducts, favorites]);

  if (isLoading) {
    return (
      <div className="favorites-page__loader-wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-page__container">
        <Breadcrumbs />

        <div className="favorites-page__text">
          <h1 className="favorites-page__title">{t('favorites')}</h1>
          <span className="favorites-page__items-number">
            {t('cart.total_items', { count: favoriteProducts.length })}
          </span>
        </div>

        {favoriteProducts.length > 0 ?
          <div className="favorites-page__all-favorites">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        : <div className="favorites-page__empty">
            <div className="favorites-page__heart">
              <Heart />
            </div>
            <h2 className="favorites-page__title">
              {t('page_favorites.empty_title')}
            </h2>
            <p className="favorites-page__items-number">
              {t('page_favorites.empty_text')}
            </p>
            <Link
              to="/"
              className="favorites-page__addToCart"
            >
              {t('cart.shop_now')}
            </Link>
          </div>
        }
      </div>
    </div>
  );
};
