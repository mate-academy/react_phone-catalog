import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useState } from 'react';
import heart from '../../assets/icons/heart.svg';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
  const { name, category, capacity, fullPrice, price, screen, ram, image } =
    product;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleCartItem = (cardProduct: Product) => {
    return cardProduct || selectedProduct;
  };

  const toggleFavoritesItem = (cardProduct: Product) => {
    return cardProduct;
  };

  return (
    <li className={styles.productCard}>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles.productCard__image}
        onClick={() => {
          setSelectedProduct(product);
        }}
      >
        <img src={image} alt={name} />
      </Link>

      <p className={`${styles.productCard__title} body-text`}>{name}</p>

      <div className={styles.productCard__prices}>
        <h3 className={styles.productCard__price}>${price}</h3>
        {showFullPrice && (
          <h3 className={styles.productCard__fullPrice}> ${fullPrice}</h3>
        )}
      </div>

      <div className={styles.productCard__divider}></div>

      <div className={styles.productCard__features}>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>Screen:</span>
          <span className={styles.productCard__value}>{screen}</span>
        </p>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>Capacity:</span>
          <span className={styles.productCard__value}>{capacity}</span>
        </p>
        <p className={styles.productCard__item}>
          <span className={styles.productCard__property}>RAM:</span>
          <span className={styles.productCard__value}>{ram}</span>
        </p>
      </div>

      <div className={styles.productCard__buttons}>
        <button
          className={styles.productCard__button_addToCart}
          onClick={() => toggleCartItem(product)}
          style={{
            backgroundColor: '#4219d0',
            // backgroundColor: isInCart ? '#323542' : '#4219d0',
          }}
        >
          Add to cart
          {/* {isInCart ? 'Added' : 'Add to cart'} */}
        </button>
        <button
          className={styles.productCard__button_favorites}
          onClick={() => toggleFavoritesItem(product)}
        >
          <img src={heart} alt="Icon-heart" className={styles.heartIcon} />
        </button>
      </div>
    </li>
  );
};
