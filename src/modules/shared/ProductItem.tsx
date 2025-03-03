import React from 'react';
import { Product } from './types/Product';
import style from './ProductItem.module.scss';
import { useFavourites } from './context/FavouritesContext';

type Props = {
  product: Product;
  styles?: React.CSSProperties;
  discount: boolean;
};

export const ProductItem: React.FC<Props> = ({ product, styles, discount }) => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <div className={style.product} style={styles}>
      <a href="/">
        <img
          className={style.product__image}
          src={`./${product.image}`}
          alt={product.name}
        />
      </a>
      <div className={style.product__buy}>
        <h3>
          <a href="/" className={style.product__name}>
            {product.name}
          </a>
        </h3>
        {discount ? (
          <p className={style.product__price}>
            ${product.price}
            <span className={style.product__discount}>
              ${product.fullPrice}
            </span>
          </p>
        ) : (
          <p className={style.product__price}>${product.fullPrice}</p>
        )}
      </div>
      <div className={style.product__description}>
        <div className={style.product__key}>
          <p>Screen</p>
          <p>Capacity</p>
          <p>RAM</p>
        </div>
        <div className={style.product__value}>
          <p>{product.screen}</p>
          <p>{product.capacity}</p>
          <p>{product.ram}</p>
        </div>
      </div>
      <div className={style.product__like}>
        <button className={style.product__add}>Add to cart</button>
        <div
          className={style.product__heart}
          onClick={() => toggleFavourite(product.id)}
        >
          <img
            src={
              favourites.includes(product.id)
                ? 'icons/heart-red.png'
                : 'icons/heart.png'
            }
            alt="Like"
          ></img>
        </div>
      </div>
    </div>
  );
};
