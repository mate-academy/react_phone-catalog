import './menu.module.scss';
import '../icons/icon.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
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
      className={classNames('menu', {
        'menu--show-menu': showMenu,
      })}
    >
      <div className="menu__header">
        <div className="menu__logo-block">
          <div className="logo__menu"></div>
        </div>

        <a
          className="menu__block-with-cross"
          onClick={() => setShowMenu(false)}
        >
          <div className="icon__cross"></div>
        </a>
      </div>
      <nav className="menu__navigation">
        <Link to="/home" className="menu__link">
          HOME
        </Link>
        <Link to="/phones" className="menu__link">
          PHONES
        </Link>
        <Link to="/tablets" className="menu__link">
          TABLETS
        </Link>
        <Link to="/accessories" className="menu__link">
          ACCESSORIES
        </Link>
      </nav>
      <footer className="menu__footer">
        <Link
          to="/favourites"
          className="menu__footer--block menu__footer--block--line"
        >
          <div
            className={classNames('icon__heart', {
              'icon__heart--circle':
                favouriteItems.length > 0 || favouriteOldItems.length > 0,
            })}
          ></div>
          {(favouriteItems.length > 0 || favouriteOldItems.length > 0) && (
            <div className="icon__circle">
              {favouriteItems.length + favouriteOldItems.length}
            </div>
          )}
        </Link>
        <Link to="/cart" className="menu__footer--block">
          <div
            className={classNames('icon__bag', {
              'icon__bag--circle':
                addedItems.length > 0 || oldAddedItems.length > 0,
            })}
          ></div>
          {(addedItems.length > 0 || oldAddedItems.length > 0) && (
            <div className="icon__circle">
              {addedItems.length + oldAddedItems.length}
            </div>
          )}
        </Link>
      </footer>
    </menu>
  );
};
