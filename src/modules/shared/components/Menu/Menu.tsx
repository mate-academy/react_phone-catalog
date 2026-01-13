import scss from './Menu.module.scss';
import { NavLinkMenu } from '../NavLinkMenu';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  isMenuOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  const pathname = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <nav
      id="mobile-menu"
      className={classNames(scss.menu, { [scss.menu_open]: isMenuOpen })}
    >
      <ul className={scss.menu__list}>
        <li className={scss.menu__item}>
          <NavLinkMenu
            to={`${import.meta.env.BASE_URL}`}
            type="text"
            label="Home"
            end={true}
          />
        </li>
        <li className={scss.menu__item}>
          <NavLinkMenu to="/phones" type="text" label="Phones" />
        </li>
        <li className={scss.menu__item}>
          <NavLinkMenu to="/tablets" type="text" label="Tablets" />
        </li>
        <li className={scss.menu__item}>
          <NavLinkMenu to="/accessories" type="text" label="Accessories" />
        </li>
      </ul>
      <ul className={scss.menu__iconsWrapper}>
        <li className={scss.menu__iconLink}>
          <NavLinkMenu
            to="/favourites"
            type="icon"
            label="Favourites"
            icon="heart-icon"
          />
        </li>
        <li className={scss.menu__iconLink}>
          <NavLinkMenu
            to="/cart"
            type="icon"
            label="Shopping Bag"
            icon="shopping-bag"
          />
        </li>
      </ul>
    </nav>
  );
};
