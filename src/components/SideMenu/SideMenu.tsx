import '../../styles/main.scss';
import styles from './SideMenu.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';

export const SideMenu = () => {
  return (
    <aside className={classNames('App__menu', styles.menu)} id="menu">
      <div className={styles.menu__content}>
        <div className="top-bar">
          <a href="#" className="top-bar__link">
            <img src="./img/icons/logo.svg" className="logo" alt="logo" />
          </a>

          <a href="#" className="icon icon--close top-bar__close-icon"></a>
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

        <div className="sideMenu__footer">
          <a href="#" className="sideMenu__link sideMenu__link--favorites">
            <FontAwesomeIcon
              icon={outlineHeart}
              // icon={isFavorite ? solidHeart : outlineHeart}
              // className={classNames(styles.favoriteIcon, {
              //   [styles.regular]: !isFavorite,
              // })}
            />
          </a>
          <a href="#" className="sideMenu__link sideMenu__link--cart">
            <FontAwesomeIcon
              icon={outlineHeart}
              // icon={isFavorite ? solidHeart : outlineHeart}
              // className={classNames(styles.favoriteIcon, {
              //   [styles.regular]: !isFavorite,
              // })}
            />
          </a>
        </div>
      </div>
    </aside>
  );
};
