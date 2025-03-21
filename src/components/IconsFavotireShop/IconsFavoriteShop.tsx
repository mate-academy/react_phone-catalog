import cl from 'classnames';
import { useFavorite } from '../../context/FavoriteContext';
import { useShop } from '../../context/ShopContext';
import { NavLink } from 'react-router-dom';
import { LINK_TO } from '../../constants';
import s from './IconsFavoriteShop.module.scss';
import { useMenu } from '../../context/MenuContext';

type Props = {
  className: string;
};

export const IconsFavoriteShop: React.FC<Props> = ({ className = '' }) => {
  const favorite = useFavorite();
  const shop = useShop();
  const menu = useMenu();

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cl('icon-header', {
      'icon-header--active': isActive,
      [s.IconsFavoriteShop__iconsMenu]: menu,
    });

  return (
    <div className={className}>
      <NavLink to={LINK_TO.FAVORITES} className={getIconClass}>
        <img src="/img/icons/icon-heart.svg" alt="" className="icon" />
        {favorite.length > 0 && (
          <span className={s.IconsFavoriteShop__count}>{favorite.length}</span>
        )}
      </NavLink>
      <NavLink to={LINK_TO.SHOP} className={getIconClass}>
        <img src="/img/icons/icon-shop.svg" alt="" className="icon" />
        {shop.length > 0 && (
          <span className={s.IconsFavoriteShop__count}>{shop.length}</span>
        )}
      </NavLink>
    </div>
  );
};
