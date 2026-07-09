import React, { useContext } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../../types';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContext';
import { FavoritesContext } from '../../../../context/FavoritesContext';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { favoritesItems, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const isInCart = cartItems.some(item => item.product.id === product.id);
  const isInFavorites = favoritesItems.some(item => item.id === product.id);

  return (
    <article className={styles.productCard}>
      <Link className={styles.productImage} to={`/product/${product.itemId}`}>
        <img className={styles.image} src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>
      <div className={styles.prices}>
        <p>${product.price}</p>
        <p>${product.fullPrice}</p>
      </div>
      <div className={styles.another_info}>
        <div className={styles.info}>
          <p>Screen</p>
          <p>{product.screen}</p>
        </div>
        <div className={styles.info}>
          <p>capacity</p>
          <p>{product.capacity}</p>
        </div>
        <div className={styles.info}>
          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        {isInCart ? (
          <button
            className={styles.addedToCart}
            onClick={() => {
              removeFromCart(product.id);
            }}
          >
            Added
          </button>
        ) : (
          <button
            className={styles.addToCart}
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to cart
          </button>
        )}
        {isInFavorites ? (
          <button
            className={styles.addedToFav}
            onClick={() => {
              removeFromFavorites(product.id);
            }}
          >
            <img
              src="img/icons/Favourites_Filled_(Heart_Like).svg"
              alt="add to favorites"
            />
          </button>
        ) : (
          <button
            className={styles.addToFav}
            onClick={() => {
              addToFavorites(product);
            }}
          >
            <img src="img/icons/Favorites.svg" alt="add to favorites" />
          </button>
        )}
      </div>
    </article>
  );
};
