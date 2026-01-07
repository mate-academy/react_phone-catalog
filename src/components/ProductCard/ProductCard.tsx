import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  // 1. Wyciągamy funkcje z Contextu
  const { addToCart, cartItems } = useCart();
  const { addToFav, removeFromFav, favItems } = useFav();

  // 2. Sprawdzamy statusy
  const isAdded = cartItems.some(item => item.id === product.id);
  const isFav = favItems.some(item => item.id === product.id);

  const { name, fullPrice, price, screen, capacity, ram, image, itemId } =
    product;

  // 3. Obsługa dodawania do koszyka
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // 4. 👇 TEJ FUNKCJI BRAKOWAŁO - Obsługa Ulubionych
  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ważne: żeby nie wchodzić w link produktu po kliknięciu serca

    if (isFav) {
      removeFromFav(product.id);
    } else {
      addToFav(product);
    }
  };

  return (
    <article className={styles.card}>
      <Link to={`/phones/${itemId}`} className={styles.imageLink}>
        <img src={`/${image}`} alt={name} className={styles.image} />
      </Link>

      <Link to={`/phones/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice !== price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={cn(styles.addToCartBtn, { [styles.selected]: isAdded })}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={cn(styles.favoriteBtn, { [styles.isFav]: isFav })}
          onClick={handleFavClick} // Teraz to zadziała, bo funkcja istnieje wyżej
        >
          {isFav ? '❤️' : '♡'}
        </button>
      </div>
    </article>
  );
};
