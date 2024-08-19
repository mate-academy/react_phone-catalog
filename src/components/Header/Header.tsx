import { Ref, forwardRef } from 'react';
import '../../styles/main.scss';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Icon } from '../ui/Icon';
import { Link, NavLink, useSearchParams } from 'react-router-dom';

type HeaderProps = {
  onMenu: () => void;
};

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ onMenu }, ref: Ref<HTMLDivElement>) => {
    const [searchParams] = useSearchParams();

    return (
      <div className={styles.header} id="header" ref={ref}>
        <div className={styles.header__content}>
          <div className="top-bar">
            <Link to="#" className="top-bar__link">
              <img src="./img/icons/logo.svg" className="logo" alt="logo" />
            </Link>

            <nav className={classNames('nav', styles.header__nav)}>
              <ul
                className={classNames('nav__list', styles['header__nav-list'])}
              >
                <li
                  className={classNames(
                    'nav__item',
                    styles['header__nav-item'],
                  )}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      classNames(
                        'uppercase-text nav__link',
                        styles.header__link,
                        { [styles['header__link--active']]: isActive },
                      )
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className={classNames(
                    'nav__item',
                    styles['header__nav-item'],
                  )}
                >
                  <NavLink
                    to={{
                      pathname: '/phones',
                      search: searchParams.toString(),
                    }}
                    // to="/phones"
                    // state={{search: searchParams.toString()}}
                    className={({ isActive }) =>
                      classNames(
                        'uppercase-text nav__link',
                        styles.header__link,
                        { [styles['header__link--active']]: isActive },
                      )
                    }
                  >
                    Phones
                  </NavLink>
                </li>
                <li
                  className={classNames(
                    'nav__item',
                    styles['header__nav-item'],
                  )}
                >
                  <NavLink
                    to={{
                      pathname: '/tablets',
                      search: searchParams.toString(),
                    }}
                    // to="/tablets"
                    // state={{search: searchParams.toString()}}
                    className={({ isActive }) =>
                      classNames(
                        'uppercase-text nav__link',
                        styles.header__link,
                        { [styles['header__link--active']]: isActive },
                      )
                    }
                  >
                    Tablets
                  </NavLink>
                </li>
                <li
                  className={classNames(
                    'nav__item',
                    styles['header__nav-item'],
                  )}
                >
                  <NavLink
                    to={{
                      pathname: '/accessories',
                      search: searchParams.toString(),
                    }}
                    // to="/accessories"
                    // state={{search: searchParams.toString()}}
                    className={({ isActive }) =>
                      classNames(
                        'uppercase-text nav__link',
                        styles.header__link,
                        { [styles['header__link--active']]: isActive },
                      )
                    }
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="top-bar__buttons">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    { [styles['header__link--active']]: isActive },
                    styles['header__link--icon'],
                    'top-bar__icon-control',
                  )
                }
              >
                <Icon iconName="favorites" badgeInfo={12} />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    { [styles['header__link--active']]: isActive },
                    styles['header__link--icon'],
                    'top-bar__icon-control',
                  )
                }
              >
                <Icon iconName="cart" />
              </NavLink>
              <button
                className={classNames(
                  styles['header__link--icon'],
                  'top-bar__btn',
                )}
                onClick={onMenu}
              >
                <Icon iconName="menu" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Header.displayName = 'Header';

export { Header };
