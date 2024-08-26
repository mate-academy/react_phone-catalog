import { Ref, forwardRef, useState } from 'react';
import '../../styles/main.scss';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Icon } from '../ui/Icon';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';
import { CustomSearch } from '../CustomSearch';
import { ProductCategories } from '../../types/ProductCategories';

type HeaderProps = {
  onMenu: () => void;
};

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ onMenu }, ref: Ref<HTMLDivElement>) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { favorites } = useFavorites();
    const { cart } = useCart();

    const [isSearchShow, setIsSearchShow] = useState(false);

    const itemsInCart = cart.reduce((acc, item) => {
      return (item.count || 1) + acc;
    }, 0);

    const isCatalogPage =
      location.pathname.slice(1) === ProductCategories.phones ||
      location.pathname.slice(1) === ProductCategories.tablets ||
      location.pathname.slice(1) === ProductCategories.accessories;

    return (
      <div className={styles.header} id="header" ref={ref}>
        <div className={styles.header__content}>
          <div className="top-bar">
            <Link to="/" className="top-bar__link">
              <img src="./img/icons/logo.svg" className="logo" alt="logo" />
            </Link>

            <nav
              className={classNames('nav', styles.header__nav, {
                [styles['header__nav--hide']]: isSearchShow,
              })}
            >
              <ul
                className={classNames('nav__list', styles['header__nav-list'])}
              >
                <li
                  className={classNames(
                    'nav__item',
                    styles['header__nav-item'],
                    { [styles['header__nav-item--hide']]: isSearchShow },
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
                      pathname: `/${ProductCategories.phones}`,
                      search: searchParams.toString(),
                    }}
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
                      pathname: `/${ProductCategories.tablets}`,
                      search: searchParams.toString(),
                    }}
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
                      pathname: `/${ProductCategories.accessories}`,
                      search: searchParams.toString(),
                    }}
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
              {isCatalogPage && (
                <div
                  className={classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    'top-bar__icon-control',
                    'top-bar__icon-control--search',
                  )}
                >
                  <CustomSearch
                    isShow={isSearchShow}
                    onShow={setIsSearchShow}
                  />
                </div>
              )}
              <NavLink
                to={'/favorites'}
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
                <Icon iconName="favorites" badgeInfo={favorites.length || ''} />
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
                <Icon iconName="cart" badgeInfo={itemsInCart || ''} />
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
