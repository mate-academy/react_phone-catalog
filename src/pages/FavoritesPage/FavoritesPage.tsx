import React from 'react';
import { useFavorites } from '../../shared/context/Favorites';
import { Product, ShortProduct } from '../../shared/models';
import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

type FavoriteItem = ShortProduct | Product;

export const FavoritesPage: React.FC = () => {
  const { favoritesItems } = useFavorites();

  const isShortProduct = (p: FavoriteItem): p is ShortProduct =>
    (p as ShortProduct).itemId !== undefined;

  const tranformToShortProduct = (p: FavoriteItem): ShortProduct => {
    if (isShortProduct(p)) {
      return p;
    }
    return {
      id: 0,
      category: p.category,
      itemId: p.id.toString(),
      name: p.name,
      fullPrice: p.priceRegular,
      price: p.priceDiscount,
      screen: p.screen,
      capacity: p.capacity,
      color: p.color,
      ram: p.ram,
      year: 0,
      image: p.images[0],
    };
  };

  const favoritesAsShort: ShortProduct[] = favoritesItems.map(
    tranformToShortProduct,
  );

  return (
    <div className={`${styles.favorites} container`}>
      <Breadcrumbs />
      <h1>Favorites</h1>
      <div className={styles.favorites__count}>
        {favoritesAsShort.length} items
      </div>
      <div className={styles.favorites__products}>
        {favoritesAsShort.map(product => (
          <ProductCard
            key={product.itemId}
            product={product}
            discount={false}
          />
        ))}
      </div>
    </div>
  );
};
