import { NavLink } from 'react-router-dom';
import './Footer.scss';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  return (
    <nav
      data-cy="footer"
      aria-label="main footer"
    >
      <div className="container">
        <div className="Footer-brand">
          <NavLink
            to="/"
            className={() => classNames(
              'Footer-item',
            )}
          >
            LOGO
          </NavLink>

          <NavLink
            to="https://github.com/andriy-fesych/react_phone-catalog/tree/develop"
            target="_blank"
            rel="noopener noreferrer"
            className={({ isActive }) => classNames(
              'Footer-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            GITHUB
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) => classNames(
              'Footer-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            CONTACTS
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) => classNames(
              'Footer-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            RIGHTS
          </NavLink>

          <div
            className="totop"
            onClick={() => window.scrollTo(0, 0)}
          >
            BACK_TO_TOP
          </div>
        </div>
      </div>
    </nav>
  );
};
