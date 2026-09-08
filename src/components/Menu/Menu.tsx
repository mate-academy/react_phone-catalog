import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import style from './Menu.module.scss';
import { UseHooks } from '../../AppHooks';
import favouritesIcon from '../../assets/Icons/Favourites.svg';
import cart from '../../assets/Icons/Cart.svg';

export const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const { openMenu, setOpenMenu, cartItems, favourites, setCurrentDevice } =
    UseHooks();

  const clearCurDevice = () => setCurrentDevice(null);

  return (
    <div className="inlineContainer">
      <div
        className={classNames(style.menu, {
          [style['menu--open']]: openMenu,
        })}
      >
        <ul className={style.menu__list}>
          <li className={style.menu__li}>
            <Link
              className={classNames(style.menu__link, {
                [style['menu__link--active']]: pathname === '/',
              })}
              to="/"
              onClick={() => {
                setOpenMenu(!openMenu);
                clearCurDevice();
              }}
            >
              Home
            </Link>
          </li>
          <li className={style.menu__li}>
            <Link
              className={classNames(style.menu__link, {
                [style['menu__link--active']]: pathname.startsWith('/phones'),
              })}
              to="/phones"
              onClick={() => {
                setOpenMenu(!openMenu);
                clearCurDevice();
              }}
            >
              Phones
            </Link>
          </li>
          <li className={style.menu__li}>
            <Link
              className={classNames(style.menu__link, {
                [style['menu__link--active']]: pathname.startsWith('/tablets'),
              })}
              to="/tablets"
              onClick={() => {
                setOpenMenu(!openMenu);
                clearCurDevice();
              }}
            >
              Tablets
            </Link>
          </li>
          <li className={style.menu__li}>
            <Link
              className={classNames(style.menu__link, {
                [style['menu__link--active']]:
                  pathname.startsWith('/accessories'),
              })}
              to="/accessories"
              onClick={() => {
                setOpenMenu(!openMenu);
                clearCurDevice();
              }}
            >
              Accessoires
            </Link>
          </li>
        </ul>

        <div className={style.menu__icons}>
          <Link
            className={classNames(style.menu__iconsLink, {
              [style['menu__iconsLink--active']]:
                pathname.startsWith('/favourites'),
            })}
            to="/favourites"
            onClick={() => {
              setOpenMenu(!openMenu);
              clearCurDevice();
            }}
          >
            <img src={favouritesIcon} alt="favourites" />
            {favourites.length > 0 && (
              <div className={style.menu__iconQuantity}>
                {favourites.length}
              </div>
            )}
          </Link>
          <Link
            className={classNames(style.menu__iconsLink, {
              [style['menu__iconsLink--active']]: pathname.startsWith('/cart'),
            })}
            to="/cart"
            onClick={() => {
              setOpenMenu(!openMenu);
              clearCurDevice();
            }}
          >
            <img src={cart} alt="cart" />
            {cartItems.length > 0 && (
              <div className={style.menu__iconQuantity}>{cartItems.length}</div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
