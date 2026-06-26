import { Link, NavLink } from 'react-router-dom';
import logo from '/img/logo/Logo.svg';
import footer from './Footer.module.scss';
import classNames from 'classnames';
import { Arrow } from '../Arrow';
import { ArrowDirection } from '../../shared/IconArrow';
import { AppRoutes } from '../Router';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={footer.footer}>
      <Link to={AppRoutes.HOME} className={footer.logoLink}>
        <img src={logo} alt="Logo" className={footer.logo} />
      </Link>
      <nav className={classNames('font-uppercase', footer.nav)}>
        <li className={footer.navItem}>
          <a
            href="https://github.com/freelinex"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li className={footer.navItem}>
          <NavLink
            to={AppRoutes.CONTACTS}
            className={({ isActive }) => (isActive ? footer.active : '')}
          >
            Contacts
          </NavLink>
        </li>
        <li className={footer.navItem}>
          <NavLink
            to={AppRoutes.RIGHTS}
            className={({ isActive }) => (isActive ? footer.active : '')}
          >
            Rights
          </NavLink>
        </li>
      </nav>
      <button
        className={classNames(footer.backToTopButton, 'font-small')}
        onClick={handleBackToTop}
      >
        Back to top
        <div className={footer.backToTopWrapper}>
          <Arrow direction={ArrowDirection.Up} />
        </div>
      </button>
    </footer>
  );
};
