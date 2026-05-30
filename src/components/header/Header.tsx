/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../../assets/images/logo.svg';

import styles from './Header.module.scss';

import { NavIcon } from '../NavIcon';

export const Header: React.FC = () => {
  const [openBurger, setOpenBurger] = useState(false);

  const handleBugreg = () => {
    setOpenBurger(prev => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__big}>
        <div className={styles.header__nav}>
          <NavLink to="/" className={styles.header__navLogo}>
            <img src={Logo} alt="logo" className={styles.header__logo} />
          </NavLink>
          <div className={styles.header__links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
            >
              Accessories
            </NavLink>
          </div>
        </div>
        <div className={styles.header__icons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? styles['header__navItem--active'] : ''
            }
          >
            <NavIcon type="favorite" />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? styles['header__navItem--active'] : ''
            }
            state={{ category: 'cart' }}
          >
            <NavIcon type="cart" />
          </NavLink>
        </div>
      </div>
      <div className={styles.header__small}>
        <NavLink to="/" className={styles.header__navLogo}>
          <img src={Logo} alt="logo" className={styles.header__logo} />
        </NavLink>
        <div
          className={classNames(styles.header__burgerButton, {
            [styles['header__burgerButton--active']]: openBurger,
          })}
          onClick={handleBugreg}
        />
        <div
          className={classNames(styles.header__smallContainer, {
            [styles['header__smallContainer--clicked']]: openBurger,
          })}
        >
          <div className={styles.header__links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
              state={{ category: 'phones' }}
            >
              Phones
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
              state={{ category: 'tablets' }}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? classNames(
                    styles['header__navItem--text'],
                    styles['header__navItem--active'],
                  )
                  : classNames(styles['header__navItem--text'])
              }
              state={{ category: 'accessories' }}
            >
              Accessories
            </NavLink>
          </div>
          <div className={styles.header__icons}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? styles['header__navItem--active'] : ''
              }
            >
              <NavIcon type="favorite" />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles['header__navItem--active'] : ''
              }
            >
              <NavIcon type="cart" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
