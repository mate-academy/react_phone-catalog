import { NavLink } from 'react-router-dom';
import './Footer.scss';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  return (
    <nav
      data-cy="footer"
      aria-label="main footer"
      className="nav-footer-container"
    >
      <div className="footer-container">
        <div className="footer-brand">
          <NavLink
            to="/"
            className={() => classNames(
              'Footer-item',
            )}
          >
            LOGO
          </NavLink>

          <NavLink
            to={'https://github.com/andriy-fesych'
              + '/react_phone-catalog/tree/develop'}
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
            className="totop Footer-item"
            onClick={() => window
              .scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          >
            BACK_TO_TOP
          </div>
        </div>
      </div>
    </nav>
  );
};
