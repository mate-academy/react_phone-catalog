import { ShortProduct } from '../../shared/models';
import style from './ProductCard.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { AddToCartBtns, FavoriteBtn } from '../ActionBtns';
import { useEffect } from 'react';

type Props = {
  product: ShortProduct;
  discount?: boolean;
};

export const ProductCard = ({ product, discount = false }: Props) => {
  return (
    <div className={style.card}>
      <Link to={`/product/${product.itemId}`} className={style.card__top}>
        <img src={`/${product.image}`} alt="" />
        <div className={style.card__title}>{product.name}</div>
        <div className={style.card__price}>
          <div>${product.price}</div>
          {discount && (
            <div className={style.card__oldPrice}>${product.fullPrice}</div>
          )}
        </div>
      </Link>

      <div className={style.card__bottom}>
        <div className={style.card__desc}>
          <div className={style.card__descContainer}>
            <div className={style.card__descTitle}>Screen</div>
            <div className={style.card__descInfo}>{product.screen}</div>
          </div>
          <div className={style.card__descContainer}>
            <div className={style.card__descTitle}>Capacity</div>
            <div className={style.card__descInfo}>{product.capacity}</div>
          </div>
          <div className={style.card__descContainer}>
            <div className={style.card__descTitle}>RAM</div>
            <div className={style.card__descInfo}>{product.ram}</div>
          </div>
        </div>
      </div>
      <div className={style.card__btnContainer}>
        <AddToCartBtns assignClassName={style.card__addBtn} product={product} />
        <FavoriteBtn product={product} assignClassName={style.card__favorite} />
      </div>
    </div>
  );
};
