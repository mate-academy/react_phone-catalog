import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import './FavouritesCart.scss';

interface Options {
  isActive: boolean;
}

const getLinkIconClass = ({ isActive }: Options) =>
  cn('header__button', {
    'nav__item--is-active': isActive,
  });

export const FavouritesCart = () => {
  const cartProducts: number = useAppSelector(state => state.cart.items).length;
  const favouriteProducts: number = useAppSelector(
    state => state.favourite.items.length,
  );

  return (
    <div className="favourites-cart">
      <NavLink
        to="/favourites"
        className={({ isActive }) =>
          cn(getLinkIconClass({ isActive }), 'header__button--favourites')
        }
      >
        {favouriteProducts > 0 && (
          <div className="header__button__icon">{favouriteProducts}</div>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          cn(getLinkIconClass({ isActive }), 'header__button--cart')
        }
      >
        {cartProducts > 0 && (
          <div className="header__button__icon">{cartProducts}</div>
        )}
      </NavLink>
    </div>
  );
};
