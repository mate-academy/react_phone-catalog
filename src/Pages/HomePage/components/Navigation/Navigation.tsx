import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { HeaderContext } from '../../../../context/HeaderContext';

type Props = {
  direction: string;
  hidden?: boolean;
  gap?: string;
  bottom?: string;
};

export const Navigation: React.FC<Props> = ({
  direction,
  hidden,
  gap,
  bottom,
}) => {
  const { setMenuOpen } = useContext(HeaderContext);
  const { pathname } = useLocation();

  return (
    <nav
      className={classNames('nav', {
        [styles['mobile-hidden']]: hidden,
      })}
    >
      <ul
        className={styles.nav__list}
        style={{
          flexDirection: direction,
          gap: gap,
        }}
      >
        <li className="nav-item">
          <NavLink
            to="/home"
            className={classNames(styles.nav__link, 'uppercase', {
              [styles.active]: pathname.includes('/home'),
            })}
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.nav__link, 'uppercase', {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.nav__link, 'uppercase', {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            tablets
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles.nav__link, 'uppercase', {
                [styles.active]: isActive,
              })
            }
            style={{ '--after-bottom': bottom ? bottom : '-13px' }}
            onClick={() => setMenuOpen(false)}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
