import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import classNames from 'classnames';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { favorites, setFavorites } = useContext(DataContext);

  const toggleCartItem = (cardProduct: Product) => {
    return cardProduct || selectedProduct;
  };

  const isInFavorites = (cardProduct: Product) => {
    return favorites.some(fav => fav.id === cardProduct.id);
  };

  const toggleFavoritesItem = (cardProduct: Product) => {
    const newFavorites = isInFavorites(cardProduct)
      ? favorites.filter(fav => fav.id !== cardProduct.id)
      : [...favorites, cardProduct];

    setFavorites(newFavorites);
  };

  const { name, category, capacity, fullPrice, price, screen, ram, image } =
    product;

  return (
    <div className={styles.productCard}>
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
          className={`${styles.productCard__addToCart} ${styles.productCard__addToCart_active}`}
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
          className={classNames(
            styles.productCard__addToFavorites,
            isInFavorites(product) && styles.productCard__addToFavorites_active,
          )}
          onClick={() => toggleFavoritesItem(product)}
        ></button>
      </div>
    </div>
  );
};
