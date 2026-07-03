import { Link } from 'react-router-dom';
import styles from './ProductCarts.module.scss';
import { Products } from '../../types/Alltypes';

import React from 'react';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Products;
  isNew?: boolean;
};

export const ProductCarts: React.FC<Props> = ({ product, isNew }) => {
  if (!product) {
    return null;
  }

  const { cart, favorites, addToCart, toggleFavorite } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCart();

  const {
    id,
    category,
    itemId,
    fullPrice,
    image,
    name,
    price,
    screen,
    capacity,
    ram,
  } = product;

  const isProductInCart = cart.some(item => item.product.id === id);
  const isProductFavorite = favorites.includes(itemId);

  const handleCartClick = () => {
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  return (
    <article className={styles.container}>
      <Link to={`/${category}/${itemId}`} className={styles.productCart}>
        <img className={styles.cardPhoto} src={image} alt={name} />
      </Link>
      <Link to={`/${category}/${itemId}`}>
        <h2 className={styles.productCart}>{name}</h2>
      </Link>

      <div className={styles.cardPriceGoup}>
        <span className={styles.cardPriceHot}>${price}</span>
        {!isNew && (
          <span className={styles.cardfullPriceHot}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.cardSpes}>
        <div className={styles.screen}>
          <span>Screen</span>
          <strong className={styles.strong}>{screen}</strong>
        </div>
        <div className={styles.capacity}>
          <span>Capacity</span>
          <strong className={styles.strong}>{capacity}</strong>
        </div>
        <div className={styles.ram}>
          <span>Ram</span>
          <strong className={styles.strong}>{ram}</strong>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cardToAdd} ${isProductInCart ? styles.added : ''}`}
          onClick={handleCartClick}
        >
          {isProductInCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.buttonToFavorites} ${isProductFavorite ? styles.favoriteActive : ''}`}
          onClick={() => toggleFavorite(itemId)}
        >
          <img
            src={isProductFavorite ? '/img/filled.svg' : '/img/favorites.svg'}
            className={styles.iconImgFavorites}
            alt="Favourites"
          />
        </button>
      </div>
    </article>
  );
};
