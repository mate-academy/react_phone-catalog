import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { useCart, useFavorites } from '../../ItemsProvider';

type Props = {
  product: Product;
  classForCard?: string;
};

export const ProductCard: React.FC<Props> = ({ product, classForCard }) => {
  const { cartItems, setCartItems } = useCart();
  const { favoritesItems, setFavoritesItems } = useFavorites();

  const isFavorite = useMemo(() => {
    return favoritesItems.some(item => item.id === product.id);
  }, [favoritesItems, product.id]);

  const isCart = useMemo(() => {
    return cartItems.some(item => item.product.id === product.id);
  }, [cartItems, product.id]);

  const addToCart = () => {
    setCartItems(prev => {
      const exists = prev.some(item => item.product.id === product.id);

      if (exists) {
        return prev.filter(item => item.product.id !== product.id);
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const addToFavorites = () => {
    setFavoritesItems(prev => {
      const exists = prev.some(prod => prod.id === product.id);

      if (exists) {
        return prev.filter(prod => prod.id !== product.id);
      }

      return [...prev, product];
    });
  };

  return (
    <article className={classNames(styles.ProductCard, classForCard)}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.link}
      >
        <img src={product.image} alt={product.name} className={styles.photo} />
        <p className={styles.title}>{product.name}</p>
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.divider} />

      <table className={styles.infoTable}>
        <tbody className={styles.info}>
          <tr className={styles.infoRow}>
            <td className={styles.infoCellTitle}>Screen</td>
            <td className={styles.infoCellDetails}>{product.screen}</td>
          </tr>
          <tr className={styles.infoRow}>
            <td className={styles.infoCellTitle}>Capacity</td>
            <td className={styles.infoCellDetails}>{product.capacity}</td>
          </tr>
          <tr className={styles.infoRow}>
            <td className={styles.infoCellTitle}>RAM</td>
            <td className={styles.infoCellDetails}>{product.ram}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.buttons}>
        <button
          className={classNames(styles.buttonCard, {
            [styles['buttonCard--selected']]: isCart,
          })}
          onClick={() => {
            addToCart();
          }}
        >
          {!isCart ? 'Add to cart' : 'Added'}
        </button>
        <button
          className={classNames(styles.buttonFavorites, {
            [styles['buttonFavorites--selected']]: isFavorite,
          })}
          onClick={() => {
            addToFavorites();
          }}
        />
      </div>
    </article>
  );
};
