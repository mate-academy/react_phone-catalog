import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './FavouritesPage.module.scss';
import { useFavorites } from '../../context/Favoutires';
import { ProductCard } from '../ProductCard';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductById } from '../../api';
import { CategoryType } from '../../types/Category';
import { ShowOldPriceContext } from '../../context/OldPrice';

export const FavouritesPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const { favorites, count } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const price = useContext(ShowOldPriceContext);

  useEffect(() => {
    async function loadFavorites() {
      const [phones, tablets, accessories] = await Promise.all([
        getProductById(CategoryType.Phones),
        getProductById(CategoryType.Tablets),
        getProductById(CategoryType.Accessories),
      ]);

      const allProducts = [...phones, ...tablets, ...accessories];

      setFavoriteProducts(allProducts.filter(p => favorites.includes(p.id)));
    }

    loadFavorites();
  }, [favorites]);

  return (
    <section className="favourites">
      <div className="container">
        <Breadcrumbs category={category} product={null} />
        <h1 className={styles.favourites__title}>Favourites</h1>
        <p className={styles.favourites__items}>{count} items</p>
        <div className={styles.favourites__content}>
          {favoriteProducts.map(product => (
            <ProductCard
              product={product}
              showOldPrice={price}
              category={category as CategoryType}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
