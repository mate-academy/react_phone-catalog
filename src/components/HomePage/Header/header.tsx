// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const isActiveButton = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'styles.header_buttoms_selected' : '';
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_buttoms_container}>
        <a href="">
          <img src="./img/logo.png" alt="logo" className={styles.header_logo} />
        </a>

        <NavLink
          to={'/'}
          className={classNames(styles.header_buttoms, isActiveButton)}
        >
          home
        </NavLink>
        <NavLink
          to={'/phones'}
          className={classNames(styles.header_buttoms, isActiveButton)}
        >
          Phones
        </NavLink>
        <div className={styles.header_buttoms}>tablets</div>
        <div className={styles.header_buttoms}>accessories</div>
      </div>

      <div>
        <a href="" className={styles.header_buttoms_additional}>
          <img src="/img/Vector_heart.svg" alt="logo" />
        </a>
        <a href="" className={styles.header_buttoms_additional}>
          <img src="/img/Shopping_bag.svg" alt="logo" />
        </a>
      </div>
    </div>
  );
};
