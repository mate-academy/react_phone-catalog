import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './Burger.module.scss';
import classNames from 'classnames';

const getClassName = (baseClass: string) =>
  function ({ isActive }: { isActive: boolean }) {
    return classNames(styles[baseClass], { [styles['is-active']]: isActive });
  };

const getLinkClass = getClassName('burger__item');
const getButtonClass = getClassName('button');

type Props = {
  isMenuOpen: boolean;
};

export const Burger: React.FC<Props> = ({ isMenuOpen }) => {
  return (
    <aside className={classNames(styles.burger, { menu__open: isMenuOpen })}>
      <div className={styles.burger__menu}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="phones" className={getLinkClass}>
          Phones
        </NavLink>
        <NavLink to="tablets" className={getLinkClass}>
          Tablets
        </NavLink>
        <NavLink to="accessories" className={getLinkClass}>
          Accessories
        </NavLink>
        <div className="navbar-end"></div>
      </div>
      <div className={styles.burger__buttons}>
        <NavLink to="favourites" className={getButtonClass}>
          <span
            className={classNames(styles.icon, styles['icon--heart'])}
          ></span>
        </NavLink>
        <NavLink to="cart" className={getButtonClass}>
          <span
            className={classNames(styles.icon, styles['icon--cart'])}
          ></span>
        </NavLink>
      </div>
    </aside>
  );
};
