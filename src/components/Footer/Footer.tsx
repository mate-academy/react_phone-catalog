import { NavLink } from 'react-router-dom';
import './Footer.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/store';
import iLogo from '../../../public/img/icons/iSupply_logo.png';
import iLogo_inverted from '../../../public/img/icons/iSupply_logo_inverted.png';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string }; }) => state.theme.current);

  return (
    <nav
      data-cy="footer"
      aria-label="main footer"
      className={`nav-footer-container ${currentTheme}`}
    >
      <div className="footer-container">
        <div className="footer-brand">
          <NavLink
            to="/"
            className={() => classNames(
              'Footer-item', 'navbar-logo', 'footer-logo',
            )}
          >
            <img
              src={currentTheme === 'theme1'
                ? iLogo_inverted
                : iLogo}
              alt=""
            />
          </NavLink>

          <div className="footer-links-wrapper">
            <NavLink
              to={'https://github.com/andriy-fesych'
                + '/react_phone-catalog/tree/develop'}
              target="_blank"
              rel="noopener noreferrer"
              className={({ isActive }) => classNames(
                'Footer-item', currentTheme,
                { 'has-background-grey-lighter': isActive },
              )}
            >
              GITHUB
            </NavLink>

            <NavLink
              to="/contacts"
              className={({ isActive }) => classNames(
                'Footer-item', currentTheme,
                { 'has-background-grey-lighter': isActive },
              )}
            >
              {t('footer.contacts')}
            </NavLink>

            <NavLink
              to="/rights"
              className={({ isActive }) => classNames(
                'Footer-item', currentTheme,
                { 'has-background-grey-lighter': isActive },
              )}
            >
              {t('footer.rights')}
            </NavLink>
          </div>



          <div
            className={`totop Footer-item ${currentTheme}`}
            onClick={() => window
              .scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          >
            {t('footer.back_to_top')}
            <button
              className={`rec__arrow rec__arrow__footer ${currentTheme}`}
              onClick={() => window
                .scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              aria-label="Next slide"
            >
              <svg
                className={`footer-svg ${currentTheme}`}
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
