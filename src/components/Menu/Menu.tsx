import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { ROUTES } from '../../constants/routes';
import classNames from 'classnames';
import { LuShoppingBag } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa6';
import { useFavourites } from '@/hooks/useFavourites';

const navigationLinkStyles = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menuNavLink, {
    [styles.menuNavLinkActive]: isActive,
  });

const actionLinkStyles = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menuActionLink, {
    [styles.menuActionLinkActive]: isActive,
  });

export const Menu = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.menu}>
      <nav className={styles.menuNavigation}>
        <ul>
          <li>
            <NavLink to={ROUTES.HOME} className={navigationLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.PHONES} className={navigationLinkStyles}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.TABLETS} className={navigationLinkStyles}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.ACCESSORIES} className={navigationLinkStyles}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menuActions}>
        <NavLink to={ROUTES.FAVORITES} className={actionLinkStyles}>
          <FaRegHeart size={16} />
          {favourites.length > 0 && (
            <span className={styles.actionLinkCount}>{favourites.length}</span>
          )}
        </NavLink>
        <NavLink to={ROUTES.CART} className={actionLinkStyles}>
          <LuShoppingBag size={16} />
        </NavLink>
      </div>
    </div>
  );
};
