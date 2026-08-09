import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import { useLikeProducts } from '../../context/LikeCard';
import { useCard } from '../../context/CardContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { count } = useLikeProducts();
  const { item } = useCard();

  const isAsidePage = pathname === '/aside';

  const cartCount = item.reduce((acc, i) => acc + i.quality, 0);

  return (
    <header className={style.header}>
      <Link to="/" className={style.logoMobile}>
        <img src="img/logo/logo_for_mobile.svg" alt="logo for mobile" />
      </Link>
      <Link to="/" className={style.logoDesktop}>
        <img src="img/logo/logo_for_desktop.svg" alt="logo for mobile" />
      </Link>
      {isAsidePage ? (
        <button className={style.close_menu} onClick={() => navigate(-1)}>
          <img src="img/buttons/close_menu.svg" alt="close menu" />
        </button>
      ) : (
        <button
          className={style.burger_menu}
          onClick={() => navigate('/aside')}
        >
          <img src="img/buttons/burger_menu.svg" alt="burger menu" />
        </button>
      )}

      <div className={style.menu}>
        <ul className={style.menuItems}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `${style.menuItem} ${style.menuItemActive}`
                : style.menuItem
            }
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${style.menuItem} ${style.menuItemActive}`
                : style.menuItem
            }
          >
            phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${style.menuItem} ${style.menuItemActive}`
                : style.menuItem
            }
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${style.menuItem} ${style.menuItemActive}`
                : style.menuItem
            }
          >
            accessories
          </NavLink>
        </ul>
      </div>
      <div className={style.icon}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${style.iconLeftHeart} ${style.iconLeftHeartActive}`
              : style.iconLeftHeart
          }
        >
          <div className={style.iconLeft}>
            <img src="img/buttons/empty_heart_button.svg" alt="heart button" />

            {count > 0 && <span className={style.badge}>{count}</span>}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? `${style.iconRightBag} ${style.iconLeftHeartActive}`
              : style.iconRightBag
          }
        >
          <div className={style.iconRight}>
            <img
              src="img/buttons/shopping_bag_button.svg"
              alt="shopping bag button"
            />

            {cartCount > 0 && <span className={style.badge}>{cartCount}</span>}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
