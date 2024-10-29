import { NavLink } from 'react-router-dom';
import './Aside.scss';
import { SetStateAction, useContext } from 'react';
import { NavItem } from '../../NavItem';
import { FavCartPhonesContext } from '../../../contexts/FavCartPhonesContext';

interface Props {
  isAside: boolean;
  setIsAside: React.Dispatch<SetStateAction<boolean>>;
}

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav__link nav__link--active' : 'nav__link';
};

const getHeaderActionClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'header__action header__action--active' : 'header__action';
};

export const Aside: React.FC<Props> = ({ isAside, setIsAside }) => {
  const { selectedPhonesInCartCount, selectedPhonesInFavCount } =
    useContext(FavCartPhonesContext);

  const handleBurger = () => {
    setIsAside(false);
  };

  return (
    <>
      {isAside && (
        <aside id="aside" className="aside">
          <nav className="header__nav nav">
            <NavLink className="nav__link" to="./">
              <img
                className="nav__logo logo"
                src="img/svg/logo.svg"
                alt="logo"
              />
            </NavLink>
            <button
              onClick={handleBurger}
              type="button"
              aria-label="open menu button"
              className="header__burger"
            >
              <i className="burger-ico burger-ico-close" />
            </button>
          </nav>

          <ul className="nav__list-menu">
            <li className="nav__item">
              <NavLink
                onClick={handleBurger}
                className={getNavLinkClass}
                to="/"
              >
                HOME
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                onClick={handleBurger}
                className={getNavLinkClass}
                to="/phones"
              >
                PHONES
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                onClick={handleBurger}
                className={getNavLinkClass}
                to="/tablets"
              >
                TABLETS
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                onClick={handleBurger}
                className={getNavLinkClass}
                to="/accessories"
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>

          <div className="aside__actions">
            <NavLink
              onClick={handleBurger}
              className={getHeaderActionClass}
              to="/favorites"
            >
              <NavItem
                selectedPhonesCount={selectedPhonesInFavCount}
                type="fav"
              ></NavItem>
            </NavLink>
            <NavLink
              onClick={handleBurger}
              className={getHeaderActionClass}
              to="/cart"
            >
              <NavItem
                selectedPhonesCount={selectedPhonesInCartCount}
                type="cart"
              />
            </NavLink>
          </div>
        </aside>
      )}
    </>
  );
};
