import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { PageContext } from '../../context/PageContext';
import { useContext } from 'react';

const buttons = [
  { id: 1, name: 'favourites' },
  { id: 2, name: 'cart' },
  { id: 3, name: 'menu' },
];

function isActiveLink({ isActive }: { isActive: boolean }) {
  return classNames('nav__item uppercase', { 'nav__item--selected': isActive });
}

export const HeaderButtons = () => {
  const { setLastPage } = useContext(PageContext);
  const location = useLocation();

  const handleSetPrevPage = () => {
    const page = location.pathname.split('/')[1];

    setLastPage(page);
  };

  return (
    <Fragment>
      <nav className="header__nav nav">
        <NavLink to="/" className={isActiveLink}>
          Home
        </NavLink>
        <NavLink to="/phones" className={isActiveLink}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={isActiveLink}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={isActiveLink}>
          Accessories
        </NavLink>
      </nav>
      <div className="header__buttons">
        {buttons.map(button => (
          <Link
            key={button.id}
            onClick={handleSetPrevPage}
            to={`/${button.name}`}
            className={`header__button header__button-${button.name}`}
          ></Link>
        ))}
      </div>
    </Fragment>
  );
};