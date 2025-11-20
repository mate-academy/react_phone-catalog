import React, { useContext } from 'react';
import styles from './ProductCard.module.scss';
import { UiProduct } from '../ProductsSlider/ProductSlider';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { CartContext, CartItem } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  product: UiProduct;
  showOldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showOldPrice }) => {
  const { title, img, price, fullPrice, screen, capacity, ram } = product;

  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const favorite = favorites.map(e => e.id).includes(product.id);

  const hasCartItem = cartItems.some(item => item.id === product.id);

  function handleToggleFavorite() {
    if (!favorite) {
      setFavorites(prev => [...prev, product]);
    } else {
      setFavorites(prev => prev.filter(p => product.id !== p.id));
    }
  }

  function handleAddToCart() {
    if (!hasCartItem) {
      const newCartItem: CartItem = {
        id: product.id,
        quantity: 1,
        product,
      };

      setCartItems(prev => [...prev, newCartItem]);
    }
  }

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        <img src={img} alt={title} className={styles.image} />
      </Link>

      <h3 className={styles.title}>
        <Link to={`/product/${product.id}`}>{title}</Link>
      </h3>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${price}</span>
        {showOldPrice && <span className={styles.oldPrice}>${fullPrice}</span>}
      </div>
      <ul className={styles.details}>
        <li>
          <span>Screen</span>
          <span>{screen}</span>
        </li>
        <li>
          <span>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li>
          <span>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button
          data-added={hasCartItem}
          className={styles.addToCart}
          onClick={handleAddToCart}
        >
          {hasCartItem ? 'Added' : 'Added to cart'}
        </button>

        <button
          data-selected={favorite}
          className={styles.favorite}
          onClick={handleToggleFavorite}
        >
          <img
            src={
              favorite
                ? '/icons/heart_selected.svg'
                : '/icons/heart_default.svg'
            }
            alt={favorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        </button>
      </div>
    </article>
  );
};
