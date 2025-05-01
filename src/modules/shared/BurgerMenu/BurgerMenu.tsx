import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../store/GlobalContext';

const navLink = [
  { to: '/', tab: 'Home' },
  { to: '/phones', tab: 'Phones' },
  { to: '/tablets', tab: 'Tablets' },
  { to: '/accessories', tab: 'Accessories' },
];

export const BurgerMenu = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.burgerMenu__link, {
      [styles.activeBurgerLink]: isActive,
    });
  };

  const { isMenuClose, setIsMenuClose } = useContext(GlobalContext);

  return (
    <div className={styles.burgerMenu}>
      <ul className={styles.burgerMenu__list}>
        {navLink.map(({ to, tab }) => (
          <li className={styles.burgerMenu__item} key={to}>
            <NavLink
              to={to}
              className={getLinkActive}
              onClick={() => setIsMenuClose(true)}
            >
              {tab}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
