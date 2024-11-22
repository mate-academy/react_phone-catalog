import './Navigation.module.scss';
import '../icons/icon.scss';
import '../logo/logo.scss';
import { Menu } from '../Menu/Menu';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CatalogContext } from '../CatalogProvider';

export const Navigation = () => {
  const { addedItems, oldAddedItems, favouriteItems, favouriteOldItems } =
    useContext(CatalogContext);
  const [showMenu, setShowMenu] = useState(false);

  const getSelectedLink = ({ isActive }: { isActive: boolean }) => {
    return classNames('navigation__link', {
      'navigation__link--is-active': isActive,
    });
  };

  return (
    <>
      <nav className="navigation" id="backtotop">
        <div className="navigation__logo-block">
          <div className="logo__navigation"></div>
        </div>
        <div className="navigation__menu-block">
          <div className="navigation__content">
            <div className="navigation__block-link">
              <NavLink to="/home" className={getSelectedLink}>
                HOME
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/phones" className={getSelectedLink}>
                PHONES
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/tablets" className={getSelectedLink}>
                TABLETS
              </NavLink>
            </div>
            <div className="navigation__block-link">
              {' '}
              <NavLink to="/accessories" className={getSelectedLink}>
                ACCESSORIES
              </NavLink>
            </div>
          </div>
          <div className="navigation__icons">
            <a
              className="icon__menu"
              onClick={() => setShowMenu(!showMenu)}
            ></a>
            <div className="navigation__icons-block">
              <Link to="/cart" className="navigation__block-bag">
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
              <Link to="/favourites" className="navigation__block-heart">
                <div
                  className={classNames('icon__heart', {
                    'icon__heart--circle':
                      favouriteItems.length > 0 || favouriteOldItems.length > 0,
                  })}
                ></div>
                {(favouriteItems.length > 0 ||
                  favouriteOldItems.length > 0) && (
                  <div className="icon__circle">
                    {favouriteItems.length + favouriteOldItems.length}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};
