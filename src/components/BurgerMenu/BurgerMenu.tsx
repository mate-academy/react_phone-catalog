import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../imgs/svg/Logo.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div className={classNames(styles.menu, { [styles.menu_open]: isOpen })}>
      <div className={styles.menu__header}>
        <NavLink to="/" className={styles.menu__header_logo}>
          <img className={styles.menu__header_img} src={logo} alt="logo" />
        </NavLink>
        <button
          className={styles.menu__header_cross}
          onClick={onClose}
        ></button>
      </div>
      <div className={styles.menu__links}>
        <NavLink className={styles.menu__link} to="/" onClick={onClose}>
          home
        </NavLink>
        <NavLink className={styles.menu__link} to="/phones" onClick={onClose}>
          phones
        </NavLink>
        <NavLink className={styles.menu__link} to="/tablets" onClick={onClose}>
          tablets
        </NavLink>
        <NavLink
          className={styles.menu__link}
          to="/accessories"
          onClick={onClose}
        >
          accessories
        </NavLink>
      </div>
      <footer className={styles.menu__footer}>
        <NavLink
          className={styles.menu__footer_favorites}
          to="/favorites"
          onClick={onClose}
        ></NavLink>
        <NavLink
          className={styles.menu__footer_cart}
          to="/cart"
          onClick={onClose}
        ></NavLink>
      </footer>
    </div>
  );
};
