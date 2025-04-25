import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import { AllProducts } from '../../types/AllProducts/AllProducts';
import {
  FavoritesDispatchContext,
  FavoritesStateContext,
} from '../../store/FavoritesProvider';

type Props = {
  product: AllProducts & { hotPrice?: number };
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const favoritesProduct = useContext(FavoritesStateContext);
  const dispatch = useContext(FavoritesDispatchContext);

  const handleFavoritesProducts = (value: AllProducts) => {
    const isFavorites = favoritesProduct.some(
      favorite => favorite.id === value.id,
    );

    if (isFavorites) {
      dispatch({ type: 'deleteFavoritesProduct', payload: value.id });
    } else {
      dispatch({ type: 'addFavoritesProduct', payload: value });
    }
  };

  const isFavorites = (id: number) => {
    return favoritesProduct.some(favoriteProduct => favoriteProduct.id === id);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          loading="lazy"
          className={styles.productCard__mainImage}
          src={`${product.image}`}
          alt="Зображення продукту"
        />
      </Link>
      <p className={styles.productCard__description}>{product.name}</p>
      {product?.hotPrice ? (
        <div className={styles.productCard__priceContainer}>
          <h3 className={styles.productCard__price}>{`$${product.price}`}</h3>
          <h3
            className={styles.productCard__fullPrice}
          >{`$${product.fullPrice}`}</h3>
        </div>
      ) : (
        <h3 className={styles.productCard__price}>{`$${product.fullPrice}`}</h3>
      )}
      <span className={styles.productCard__line}></span>
      <div className={styles.productCard__featureWrapper}>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Screen</p>
          <p className={styles.productCard__featureValue}>{product.screen}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Capacity</p>
          <p className={styles.productCard__featureValue}>{product.capacity}</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>RAM</p>
          <p className={styles.productCard__featureValue}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button className={styles.productCard__addToCart}>Add to cart</button>
        <button
          className={styles.productCard__addToFavorites}
          onClick={() => handleFavoritesProducts(product)}
        >
          <img
            loading="lazy"
            src={`src/assets/images/productsSlider/${isFavorites(product.id) ? 'favorites-icon-added.svg' : 'favorites-icon.svg'}`}
            alt="Іконка для додавання в улюбленні"
          />
        </button>
      </div>
    </div>
  );
};
