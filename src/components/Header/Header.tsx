import '../../styles/main.scss';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Icon } from '../ui/Icon';

type HeaderProps = {
  activePage: string;
  goToPage: (page: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ activePage, goToPage }) => {
  return (
    <div className={styles.header} id="header">
      <div className={styles.header__content}>
        <div className="top-bar">
          <a href="#" className="top-bar__link">
            <img src="./img/icons/logo.svg" className="logo" alt="logo" />
          </a>

          <nav className={classNames('nav', styles.header__nav)}>
            <ul className={classNames('nav__list', styles['header__nav-list'])}>
              <li
                className={classNames('nav__item', styles['header__nav-item'])}
              >
                <a
                  href="#home"
                  className={classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    { [styles['header__link--active']]: activePage === 'home' },
                  )}
                  onClick={() => goToPage('home')}
                >
                  Home
                </a>
              </li>
              <li
                className={classNames('nav__item', styles['header__nav-item'])}
              >
                <a
                  href="#phones"
                  className={classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    {
                      [styles['header__link--active']]: activePage === 'phones',
                    },
                  )}
                  onClick={() => goToPage('phones')}
                >
                  Phones
                </a>
              </li>
              <li
                className={classNames('nav__item', styles['header__nav-item'])}
              >
                <a
                  href="#tablets"
                  className={classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    {
                      [styles['header__link--active']]:
                        activePage === 'tablets',
                    },
                  )}
                  onClick={() => goToPage('tablets')}
                >
                  Tablets
                </a>
              </li>
              <li
                className={classNames('nav__item', styles['header__nav-item'])}
              >
                <a
                  href="#accessories"
                  className={classNames(
                    'uppercase-text nav__link',
                    styles.header__link,
                    {
                      [styles['header__link--active']]:
                        activePage === 'accessories',
                    },
                  )}
                  onClick={() => goToPage('accessories')}
                >
                  Accessories
                </a>
              </li>
            </ul>
          </nav>

          <div className="top-bar__buttons">
            <a
              href="#favorites"
              className={classNames(
                styles.header__link,
                {
                  [styles['header__link--active']]: activePage === 'favorites',
                },
                styles['header__link--icon'],
                'top-bar__icon-control',
              )}
              onClick={() => goToPage('favorites')}
            >
              <Icon iconName="favorites" badgeInfo={12} />
            </a>
            <a
              href="#cart"
              className={classNames(
                styles.header__link,
                { [styles['header__link--active']]: activePage === 'cart' },
                styles['header__link--icon'],
                'top-bar__icon-control',
              )}
              onClick={() => goToPage('cart')}
            >
              <Icon iconName="cart" />
            </a>
            <a
              href="#menu"
              className={classNames(
                styles['header__link--icon'],
                'top-bar__icon-control',
              )}
            >
              <Icon iconName="menu" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
