import React from 'react';
import { Product } from '../../types/Product';
import style from './Card.module.scss';
import { Link } from 'react-router-dom';
import { useCartDispatch, useCartState } from '../../store/CartProvider';
import classNames from 'classnames';
import {
  useFavoritesDispatch,
  useFavoritesState,
} from '../../store/FavouritesProvider';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

type Props = {
  product: Product;
  fullPrice: boolean;
};

export const Card: React.FC<Props> = ({ product, fullPrice }) => {
  const productUrl = `/${product.category}/${product.itemId}`;
  const { items } = useCartState();
  const { favItems } = useFavoritesState();
  const { theme } = useTheme();
  const cartDispatch = useCartDispatch();
  const favDispatch = useFavoritesDispatch();
  const isAdded = items.some(item => item.id === product.itemId);
  const favIsAdded = favItems.some(favItem => favItem.id === product.id);

  const handleToggleCart = () => {
    if (isAdded) {
      cartDispatch({ type: 'DELETE_ITEM', payload: product.itemId });
    } else {
      cartDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleToggleFav = () => {
    favDispatch({ type: 'TOGGLE_FAVORITE', payload: product });
  };

  return (
    <div className={style.card}>
      <Link to={productUrl}>
        <img
          src={product.image}
          alt={product.name}
          className={style.card__image}
        />
      </Link>
      <Link to={productUrl} className={style.card__link}>
        <h3 className={style.card__name}>{product.name}</h3>
      </Link>
      <div className={style.card__priceWrapper}>
        <p className={style.card__price}>${product.price}</p>
        {fullPrice && (
          <p className={style.card__discount}>${product.fullPrice}</p>
        )}
      </div>
      <div className={style.card__characteristics}>
        <div className={style.card__characteristic}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={style.card__characteristic}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={style.card__characteristic}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
      <div className={style.card__buttons}>
        <button
          className={classNames(style.card__addButton, {
            [style.card__addedButton]: isAdded,
          })}
          onClick={handleToggleCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>
        <button className={style.card__favButton} onClick={handleToggleFav}>
          {favIsAdded ? (
            <img src="/img/favourites-active.svg" alt="fav-active" />
          ) : (
            <img src={theme === 'dark' ? ICONS.darkFav : ICONS.fav} alt="fav" />
          )}
        </button>
      </div>
    </div>
  );
};
