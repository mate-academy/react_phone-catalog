import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Burger.module.scss';
import { NavIcon } from '../NavIcon';

const getClassName = ({ isActive }: { isActive: boolean }) =>
  classNames([styles.burger__item], { [styles['is-active']]: isActive });

// const getLinkClass = getClassName('burger__item');

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export const Burger: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  return (
    <aside className={classNames(styles.burger, { menu__open: isMenuOpen })}>
      <div className={styles.burger__menu}>
        <NavLink to="/" className={getClassName} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="phones" className={getClassName} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="tablets" className={getClassName} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink to="accessories" className={getClassName} onClick={onClose}>
          Accessories
        </NavLink>
        <div className="navbar-end"></div>
      </div>
      <div className={styles.burger__buttons} onClick={onClose}>
        <NavIcon icon="heart" link="favourites" />
        <NavIcon icon="cart" link="cart" />
      </div>
    </aside>
  );
};
