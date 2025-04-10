import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/DispatchSelector';
import { cartSlice } from '../../utils/cart';
import { favouriteSlice } from '../../utils/favourite';
import cn from 'classnames';
import s from './ProductCard.module.scss';

interface Props {
  product: Product;
  withFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  withFullPrice = false,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const isInCart = cart.find((item: Product) => item.id === product.id);
  const isFavourite = favourite.find((item: Product) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(cartSlice.actions.deleteFromCart(product));

      return;
    }

    dispatch(cartSlice.actions.addToCart(product));
  };

  const handleAddToFavourite = () => {
    if (isFavourite) {
      dispatch(favouriteSlice.actions.removeFromFavourite(product));

      return;
    }

    dispatch(favouriteSlice.actions.addToFavourite(product));
  };

  return (
    <article className={s.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={s.productCard__imageContainer}
      >
        <img
          src={product.image}
          alt={product.name}
          className={s.productCard__imageContainer__image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={s.productCard__title}
      >
        {product.name}
      </Link>

      <h3 className={s.productCard__price}>
        ${product.price}
        {withFullPrice && (
          <span className={s.productCard__price__fullPrice}>
            ${product.fullPrice}
          </span>
        )}
      </h3>

      <hr className={s.divider}></hr>

      <ul className={s.productCard__description}>
        <li className={s.productCard__description__item}>
          <span className={s.productCard__description__item__name}>Screen</span>
          <span className={s.productCard__description__item__value}>
            {product.screen}
          </span>
        </li>
        <li className={s.productCard__description__item}>
          <span className={s.productCard__description__item__name}>
            Capacity
          </span>
          <span className={s.productCard__description__item__value}>
            {product.capacity}
          </span>
        </li>
        <li className={s.productCard__description__item}>
          <span className={s.productCard__description__item__name}>Ram</span>
          <span className={s.productCard__description__item__value}>
            {product.ram}
          </span>
        </li>
      </ul>

      <div className={s.productCard__actions}>
        <button
          className={cn(s.productCard__actions__add, {
            [s['productCard__actions__add--selected']]: isInCart,
          })}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
        <div
          className={cn(s.productCard__actions__favourite, {
            [s['product-card__actions__favourite--selected']]: isFavourite,
          })}
          onClick={handleAddToFavourite}
        >
          {isFavourite ? (
            <img
              src="../../../public/img/icons/Favourites\ Filled.png"
              alt="Favourite"
            />
          ) : (
            <img
              src=".../../../public/img/icons/Favourites.png"
              alt="Favourite"
            />
          )}
        </div>
      </div>
    </article>
  );
};
