import nav from './Navigation.module.scss';
import icons from '../icons/icon.module.scss';
import navLogo from '../logo/logo.module.scss';
import { Menu } from '../Menu';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { CatalogContext } from '../CatalogProvider';

export const Navigation = () => {
  const { addedItems, favouriteItems, themeSwitcher, setThemeSwitcher } =
    useContext(CatalogContext);
  const [showMenu, setShowMenu] = useState(false);
  const [turnIcon, setTurnIcon] = useState(false);

  const getSelectedLink = ({ isActive }: { isActive: boolean }) => {
    return classNames([nav.navigation__link], {
      [nav.navigation__linkactive]: isActive,
    });
  };

  return (
    <>
      <nav
        className={nav.navigation}
        data-theme={themeSwitcher ? 'dark' : 'light'}
      >
        <div className={nav.navigation__logoblock}>
          <Link to="/" className={navLogo.logo__navigation}></Link>
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
              className={classNames([icons.icon__menu], {
                [icons.icon__menuONDARK]: themeSwitcher,
              })}
              onClick={() => setShowMenu(!showMenu)}
            ></a>
            <div className={nav.navigation__iconsblock}>
              <div className={nav.blockswitcher}>
                <button
                  className={classNames([nav.blockswitcher__button], {
                    [nav.blockswitcher__buttonTURNICON]: turnIcon,
                  })}
                  onClick={() => {
                    setThemeSwitcher(!themeSwitcher);
                    setTurnIcon(true);
                  }}
                  onAnimationEnd={() => {
                    setTurnIcon(false);
                  }}
                >
                  <img
                    className={icons.icon__switcher}
                    src={
                      themeSwitcher
                        ? '/img/moon-svgrepo-com.svg'
                        : '/img/abstract_sun_design.svg'
                    }
                    alt={themeSwitcher ? 'moon' : 'sun'}
                  />
                </button>
              </div>
              <Link to="/cart" className={nav.navigation__blockbag}>
                <div
                  className={classNames([icons.icon__bag], {
                    [icons.icon__bagONDARK]: themeSwitcher,
                    [icons.icon__bagcircle]: addedItems.length > 0,
                  })}
                ></div>
                {addedItems.length > 0 && (
                  <div className={icons.icon__circle}>{addedItems.length}</div>
                )}
              </Link>
              <Link to="/favourites" className={nav.navigation__blockheart}>
                <div
                  className={classNames([icons.icon__heart], {
                    [icons.icon__heartONDARK]: themeSwitcher,
                    [icons.icon__heartcircle]: favouriteItems.length > 0,
                  })}
                ></div>
                {favouriteItems.length > 0 && (
                  <div className={icons.icon__circle}>
                    {favouriteItems.length}
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
