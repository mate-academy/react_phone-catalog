import { NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';

export const Header = () => {
  const links = [
    { name: 'HOME', path: '/' },
    { name: 'PHONES', path: 'phones' },
    { name: 'TABLETS', path: 'tablets' },
    { name: 'ACCESSORIES', path: 'accessories' },
  ];

  return (
    <header className="header page__header">
      <div className="header__content">
        <div className="header__logo">
          <a href="#" className="header__logo-link">
            <img src="/img/Logo.svg" alt="logo" />
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            {links.map((link, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    classNames('nav__link', { active: isActive })
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="header__actions">
          <li className="header__actions-item header__actions-item--favourite">
            <a href="#" className="icon icon--favourite"></a>
          </li>
          <li className="header__actions-item header__actions-item--cart">
            <a href="#" className="icon icon--cart"></a>
          </li>
        </ul>
      </div>
    </header>
  );
};
