import React from 'react';
import { Product } from '../../../../types/Products';
import s from './ProductCards.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
  cardWidth?: React.RefObject<HTMLDivElement>;
};

export const ProductCards: React.FC<Props> = ({ products, cardWidth }) => {
  return (
    <>
      {products.map(product => (
        <div
          className={s.card}
          key={product.id}
          ref={products[0].id === product.id ? cardWidth : null}
        >
          <Link to={`${product.id}`} className={s.card__link}></Link>
          <div className={s.card__img}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={s.card__title}>{product.name}</div>
          <div className={s.card__price}>
            <h3>${product.price}</h3>
            <h3 className={s.card__full_price}>{product.fullPrice}</h3>
          </div>
          <div className={s.card__divider}></div>
          <div className={s.card__specs}>
            <div className={s.card__specs_screen}>
              <p>Screen</p>
              {product.screen}
            </div>
            <div className={s.card__specs_capacity}>
              <p>Capacity</p>
              {product.capacity}
            </div>
            <div className={s.card__specs_ram}>
              <p>RAM</p>
              {product.ram}
            </div>
          </div>
          <div className={s.card__buttons}>
            <button className={s.card__buttons_add}>Add to cart</button>
            <button className={s.card__buttons_like}>
              <img src="./img/icons/like.png" alt="like" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
