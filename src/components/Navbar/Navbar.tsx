import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navbar.scss';

export const Navbar = () => {
  const generateClassesForLinks = ({
    isActive,
  }: { isActive: boolean }) => cn('nav__link', { 'is-active': isActive });

  return (
    <div className="header__wrapper">
      <div className="links-wrapper">
        <NavLink to="/" className="main-logo">
          <img src="./images/Logo.svg" alt="Logo" className="logo__img" />
        </NavLink>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className={generateClassesForLinks}
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/s"
                className={generateClassesForLinks}
              >
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/d"
                className={generateClassesForLinks}
              >
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/a"
                className={generateClassesForLinks}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="logos-wrapper">
        <div className="logo--like-wrapper">
          <div className="logo logo--like" />
        </div>
        <div className="logo logo--cart" />
      </div>
    </div>
  );
};
