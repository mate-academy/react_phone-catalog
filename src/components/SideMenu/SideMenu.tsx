import { Link } from 'react-router-dom';
import '../../styles/main.scss';
import { Icon } from '../ui/Icon';
import styles from './SideMenu.module.scss';
import classNames from 'classnames';

export const SideMenu = () => {
  return (
    <aside className={classNames('App__menu', styles.menu)} id="menu">
      <div className={styles.menu__content}>
        <div className="top-bar">
          <Link to="/" className="top-bar__link">
            <img src="./img/icons/logo.svg" className="logo" alt="logo" />
          </Link>

          <div className="top-bar__buttons">
            <a
              href="/"
              className="top-bar__icon-control top-bar__icon-control--close"
            >
              <Icon iconName="close" />
            </a>
          </div>
        </div>

        <nav className={classNames('nav', styles.menu__nav)}>
          <ul className={classNames('nav__list', styles.menu__list)}>
            <li className={styles['menu__nav-item']}>
              <Link
                to="/home"
                className={classNames(
                  'uppercase-text',
                  styles['menu__nav-link'],
                )}
              >
                Home
              </Link>
            </li>
            <li className={styles['menu__nav-item']}>
              <Link
                to="/phones"
                className={classNames(
                  'uppercase-text',
                  styles['menu__nav-link'],
                )}
              >
                Phones
              </Link>
            </li>
            <li className={styles['menu__nav-item']}>
              <Link
                to="/tablets"
                className={classNames(
                  'uppercase-text',
                  styles['menu__nav-link'],
                )}
              >
                Tablets
              </Link>
            </li>
            <li className={styles['menu__nav-item']}>
              <Link
                to="/accessories"
                className={classNames(
                  'uppercase-text',
                  styles['menu__nav-link'],
                )}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.menu__footer}>
          <Link to="/favorites" className={styles.menu__link}>
            <Icon iconName="favorites" />
          </Link>
          <Link to="/cart" className={styles.menu__link}>
            <Icon iconName="cart" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
