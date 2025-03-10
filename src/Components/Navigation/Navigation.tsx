import { NavLink } from 'react-router-dom';
import { logo, burger, close } from '../../icons';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { useState } from 'react';
import { iconLinks, navLinks } from './navLinks';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getClass = (base: string) => {
    return ({ isActive }: { isActive: boolean }) =>
      classNames(base, { [styles.active]: isActive });
  };

  const getNavClass = getClass(styles.navbarItem);
  const getIconClass = getClass(styles.imageContainer);

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={styles.container}>
        <div className={styles.main}>
          <NavLink to="/" aria-label="Go to home">
            <img
              src={logo}
              alt="nice-gadgets-main-logo"
              className={styles.logo}
            />
          </NavLink>

          {navLinks.map(({ path, label }) => (
            <NavLink key={path} to={path} className={getNavClass}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className={styles.secondary}>
          {iconLinks.map(({ path, img, alt }) => (
            <NavLink
              key={path}
              to={path}
              aria-label={`Go to ${alt}`}
              className={getIconClass}
            >
              <img
                src={img}
                alt={alt}
                aria-hidden="true"
                className={styles.images}
              />
            </NavLink>
          ))}
        </div>

        <div className={styles.burger}>
          <NavLink
            to="/menu"
            aria-label="Go to menu"
            className={styles.burgerContainer}
            onClick={() => setIsOpen(prev => !prev)}
          >
            <img
              src={isOpen ? close : burger}
              alt="burger-icon"
              aria-hidden="true"
              className={styles.burgerImages}
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
