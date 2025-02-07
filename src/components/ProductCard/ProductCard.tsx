import style from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { Product } from '../../types/products';

type Props = {
  iphone: Product;
};

export const ProductCard: React.FC<Props> = ({ iphone }) => {
  return (
    <article className={style.productCard}>
      <img
        className={style.productCard__img}
        src={iphone.image}
        alt={iphone.name}
      />

      <h4 className={style.productCard__name}>{iphone.name}</h4>
      <h2 className={style.productCard__price}>${iphone.fullPrice}</h2>
      <div className={style.productCard__border}></div>

      <ul className={style.productCard__property}>
        <li className={style.productCard__label}>
          Screen
          <span className={style.productCard__value}>{iphone.screen}</span>
        </li>
        <li className={style.productCard__label}>
          Capacity
          <span className={style.productCard__value}>{iphone.capacity}</span>
        </li>
        <li className={style.productCard__label}>
          RAM
          <span className={style.productCard__value}>{iphone.ram}</span>
        </li>
      </ul>

      <div className={style.productCard__buttons}>
        <button className={style.productCard__buttons__toCartButton}>
          Add to cart
        </button>
        <Link to="./" className={style.productCard__buttons__likeLink}>
          <img
            src={'./src/assets/icons/heart-2x.png'}
            alt="heart"
            className={style.productCard__buttons__likeLink__icon}
          />
        </Link>
      </div>
    </article>
  );
};
