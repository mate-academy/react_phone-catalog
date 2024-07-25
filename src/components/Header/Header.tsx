import '../../styles/main.scss';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  return (
    <div className={styles.header} id="header">
      <div className="top-bar">
        <a href="#" className="top-bar__link">
          <img src="./img/icons/logo.svg" className="logo" alt="logo" />
        </a>

        <nav className="nav header__nav">
          <ul className={classNames('nav__list', styles.header__list)}>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a
                href="#home"
                className={classNames(
                  'uppercase-text nav__link',
                  styles['header__nav-link'],
                )}
              >
                Home
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a href="#phones" className="uppercase-text nav__link">
                Phones
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a href="#tablets" className="uppercase-text nav__link">
                Tablets
              </a>
            </li>
            <li className={classNames('nav__item', styles['header__nav-item'])}>
              <a href="#accessories" className="uppercase-text nav__link">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="#menu"
          className={classNames('icon icon--menu top-bar__menu-icon')}
        ></a>
      </div>
    </div>
  );
};
