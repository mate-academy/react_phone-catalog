import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  return (
    <div className={styles.header} id="header">
      <a href="#" className={classNames(styles.header__link)}>
        <img
          src="./img/icons/logo.svg"
          className={classNames('logo', styles.header__icon)}
          alt="logo"
        />
      </a>

      {/* <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">Home</li>
          <li className="nav__item">Phones</li>
          <li className="nav__item">Tablets</li>
          <li className="nav__item">Accessories</li>
        </ul>
      </nav> */}

      <a href="#" className={classNames(styles.header__menu)}></a>
    </div>
  );
};
