import '../../styles/main.scss';
import { Icon } from '../Icon';
import styles from './SideMenu.module.scss';
import classNames from 'classnames';

export const SideMenu = () => {
  return (
    <aside className={classNames('App__menu', styles.menu)} id="menu">
      <div className={styles.menu__content}>
        <div className="top-bar">
          <a href="#" className="top-bar__link">
            <img src="./img/icons/logo.svg" className="logo" alt="logo" />
          </a>

          <a
            href="#"
            className="top-bar__icon-control top-bar__icon-control--close"
          >
            <Icon iconName="close" />
          </a>
        </div>

        <nav className={classNames('nav', styles.menu__nav)}>
          <ul className={classNames('nav__list', styles.menu__list)}>
            <li className={classNames('nav__item', styles['menu__nav-item'])}>
              <a href="#home" className="uppercase-text nav__link">
                Home
              </a>
            </li>
            <li className={classNames('nav__item', styles['menu__nav-item'])}>
              <a href="#phones" className="uppercase-text nav__link">
                Phones
              </a>
            </li>
            <li className={classNames('nav__item', styles['menu__nav-item'])}>
              <a href="#tablets" className="uppercase-text nav__link">
                Tablets
              </a>
            </li>
            <li className={classNames('nav__item', styles['menu__nav-item'])}>
              <a href="#accessories" className="uppercase-text nav__link">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.menu__footer}>
          <a href="#" className={styles.menu__link}>
            <Icon iconName="favorites" />
          </a>
          <a href="#" className={styles.menu__link}>
            <Icon iconName="cart" />
          </a>
        </div>
      </div>
    </aside>
  );
};
