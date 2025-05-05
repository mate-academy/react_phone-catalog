import cl from 'classnames';
import HeartIcon from '../../img/icons/icon-heart.svg?react';
import ShopIcon from '../../img/icons/icon-shop.svg?react';
import s from './IconsFavoriteShop.module.scss';
import { NavLink } from 'react-router-dom';
import { LINK_TO } from '../../constants';
import { useMenu } from '../../context/MenuContext';
import { useAppSelector } from '../../hooks';

type Props = {
  className: string;
};

export const IconsFavoriteShop: React.FC<Props> = ({ className = '' }) => {
  const favorites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);
  const menu = useMenu();

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cl('icon-header', {
      'icon-header--active': isActive,
      [s.IconsFavoriteShop__iconsMenu]: menu,
    });

  return (
    <div className={className}>
      <NavLink to={LINK_TO.FAVORITES} className={getIconClass}>
        <HeartIcon className={`icon ${s.IconsFavoriteShop__heartIcon}`} />
        {favorites.length > 0 && (
          <span className={s.IconsFavoriteShop__count}>{favorites.length}</span>
        )}
      </NavLink>
      <NavLink to={LINK_TO.SHOP} className={getIconClass}>
        <ShopIcon className="icon" />
        {cart.length > 0 && (
          <span className={s.IconsFavoriteShop__count}>{cart.length}</span>
        )}
      </NavLink>
    </div>
  );
};
