import menuIcon from '../icons/icon.module.scss';
import menuLogo from '../logo/logo.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import menu from './menu.module.scss';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';

type Props = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

export const Menu = ({ showMenu, setShowMenu }: Props) => {
  const { favouriteItems, addedItems, themeSwitcher, setThemeSwitcher } =
    useContext(CatalogContext);

  return (
    <menu
      className={classNames([menu.menu], {
        [menu.menu__showmenu]: showMenu,
      })}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={menu.menu__header}>
        <div className={menu.menu__logoblock}>
          <div className={menuLogo.logo__menu}></div>
        </div>

        <a
          className={menu.menu__blockwithcross}
          onClick={() => setShowMenu(false)}
        >
          <div className={menuIcon.icon__cross}></div>
        </a>
      </div>
      <div className={menu.block}>
        <nav className={menu.menu__navigation}>
          <Link to="/home" className={menu.menu__link}>
            HOME
          </Link>
          <Link to="/phones" className={menu.menu__link}>
            PHONES
          </Link>
          <Link to="/tablets" className={menu.menu__link}>
            TABLETS
          </Link>
          <Link to="/accessories" className={menu.menu__link}>
            ACCESSORIES
          </Link>
        </nav>
        <div className={menu.themeswitcherblock}>
          <h2 className={menu.themeswitcher__header}>THEME SWITCHER</h2>
          <button
            className={menu.themeswitcher__button}
            onClick={() => {
              setThemeSwitcher(!themeSwitcher);
            }}
            style={{
              transform: `rotateX(1turn)`,
            }}
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
      <footer className={menu.menu__footer}>
        <Link to="/favourites" className={menu.menu__footerblock}>
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
        <Link to="/cart" className={menu.menu__footerblock}>
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
