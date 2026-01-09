import React, { useContext } from 'react';
import style from './Button.module.scss';
import cn from 'classnames';
import {
  DispatchFavorites,
  DispatchShop,
  StateContext,
} from '../../../provider/GlobalProvider';

import like from './images/favorites_like.svg';
import likeDark from './images/theme-dark/favorites-active.svg';
import favoriteDark from './images/theme-dark/favorites.svg';
import favorite from './images/favorites.svg';
import { Products } from '../../../types/products';
import { ThemeContext } from '../../../provider/ThemeContextProvider';

type Props = {
  productId: string;
};

export const Button: React.FC<Props> = ({ productId }) => {
  const { productList, favoritesList, shopList } = useContext(StateContext);
  const product = productList.find(
    item => item.itemId === productId,
  ) as Products;

  const dispatchFavorites = useContext(DispatchFavorites);
  const dispatchShop = useContext(DispatchShop);
  const { theme } = useContext(ThemeContext);

  const active = favoritesList.some(item => item.id === product?.id);
  const shopActive = shopList.some(item => item.id === product?.id);

  const favoriteIcon = active
    ? theme === 'white'
      ? like
      : likeDark
    : theme === 'white'
      ? favorite
      : favoriteDark;

  return (
    <div className={style.buttons}>
      <button
        className={cn(style.buttons__add, {
          [style['buttons__add--active']]: shopActive,
        })}
        onClick={() =>
          dispatchShop({ type: 'toggleProduct', payload: product })
        }
      >
        {shopActive ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={cn(style.buttons__favorite, {
          [style[`buttons__favorite--active`]]: active,
        })}
        onClick={() =>
          dispatchFavorites({ type: 'toggleProduct', payload: product })
        }
      >
        <img src={favoriteIcon} alt="like" />
      </button>
    </div>
  );
};
