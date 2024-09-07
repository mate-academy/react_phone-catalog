import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import {
  HOME,
  PHONES,
  TABLETS,
  ACCESSORIES,
  FAVORITES,
  CART,
} from '../../utils/routes';
import styles from './Header.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import classNames from 'classnames';

type Props = {};

export const Header: FC<Props> = ({}) => {
  const { logoUrl, cartUrl, favoritesUrl } = useIconSrc();

  const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
    return classNames(styles.link, {
      [styles.isActive]: isActive,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={HOME} className={styles.logo}>
          <img src={logoUrl} alt="" className={styles.img} />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to={HOME} className={isActiveLink}>
                Home
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to={PHONES} className={isActiveLink}>
                Phones
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to={TABLETS} className={isActiveLink}>
                Tablets
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to={ACCESSORIES} className={isActiveLink}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.navUser}>
        <ThemeSwitcher />
        <div className={styles.userList}>
          <div className={styles.item}>
            <NavLink to={FAVORITES} className={isActiveLink}>
              <img src={favoritesUrl} alt="" className={styles.img} />
            </NavLink>
          </div>
          <div className={styles.item}>
            <NavLink to={CART} className={isActiveLink}>
              <img src={cartUrl} alt="" className={styles.img} />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
