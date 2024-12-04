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
  const { favouriteItems, favouriteOldItems, addedItems, oldAddedItems } =
    useContext(CatalogContext);

  return (
    <menu
      className={classNames([menu.menu], {
        [menu.menu__showmenu]: showMenu,
      })}
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
      <footer className={menu.menu__footer}>
        <Link to="/favourites" className={menu.menu__footerblock}>
          <div
            className={classNames([menuIcon.icon__heart], {
              [menuIcon.icon__heartcircle]:
                favouriteItems.length > 0 || favouriteOldItems.length > 0,
            })}
          ></div>
          {(favouriteItems.length > 0 || favouriteOldItems.length > 0) && (
            <div className={menuIcon.icon__circle}>
              {favouriteItems.length + favouriteOldItems.length}
            </div>
          )}
        </Link>
        <Link to="/cart" className={menu.menu__footerblock}>
          <div
            className={classNames([menuIcon.icon__bag], {
              [menuIcon.icon__bagcircle]:
                addedItems.length > 0 || oldAddedItems.length > 0,
            })}
          ></div>
          {(addedItems.length > 0 || oldAddedItems.length > 0) && (
            <div className={menuIcon.icon__circle}>
              {addedItems.length + oldAddedItems.length}
            </div>
          )}
        </Link>
      </footer>
    </menu>
  );
};
