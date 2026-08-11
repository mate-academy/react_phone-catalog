import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useApp } from '../../context/AppContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, name, fullPrice, price, screen, capacity, ram, image } = product;
  const { cart, favorites, addToCart, toggleFavorite } = useApp();

  const isInCart = cart.some(item => item.id === id);
  const isFavorite = favorites.some(fav => fav.id === id);

  const handleCartClick = () => {
    addToCart(product);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  return (
    <article className={styles['product-card']}>
      {/*Посилання на сторінку деталей про товар*/}
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__image-link']}
      >
        {/*Контейнер для розміщення картинки*/}
        <div className={styles['product-card__image-container']}>
          {/*фото товару*/}
          <img
            src={image}
            alt={name}
            className={styles['product-card__image']}
          />
        </div>
      </Link>
      {/* Посилання на сторінку деталей по назві*/}
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__title-link']}
      >
        <h3 className={styles['product-card__title']}>{name}</h3>
      </Link>
      {/* Блок з цінами*/}
      <div className={styles['product-card__price-block']}>
        {/*Нова ціна */}
        <span className={styles['product-card__price']}>${price}</span>
        {/* Стара ціна*/}
        {fullPrice > price && (
          <span className={styles['product-card__old-price']}>
            ${fullPrice}
          </span>
        )}
      </div>
      {/* Тонка лінія-розділювач між ціною та характеристиками */}
      <div className={styles['product-card__divider']} />
      {/* Блок із характеристиками */}
      <div className={styles['product-card__specs']}>
        {/* Рядок Screen */}
        <div className={styles['product-card__spec-row']}>
          <span className={styles['product-card__spec-label']}>Screen</span>
          <span className={styles['product-card__spec-value']}>{screen}</span>
        </div>
        {/* Рядок Capacity */}
        <div className={styles['product-card__spec-row']}>
          <span className={styles['product-card__spec-label']}>Capacity</span>
          <span className={styles['product-card__spec-value']}>
            {' '}
            {capacity.replace(/(\d+)(GB)/i, '$1 $2')}
          </span>
        </div>
        {/* Рядок RAM */}
        <div className={styles['product-card__spec-row']}>
          <span className={styles['product-card__spec-label']}>RAM</span>
          <span className={styles['product-card__spec-value']}>
            {' '}
            {ram.replace(/(\d+)(GB)/i, '$1 $2')}
          </span>
        </div>
      </div>
      {/* Контейнер-обгортка для обох кнопок */}
      <div className={styles['product-card__buttons']}>
        {/* Кнопка Кошика */}
        <button
          type="button"
          className={`${styles['product-card__btn-cart']} ${
            isInCart ? styles['product-card__btn-cart--selected'] : ''
          }`}
          onClick={handleCartClick}
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        {/* Кнопка-Сердечко */}
        <button
          type="button"
          className={`${styles['product-card__btn-fav']} ${
            isFavorite ? styles['product-card__btn-fav--active'] : ''
          }`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          <img
            src={
              isFavorite ? 'img/icons/heart-red.svg' : 'img/icons/heart.svg'
            }
            alt="Favorite icon"
            className={styles['product-card__icon-heart']}
          />
        </button>
      </div>
    </article>
  );
};
