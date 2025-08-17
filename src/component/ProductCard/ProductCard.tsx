import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { ShoppingCart, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    fullPrice,
    priceDiscount,
    priceRegular,
    image,
    images,
    itemId,
    id,
  } = product;

  const mainImage = image || images?.[0];
  const currentPrice = priceDiscount ?? price;
  const oldPrice = priceRegular ?? fullPrice;

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const uniqueProductId = itemId || id;
  const productLink = `/product/${uniqueProductId}`;

  return (
    <div className={styles.card}>
      <Link to={productLink} className={styles.imageWrapper}>
        {mainImage && (
          <img src={`/${mainImage}`} alt={name} className={styles.image} />
        )}
      </Link>

      <Link to={productLink} className={styles.name}>
        {name}
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.currentPrice}>${currentPrice}</span>
        {oldPrice && <span className={styles.oldPrice}>${oldPrice}</span>}
      </div>

      <div className={styles.divider} />

      <div className={styles.actions}>
        <button
          className={styles.addToCart}
          onClick={() => addToCart(product)}
          type="button"
        >
          <ShoppingCart size={16} />
          Add to cart
        </button>

        <button
          className={classNames(styles.favorite, {
            [styles.activeFavorite]: isFavorite(String(uniqueProductId)),
          })}
          onClick={() => toggleFavorite(product)}
          type="button"
        >
          <Heart size={16} />
        </button>
      </div>
    </div>
  );
};
