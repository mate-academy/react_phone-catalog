import { useContext, useEffect, useState } from 'react';
import styles from './FavoritesPage.module.scss';
/* eslint max-len: off */
import { AddAndFavoritesContext } from '../../components/context/AddAndFavoritesContext';
import { AllProductsType } from '../../types/AllProductsType';
import { LocationNav } from '../../LocationNav';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { favorites } = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInFavorites = allProducts.filter(product =>
      favorites.includes(product.id),
    );

    setProducts(productsInFavorites);
  }, [favorites, allProducts]);

  return (
    <div className={styles.favoritesPage}>
      <LocationNav />

      <div className={styles.titleBlock}>
        <div className={styles.pageTitle}>Favorites</div>
        <p className={styles.mainText}>{favorites.length} items</p>
      </div>

      <div className={styles.categoryModels}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={product.year < 2021}
          />
        ))}
      </div>
    </div>
  );
};
