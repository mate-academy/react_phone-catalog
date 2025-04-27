import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={() => classNames(
              'navbar-item',
            )}
          >
            {t('navigation.logo')}
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.home')}
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.phones')}
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.tablets')}
          </NavLink>

          <NavLink
            to="/accessories"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.accessories')}
          </NavLink>

          <input type="text" placeholder={t('navigation.search_placeholder')} />

          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.favorites')}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            {t('navigation.cart')}
          </NavLink>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};
