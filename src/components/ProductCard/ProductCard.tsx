import React, { useState } from 'react';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { ButtonAddToCart } from '../UI/ButtonAddToCart';
import { ButtonFavorite } from '../UI/ButtonFavorite';

type Props = {
  product?: Product;
};

export const ProductCard: React.FC<Props> = ({}) => {
  const [product] = useState<Product>({
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-7-32gb-black',
    name: 'Apple iPhone 7 32GB Black',
    fullPrice: 400,
    price: 375,
    screen: "4.7' IPS",
    capacity: '32GB',
    color: 'black',
    ram: '2GB',
    year: 2016,
    image: 'img/phones/apple-iphone-7/black/00.webp',
  });
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    setInCart(state => !state);
  };

  const handleAddToFavorite = () => {
    setIsFavorite(state => !state);
  };

  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__image-wrapper']}>
        <img
          className={styles['product-card__image']}
          src={product.image}
          alt="Product Photo"
        />
      </div>
      <p className="main-text">{product.name}</p>
      <h3>
        {product.fullPrice}{' '}
        {product.price && (
          <span className="main-text--secondary price-discount">
            ${product.price}
          </span>
        )}
      </h3>
      <div className={styles['product-card__divider']}></div>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        Screen <span className="main-text--primary">{product.screen}</span>
      </p>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        Capacity <span className="main-text--primary">{product.capacity}</span>
      </p>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        RAM <span className="main-text--primary">{product.ram}</span>
      </p>
      <div className={styles['product-card__buttons-wrapper']}>
        {inCart ? (
          <ButtonAddToCart variant="selected" onClick={handleAddToCart}>
            Added
          </ButtonAddToCart>
        ) : (
          <ButtonAddToCart onClick={handleAddToCart}>
            Add to cart
          </ButtonAddToCart>
        )}

        <ButtonFavorite selected={isFavorite} onClick={handleAddToFavorite} />
      </div>
    </article>
  );
};
