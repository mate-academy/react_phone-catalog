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
              'Footer-item', 'navbar-logo', 'footer-logo',
            )}
          >
            <img src="img/icons/iSupply_logo.png" alt="" />
          </NavLink>

          <div className="footer-links-wrapper">
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
              to="/contacts"
              className={({ isActive }) => classNames(
                'Footer-item',
                { 'has-background-grey-lighter': isActive },
              )}
            >
              CONTACTS
            </NavLink>

            <NavLink
              to="/rights"
              className={({ isActive }) => classNames(
                'Footer-item',
                { 'has-background-grey-lighter': isActive },
              )}
            >
              RIGHTS
            </NavLink>
          </div>



          <div
            className="totop Footer-item"
            onClick={() => window
              .scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          >
            Back to top
            <button
              className="rec__arrow rec__arrow__footer"
              onClick={() => window
                .scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              aria-label="Next slide"
            >
              <svg
                className='footer-svg'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
