import { NavLink } from 'react-router-dom';
import { HeaderIcons } from '../HeaderIcons';
import cn from 'classnames';
import './NavigationCartFavourite.scss';
import { useAsideState } from '../../stateManagers/asideState';
import { useThemeState } from '../../stateManagers/themeState';

interface NavigationCartFavoriteProps {
  isAside?: boolean;
}

const activeLink = ({ isActive }: { isActive: boolean }) =>
  cn('link-cart', { 'link-cart__active': isActive });

export const NavigationCartFavorite: React.FC<NavigationCartFavoriteProps> = ({
  isAside = false,
}) => {
  const { closeAside } = useAsideState();
  const { theme } = useThemeState();

  return (
    <ul
      className={cn(
        isAside ? 'navigation-cart-aside' : 'navigation-cart',
        `navigation-cart--${theme}`,
      )}
    >
      <li className="navigation-cart__item">
        <NavLink
          to="/favorites"
          className={activeLink}
          onClick={closeAside}
        >
          <HeaderIcons type="favorites" />
        </NavLink>
      </li>
      <li className="navigation-cart__item">
        <NavLink
          to="/cart"
          className={activeLink}
          onClick={closeAside}
        >
          <HeaderIcons type="card" />
        </NavLink>
      </li>
    </ul>
  );
};
