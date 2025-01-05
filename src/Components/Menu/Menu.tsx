/* eslint-disable @typescript-eslint/no-explicit-any */
import menuIcon from '../icons/icon.module.scss';
import menuLogo from '../logo/logo.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import menu from './menu.module.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';

type Props = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

export const Menu = ({ showMenu, setShowMenu }: Props) => {
  const { favouriteItems, addedItems, themeSwitcher, setThemeSwitcher } =
    useContext(CatalogContext);

  const [turnIcon, setTurnIcon] = useState(false);

  return (
    <menu
      className={classNames([menu.menu], {
        [menu.showmenu]: showMenu,
      })}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={menu.header}>
        <div className={menu.logoblock}>
          <Link
            to="/"
            className={classNames([menuLogo.logo__menu], {
              [menuLogo.logo__menuONDARK]: themeSwitcher,
            })}
          ></Link>
        </div>

        <a className={menu.blockwithcross} onClick={() => setShowMenu(false)}>
          <div className={menuIcon.icon__cross}></div>
        </a>
      </div>
      <div className={menu.block}>
        <nav className={menu.navigation}>
          <Link to="/home" className={menu.link}>
            HOME
          </Link>
          <Link to="/phones" className={menu.link}>
            PHONES
          </Link>
          <Link to="/tablets" className={menu.link}>
            TABLETS
          </Link>
          <Link to="/accessories" className={menu.link}>
            ACCESSORIES
          </Link>
        </nav>
        <div className={menu.themeswitcherblock}>
          <h2 className={menu.themeswitcher__header}>THEME SWITCHER</h2>
          <button
            className={classNames([menu.themeswitcher__button], {
              [menu.themeswitcher__buttonTURNICON]: turnIcon,
            })}
            onClick={() => {
              setThemeSwitcher(!themeSwitcher);
              setTurnIcon(true);
            }}
            onAnimationEnd={() => setTurnIcon(false)}
          >
            <img
              src={
                themeSwitcher
                  ? '/img/moon-svgrepo-com.svg'
                  : '/img/abstract_sun_design.svg'
              }
              alt={themeSwitcher ? 'moon' : 'sun'}
              className={menu.themeswitcher__image}
            />
          </button>
        </div>
      </div>
      <footer className={menu.footer}>
        <Link to="/favourites" className={menu.footerblock}>
          <div
            className={classNames([menuIcon.icon__heart], {
              [menuIcon.icon__heartONDARK]: themeSwitcher,
              [menuIcon.icon__heartcircle]: favouriteItems.length > 0,
            })}
          ></div>
          {favouriteItems.length > 0 && (
            <div className={menuIcon.icon__circle}>{favouriteItems.length}</div>
          )}
        </Link>
        <Link to="/cart" className={menu.footerblock}>
          <div
            className={classNames([menuIcon.icon__bag], {
              [menuIcon.icon__bagONDARK]: themeSwitcher,
              [menuIcon.icon__bagcircle]: addedItems.length > 0,
            })}
          ></div>
          {addedItems.length > 0 && (
            <div className={menuIcon.icon__circle}>{addedItems.length}</div>
          )}
        </Link>
      </footer>
    </menu>
  );
};
