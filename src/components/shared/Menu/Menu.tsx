import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  isOpenMenu: boolean;
};

export const Menu: React.FC<Props> = ({ isOpenMenu }) => {
  const { isSunSelected } = useContext(GlobalContext);

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.menu__link, {
      [styles['menu__link-active']]: isActive,
      [styles['menu__link-dark']]: !isSunSelected,
      [styles['menu__link-dark-active']]: !isSunSelected && isActive,
    });

  return (
    <nav
      className={styles.menu}
      style={isOpenMenu ? { display: 'flex' } : { display: '' }}
    >
      <ul
        className={classNames(styles.menu__list, {
          [styles['menu__list-dark']]: !isSunSelected,
        })}
        style={isOpenMenu ? { display: 'flex' } : { display: '' }}
      >
        <li className={styles.menu__item}>
          <NavLink className={getActiveLink} to="/">
            Home
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink className={getActiveLink} to="/phones">
            Phones
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink className={getActiveLink} to="/tablets">
            Tablets
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink className={getActiveLink} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
