import nav from './Navigation.module.scss';
import icons from '../icons/icon.module.scss';
import navLogo from '../logo/logo.module.scss';
import { Menu } from '../Menu';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CatalogContext } from '../CatalogProvider';

export const Navigation = () => {
  const { addedItems, oldAddedItems, favouriteItems, favouriteOldItems } =
    useContext(CatalogContext);
  const [showMenu, setShowMenu] = useState(false);

  const getSelectedLink = ({ isActive }: { isActive: boolean }) => {
    return classNames([nav.navigation__link], {
      [nav.navigation__linkactive]: isActive,
    });
  };

  return (
    <>
      <nav className={nav.navigation} id="backtotop">
        <div className={nav.navigation__logoblock}>
          <div className={navLogo.logo__navigation}></div>
        </div>
        <div className={nav.navigation__menublock}>
          <div className={nav.navigation__content}>
            <div className={nav.navigation__blocklink}>
              <NavLink to="/home" className={getSelectedLink}>
                HOME
              </NavLink>
            </div>
            <div className={nav.navigation__blocklink}>
              {' '}
              <NavLink to="/phones" className={getSelectedLink}>
                PHONES
              </NavLink>
            </div>
            <div className={nav.navigation__blocklink}>
              {' '}
              <NavLink to="/tablets" className={getSelectedLink}>
                TABLETS
              </NavLink>
            </div>
            <div className={nav.navigation__blocklink}>
              {' '}
              <NavLink to="/accessories" className={getSelectedLink}>
                ACCESSORIES
              </NavLink>
            </div>
          </div>
          <div className={nav.navigation__icons}>
            <a
              className={icons.icon__menu}
              onClick={() => setShowMenu(!showMenu)}
            ></a>
            <div className={nav.navigation__iconsblock}>
              <Link to="/cart" className={nav.navigation__blockbag}>
                <div
                  className={classNames([icons.icon__bag], {
                    [icons.icon__bagcircle]:
                      addedItems.length > 0 || oldAddedItems.length > 0,
                  })}
                ></div>
                {(addedItems.length > 0 || oldAddedItems.length > 0) && (
                  <div className={icons.icon__circle}>
                    {addedItems.length + oldAddedItems.length}
                  </div>
                )}
              </Link>
              <Link to="/favourites" className={nav.navigation__blockheart}>
                <div
                  className={classNames([icons.icon__heart], {
                    [icons.icon__heartcircle]:
                      favouriteItems.length > 0 || favouriteOldItems.length > 0,
                  })}
                ></div>
                {(favouriteItems.length > 0 ||
                  favouriteOldItems.length > 0) && (
                  <div className={icons.icon__circle}>
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
