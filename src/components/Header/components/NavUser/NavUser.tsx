import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';
import { FAVORITES, CART } from '../../../../utils/routes';
import { getActiveLinkClass } from '../../../../utils/getActiveNavLink';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useMenu } from '../../../../contexts/MenuProvider';
import styles from './NavUser.module.scss';
import { useCatalog } from '../../../../contexts/CatalogProvider';

export const NavUser: FC = () => {
  const { toggleMenu } = useMenu();
  const { favorites } = useCatalog();
  const { favoritesUrl, cartUrl } = useIconSrc();

  const isActiveLink = getActiveLinkClass(styles);

  return (
    <div className={styles.navUser}>
      <div className={styles.list}>
        <ThemeSwitcher />
        <div className={styles.item}>
          <NavLink to={FAVORITES} className={isActiveLink} onClick={toggleMenu}>
            <div className={styles.img}>
              <img src={favoritesUrl} alt="favorites" />
              {favorites.length > 0 && (
                <span className={styles.count}>
                  <p className={styles.countText}>{favorites.length}</p>
                </span>
              )}
            </div>
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
