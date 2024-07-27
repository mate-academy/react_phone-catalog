import '../../styles/main.scss';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

export const Header = () => {
  return (
    <div className={styles.header} id="header">
      <div className="top-bar">
        <a href="#" className="top-bar__link">
          <img src="./img/icons/logo.svg" className="logo" alt="logo" />
        </a>

        <nav className={classNames('nav', styles.header__nav)}>
          <ul className={classNames('nav__list', styles['header__nav-list'])}>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a
                href="#home"
                className={classNames(
                  'uppercase-text nav__link',
                  styles.header__link,
                )}
              >
                Home
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a
                href="#phones"
                className={classNames(
                  'uppercase-text nav__link',
                  styles.header__link,
                )}
              >
                Phones
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a
                href="#tablets"
                className={classNames(
                  'uppercase-text nav__link',
                  styles.header__link,
                )}
              >
                Tablets
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a
                href="#accessories"
                className={classNames(
                  'uppercase-text nav__link',
                  styles.header__link,
                )}
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
              styles['header__link--icon'],
              'top-bar__icon-control',
            )}
          >
            <Icon iconName="favorites" />
          </a>
          <a
            href="#cart"
            className={classNames(
              styles.header__link,
              styles['header__link--icon'],
              'top-bar__icon-control',
            )}
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
  );
};
