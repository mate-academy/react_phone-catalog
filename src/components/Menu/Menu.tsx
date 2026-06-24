import { NavLink } from 'react-router-dom';
import style from './Menu.module.scss';
import React from 'react';
import { LINKS } from '../../constants/categories/categories';
import { useCartState } from '../../store/CartProvider';
import { useFavoritesState } from '../../store/FavouritesProvider';
import { scrollToTop } from '../../utils/helpers/helpers';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

type Props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { items } = useCartState();
  const { favItems } = useFavoritesState();
  const { theme } = useTheme();
  const totalProducts = items.reduce((sum, item) => sum + item.quantity, 0);
  const handleScroll = () => {
    onClose(false);
    scrollToTop();
  };

  return (
    <div className={`${style.burgerMenu} ${isOpen ? style.isOpen : ''}`}>
      <nav className={style.navMenu}>
        <ul className={style.navMenu__list}>
          {LINKS.map(link => (
            <li className={style.navMenu__item} key={link}>
              <NavLink
                to={link === 'home' ? '/' : link}
                className={({ isActive }) =>
                  `${style.navMenu__link} ${isActive ? style.navMenu__link_active : ''}`
                }
                onClick={handleScroll}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={style.navMenu__menuBottomIcons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${style.navMenu__iconLink} ${isActive ? style.navMenu__iconLink_active : ''}`
            }
            onClick={handleScroll}
          >
            <div className={style.navMenu__iconWrapper}>
              <img
                src={theme === 'dark' ? ICONS.darkFav : ICONS.fav}
                alt="favourites"
              />
              {favItems.length > 0 && (
                <span className={style.navMenu__badge}>{favItems.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${style.navMenu__iconLink} ${isActive ? style.navMenu__iconLink_active : ''}`
            }
            onClick={handleScroll}
          >
            <div className={style.navMenu__iconWrapper}>
              <img
                src={theme === 'dark' ? ICONS.darkBag : ICONS.bag}
                alt="shoppingBag"
              />
              {totalProducts > 0 && (
                <span className={style.navMenu__badge}>{totalProducts}</span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
