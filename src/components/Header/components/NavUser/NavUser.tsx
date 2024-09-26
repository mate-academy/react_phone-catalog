import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';
import { FAVORITES, CART } from '../../../../utils/routes';
import { getActiveLinkClass } from '../../../../utils/getActiveNavLink';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useMenu } from '../../../../contexts/MenuProvider';
import styles from './NavUser.module.scss';

export const NavUser: FC = () => {
  const { toggleMenu } = useMenu();
  const { favoritesUrl, cartUrl } = useIconSrc();

  const isActiveLink = getActiveLinkClass(styles);

  return (
    <div className={styles.navUser}>
      <div className={styles.list}>
        <ThemeSwitcher />
        <div className={styles.item}>
          <NavLink to={FAVORITES} className={isActiveLink} onClick={toggleMenu}>
            <img src={favoritesUrl} alt="" className={styles.img} />
          </NavLink>
        </div>
        <div className={styles.item}>
          <NavLink to={CART} className={isActiveLink} onClick={toggleMenu}>
            <img src={cartUrl} alt="" className={styles.img} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
