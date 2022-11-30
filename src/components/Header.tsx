import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import '../App.scss';

export const Header = () => {
  const pages = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  return (
    <header className="header">
      <div className="header__nav">
        <Link to="/" className="header__logo logo" />
        <nav className="nav">
          <ul className="nav__list">
            {pages.map(page => (
              <li key={page.link} className="nav__item">
                <NavLink
                  to={page.link}
                  className={({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )}
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header__icons">
        <NavLink to="/favorites" className="icon header__favorites" />
        <NavLink to="/cart" className="icon header__cart" />
      </div>
    </header>
  );
};
