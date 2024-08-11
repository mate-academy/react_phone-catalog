import classNames from 'classnames';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { logoImg } from './../../utils/kit';
import { Menu } from '../Menu/Menu';
import { useContext, useMemo } from 'react';
import { ActionContext } from '../../shared/Context/ActionContext';

const getStylelinkNav = ({ isActive }: { isActive: boolean }) => {
  return classNames('nav__link', {
    nav__active: isActive,
  });
};

const getStylelinkActions = ({ isActive }: { isActive: boolean }) => {
  return classNames('actions__link', {
    actions__active: isActive,
  });
};

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}

export const Header: React.FC<Props> = ({ setIsMenuOpen, isMenuOpen }) => {
  const { cartProducts, favouritesIds } = useContext(ActionContext);

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const totalCount = useMemo(() => {
    return cartProducts.reduce((count, product) => count + product.count, 0);
  }, [cartProducts]);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoImg} className="header__logo-img" />
      </Link>

      <div className="navContainer">
        <nav className="nav">
          <NavLink to="/" className={getStylelinkNav}>
            Home
          </NavLink>
          <NavLink to="phones" className={getStylelinkNav}>
            Phones
          </NavLink>
          <NavLink to="tablets" className={getStylelinkNav}>
            Tablets
          </NavLink>
          <NavLink to="accessories" className={getStylelinkNav}>
            Accessories
          </NavLink>
        </nav>

        <div className="actions">
          <NavLink to="favorites" className={getStylelinkActions}>
            <div className="icon icon--favorites" />
            {!!favouritesIds.length && (
              <span className="header__icon-count header__icon-count--favor">
                {favouritesIds.length}
              </span>
            )}
          </NavLink>

          <NavLink to="cart" className={getStylelinkActions}>
            <div className="icon icon--cart" />
            {!!totalCount && (
              <span className="header__icon-count">{totalCount}</span>
            )}
          </NavLink>
        </div>
      </div>

      <div className="BurgerMenu">
        <button
          type="button"
          className="BurgerMenu__button"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <div className="icon icon--close"></div>
          ) : (
            <div className="icon icon--menu"></div>
          )}
        </button>
      </div>
      {isMenuOpen && <Menu />}
    </header>
  );
};
