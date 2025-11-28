import React, { useEffect, useState } from 'react';
import Loader from '../shared/components/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useFavorites } from './FavoritesContext';
import { Product } from '../../types/ProductTypes/Product';

import AddToCartButton from '../HomePage/components/AddToCart/AddToCart';

import styles from './FavoritesPage.module.scss';
import Header from '../shared/components/Header';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('/api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response not ok');
        }

        return res.json();
      })
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={() => window.location.reload()} />;
  }

  const favoriteProducts = allProducts.filter(p =>
    favorites.includes(p.itemId),
  );

  if (favoriteProducts.length === 0) {
    return (
      <div>
        <Header />
        <div className={styles.empty}>No favorite itens yet! 😔</div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className={styles.favoritesPage}>
        <h1 className={styles.title}>⭐ Favorites</h1>

        <button className={styles.clearButton} onClick={clearFavorites}>
          Clean Favorites
        </button>

        <ul className={styles.list}>
          {favoriteProducts.map(product => (
            <li key={product.itemId} className={styles.item}>
              <div className={styles.left}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
                <div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.price}>{product.price} $</p>
                </div>
              </div>

              <div className={styles.right}>
                <AddToCartButton product={product} />

                <button
                  className={styles.removeButton}
                  onClick={() => removeFavorite(product.itemId)}
                >
                  Remove product
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesPage;
