import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';

export const NavBar: React.FC = () => {
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [visibleAside, setVisibleAside] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 640) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, [windowWidth]);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <img
            className={styles.logo__img}
            src="/img/icons/Logo.svg"
            alt="Logo"
          />
        </div>

        {isPhone ? (
          <>
            {visibleAside ? (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(false)}
                  className={styles.links__item}
                >
                  <img src="/img/icons/Close.svg" alt="close" />
                </NavLink>
              </div>
            ) : (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(true)}
                  className={styles.links__item}
                >
                  <img src="/img/icons/burgerMenu.svg" alt="menu" />
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.links}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.links__item} ${styles.active}`
                    : styles.links__item
                }
              >
                HOME
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.links__item} ${styles.active}`
                    : styles.links__item
                }
                to={'/phones'}
              >
                PHONES
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.links__item} ${styles.active}`
                    : styles.links__item
                }
                to={'/tablets'}
              >
                TABLETS
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.links__item} ${styles.active}`
                    : styles.links__item
                }
                to={'/accessories'}
              >
                ACCESSORIES
              </NavLink>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.icon}>
                <NavLink to="/favourites" className={styles.links__item}>
                  <img src="/img/icons/favourites.svg" alt="favourites" />
                </NavLink>
              </div>
              <div className={styles.icon}>
                <NavLink to="/case" className={styles.links__item}>
                  <img src="/img/icons/case.svg" alt="case" />
                </NavLink>
              </div>
            </div>
          </>
        )}
      </nav>

      {visibleAside && (
        <aside className={styles.aside}>
          <div className={styles.asideLinks}>
            <NavLink className={styles.links__item} to={'/'}>
              HOME
            </NavLink>
            <NavLink className={styles.links__item} to={'/phones'}>
              PHONES
            </NavLink>
            <NavLink className={styles.links__item} to={'/'}>
              TABLETS
            </NavLink>
            <NavLink className={styles.links__item} to={'/'}>
              ACCESSORIES
            </NavLink>
          </div>

          <div className={styles.asideIcons}>
            <div className={styles.asideIcon}>
              <NavLink to="/favourites" className={styles.links__item}>
                <img src="/img/icons/favourites.svg" alt="favourites" />
              </NavLink>
            </div>
            <div className={styles.asideIcon}>
              <NavLink to="/case" className={styles.links__item}>
                <img src="/img/icons/case.svg" alt="case" />
              </NavLink>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
