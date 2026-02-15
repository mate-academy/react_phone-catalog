import styles from './Menu.module.scss';
import { iconLinks, navLinks } from '../Navigation/navLinks';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeMenu } from '../features/menu';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const { isOpen } = useAppSelector(state => state.menu);

  const menuClasses = classNames(styles.menu, {
    [styles.active]: isOpen && isMobile,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');

    const handleResize = () => {
      const isNowMobile = mediaQuery.matches;

      if (!isNowMobile && isOpen) {
        dispatch(closeMenu());
      }

      setIsMobile(isNowMobile);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen && isMobile) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, isMobile]);

  return (
    <div className={menuClasses}>
      <div className={styles.menuNavContainer}>
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={styles.menuNav}
            onClick={() => dispatch(closeMenu())}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className={styles.menuIconsContainer}>
        {iconLinks.map(({ path, img, alt }) => (
          <NavLink
            key={path}
            to={path}
            aria-label={`Go to ${alt}`}
            className={styles.menuIcons}
            onClick={() => dispatch(closeMenu())}
          >
            <img
              src={img}
              alt={alt}
              aria-hidden="true"
              className={styles.menuImages}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
