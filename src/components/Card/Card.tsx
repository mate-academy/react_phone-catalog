import React from 'react';
import { ProductType } from '../../types/ProductType';
import style from './Card.module.scss';
import { Pages } from '../../enums/Pages';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { AddCardButton } from '../AddCardButton/AddCardButton';
import { AddFavButton } from '../AddFavButton/AddFavButton';
import { HeartIcon } from '../Icons/HeartIcon';
import { HeartIconFilled } from '../Icons/HeartIconFilled';

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <li className={`${style.card} ${style[`Card_${page}`]}`}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={style.card__imgContainer}
      >
        <img
          src={product.image}
          alt={product.name}
          className={style.card__img}
          onClick={handleScrollToTop}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={style.card__title}
        onClick={handleScrollToTop}
      >
        {product.name}
      </Link>

      <h3 className={style.card__price}>
        <span>${product.price}</span>
        <span className={style.card__price_old}>${product.fullPrice}</span>
      </h3>

      <div className={style.card__info}>
        <div className={style.card__info_text}>
          <span>Screen</span>
          <span className={style.card__info_text_desc}>{product.screen}</span>
        </div>

        <div className={style.card__info_text}>
          <span>Capacity</span>
          <span className={style.card__info_text_desc}>{product.capacity}</span>
        </div>

        <div className={style.card__info_text}>
          <span>RAM</span>
          <span className={style.card__info_text_desc}>{product.ram}</span>
        </div>
      </div>

      <div className={style.card__button}>
        <AddCardButton product={product} isInCart={!!isInCart}>
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </AddCardButton>

        <AddFavButton product={product} isFavourite={!!isFavourite}>
          {isFavourite ? <HeartIconFilled /> : <HeartIcon count={0} />}
        </AddFavButton>
      </div>
    </li>
  );
};
