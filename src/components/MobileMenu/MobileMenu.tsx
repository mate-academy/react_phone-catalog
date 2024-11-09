import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import icons from '../../assets/icons/icons.svg';
import classNames from 'classnames';

type MobileMenuProps = {
  isOpen: boolean;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.mobileMenuNavLink} ${styles.active}`
    : styles.mobileMenuNavLink;

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  return (
    <aside
      className={classNames(styles.mobileMenu, { [styles.active]: isOpen })}
    >
      <nav className={styles.mobileMenuNav}>
        <NavLink to="/" className={getNavLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getNavLinkClassName}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getNavLinkClassName}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={getNavLinkClassName}>
          Accessories
        </NavLink>
      </nav>

      <div className={styles.mobileMenuIconWrapper}>
        <div className={styles.mobileFavouriteBtn}>
          <svg className={styles.icon}>
            <use href={`${icons}#heart-icon`}></use>
          </svg>
        </div>
        <div className={styles.mobileCartIcon}>
          <svg className={styles.icon}>
            <use href={`${icons}#shopping-bag-icon`}></use>
          </svg>
        </div>
      </div>
    </aside>
  );
};
