import { Logo } from '../Icons/Logo';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext, useEffect } from 'react';
import { LangButton } from '../LangButton';
import { IconFavorites } from '../Icons/IconFavorites';
import { LogoCart } from '../Icons/IconCart';
import { IconClose } from '../Icons/IconClose';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { StateContext } from '../../store/StateProvider';
import { Pathname } from '../../enums/Pathname';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';
import { NAV_LIST } from '../../constants/NAV_LIST';
import ThemeButton from '../ThemeButton/ThemeButton';
import classNames from 'classnames';
import style from './AsideMenu.module.scss';

export const AsideMenu = () => {
  const { t } = useContext(LanguageContext);
  const { activeMenu, setActiveMenu, favorites } = useContext(StateContext);
  const { cartItems } = useContext(ShoppingCartContext);
  const { pathname } = useLocation();

  const isActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(style.menu__listLink, { [style.menu__activeLink]: isActive });

  const offOverflowForAsideMenu = (stateMenu: boolean) => {
    if (stateMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'visible';
    }
  };

  useEffect(() => {
    offOverflowForAsideMenu(activeMenu);
  }, [activeMenu]);

  return (
    <aside
      className={classNames(style.menu, {
        [style.menu__activeMenu]: activeMenu,
      })}
    >
      <div className={style.menu__header}>
        <Link to={Pathname.home} onClick={() => setActiveMenu(false)}>
          <Logo className={style.menu__headerLogo} />
        </Link>
        <button
          className={style.menu__closeButton}
          onClick={() => setActiveMenu(false)}
        >
          <IconClose className={style.menu__actionIcon} />
        </button>
      </div>

      <div className={style.menu__listContainer}>
        <ul className={style.menu__list}>
          {NAV_LIST.map(item => (
            <li className={style.menu__listItem} key={item}>
              <NavLink
                to={
                  item.toLocaleLowerCase() === 'home'
                    ? '../'
                    : `../${item.toLocaleLowerCase()}`
                }
                className={isActiveLink}
                onClick={() => setActiveMenu(false)}
              >
                {t(`${item.toLowerCase()}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.menu__bottom}>
        <div className={style.menu__actionButton}>
          <ThemeButton />
        </div>
        <div className={style.menu__actionButton}>
          <LangButton />
        </div>

        <NavLink
          to={Pathname.favorites}
          className={classNames(style.menu__actionButton, {
            [style.menu__activeAction]: pathname === Pathname.favorites,
          })}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <div className={style.menu__iconWrapper}>
            {favorites.length > 0 && (
              <span className={style.menu__quantityCircle}>
                {favorites.length}
              </span>
            )}
            <IconFavorites className={style.menu__actionIcon} />
          </div>
        </NavLink>

        <Link
          to={Pathname.cart}
          onClick={() => setActiveMenu(!activeMenu)}
          className={classNames(style.menu__actionButton, {
            [style.menu__activeAction]: pathname === Pathname.cart,
          })}
        >
          <div className={style.menu__iconWrapper}>
            {cartItems.length > 0 && (
              <span className={style.menu__quantityCircle}>
                {cartItems.length}
              </span>
            )}
            <LogoCart className={style.menu__actionIcon} />
          </div>
        </Link>
      </div>
    </aside>
  );
};
