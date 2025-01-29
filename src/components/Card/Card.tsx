import React from 'react';

import style from './Card.module.scss';
import { ProductType } from '../../types/ProductType';
import { Pages } from '../../enums/Pages';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { AddCartButton } from '../AddCartButton/AddCartButton';
import { AddFavButton } from '../AddFavButton/AddFavButton';
import { HeartIconFilled } from '../Icons/HeartIconFilled';
import { HeartIcon } from '../Icons/HeartIcon';

interface Props {
  product: ProductType;
  page?: Pages;
}

export const Card: React.FC<Props> = ({ product, page }) => {
  const { state } = useStateContext();
  const isInCart = state.cart.find(item => item.itemId === product.itemId);
  const isFavourite = state.favourites.find(
    fav => fav.itemId === product.itemId,
  );

  if (!product) {
    return null;
  }

  return (
    <li className={`${style.Card} ${style[`Card_${page}`]}`}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={style.Card__ImageContainer}
      >
        <img
          src={product.image}
          alt={product.name}
          className={style.Card__img}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={style.Card__title}
      >
        {product.name}
      </Link>

      <h3 className={style.Card__price}>
        <span>${product.price}</span>
        <span className={style.Card__price_old}>{product.fullPrice}</span>
      </h3>

      <div className={style.Card__info}>
        <div className={style.Card__info__text}>
          <span>Screen:</span>
          <span className={style.Card__info__text_description}>
            {' '}
            {product.screen}
          </span>
        </div>

        <div className={style.Card__info__text}>
          <span>Capacity</span>
          <span className={style.Card__info__text_description}>
            {' '}
            {product.capacity}
          </span>
        </div>

        <div className={style.Card__info__text}>
          <span>RAM</span>
          <span className={style.Card__info__text_description}>
            {' '}
            {product.ram}
          </span>
        </div>

        <div className={style.Card__button}>
          <AddCartButton product={product} isInCart={!!isInCart}>
            {isInCart ? 'Remove' : 'Add to Cart'}
          </AddCartButton>
          <AddFavButton product={product} isFavourite={!!isFavourite}>
            {isFavourite ? <HeartIconFilled /> : <HeartIcon />}
          </AddFavButton>
        </div>
      </div>
    </li>
  );
};
