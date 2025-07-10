import { NavLink } from 'react-router-dom';

import styles from './SideMenu.module.scss';

import FavoriteIcon from '../../../assets/icons/header-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/header-icons/cart-icon.svg';
import { getClassName } from '../../utils/classNameActive';

type Props = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SideMenu: React.FC<Props> = ({ isOpenSide, setIsOpenSide }) => {
  return (
    <aside
      className={getClassName({
        isActive: isOpenSide,
        baseClass: styles.menu,
        activeClass: styles.menu__open,
      })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                getClassName({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkActive,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <a
              href="#"
              className={styles.menu__link}
              onClick={() => setIsOpenSide(false)}
            >
              Phones
            </a>
          </li>
          <li className={styles.menu__item}>
            <a
              href="#"
              className={styles.menu__link}
              onClick={() => setIsOpenSide(false)}
            >
              Tablets
            </a>
          </li>
          <li className={styles.menu__item}>
            <a
              href="#"
              className={styles.menu__link}
              onClick={() => setIsOpenSide(false)}
            >
              Accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <a
          href="#"
          className={styles.menu__favoritesLink}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={FavoriteIcon}
            alt="Відкрити улюблені товари"
            className={styles.menu__favoritesImg}
          />
          <span className={styles.menu__cart_favorite_number}>23</span>
        </a>
        <a
          href="#"
          className={styles.menu__cartLink}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={CartIcon}
            alt="Відкрити корзину з товарами"
            className={styles.header__cartImg}
          />
          <span className={styles.menu__cart_favorite_number}>23</span>
        </a>
      </div>
    </aside>
  );
};
