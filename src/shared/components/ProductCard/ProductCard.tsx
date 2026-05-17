import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';
import { AllProducts } from '../../types/AllProducts/AllProducts';

// eslint-disable-next-line
import FavoriteIcon from '../../../assets/icons/favorites-icon/favorites-icon.svg';
// eslint-disable-next-line
import FavoriteAddedIcon from '../../../assets/icons/favorites-icon/favorites-icon-added.svg';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addCartProduct } from '../../../store/cartSlice/cartSlice';
import {
  addFavoritesProduct,
  deleteFavoritesProduct,
} from '../../../store/favoritesSlice/favoritesSlice';

type Props = {
  product: AllProducts;
  isHotPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isHotPrice }) => {
  const favoritesProduct = useAppSelector(state => state.favorites);
  const cartsProduct = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleFavoritesProducts = (value: AllProducts) => {
    const isFavorites = favoritesProduct.some(
      favorite => favorite.id === value.id,
    );

    if (isFavorites) {
      dispatch(deleteFavoritesProduct(value.id));
    } else {
      dispatch(addFavoritesProduct(value));
    }
  };

  const handleCart = (value: AllProducts) => {
    const newCartItem = {
      id: value.id,
      quantity: 1,
      product: value,
    };

    dispatch(addCartProduct(newCartItem));
  };

  const isFavorites = (id: number) => {
    return favoritesProduct.some(favoriteProduct => favoriteProduct.id === id);
  };

  const isCart = (id: number) => {
    return cartsProduct.some(cartsProducts => cartsProducts.id === id);
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
      {isHotPrice ? (
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
        <button
          className={styles.productCard__addToCart}
          disabled={isCart(product.id)}
          aria-label="Додати до корзини"
          onClick={() => handleCart(product)}
        >
          Add to cart
        </button>
        <button
          className={styles.productCard__addToFavorites}
          aria-label="Додати до улюбленого"
          onClick={() => handleFavoritesProducts(product)}
        >
          <img
            loading="lazy"
            src={isFavorites(product.id) ? FavoriteAddedIcon : FavoriteIcon}
            alt="Іконка для додавання в улюбленні"
          />
        </button>
      </div>
    </div>
  );
};
