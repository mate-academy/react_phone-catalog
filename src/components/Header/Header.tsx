import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarLogoAndButtons_buttons_isActive]: isActive });

  const getAdditionalButtonsClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarIcons_icon_isActive]: isActive });

  const favouriteAmount = useAppSelector(
    state => state.addedFavourites.items,
  ).length;

  const bucketAmount = useAppSelector(state => state.addedBucket.items).length;

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarLogoAndButtons}>
        <Link to="/home">
          <img src="../../img/header/Logo.svg" alt="logoTop" />
        </Link>

        <nav className={styles.topbarLogoAndButtons_buttons}>
          <ul>
            <li>
              <NavLink to="/home" className={getLinkClass}>
                home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getLinkClass}>
                phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getLinkClass}>
                tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getLinkClass}>
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.topbarIcons}>
        <div className={styles.topbarIcons_icon}>
          <NavLink to="/favourites" className={getAdditionalButtonsClass}>
            <img
              className={styles.topbarIcons_icon_inside}
              src="../../img/icons/favourites.svg"
              alt="favourites"
            />
            <div className={styles.topbarIcons_icon__amountFav}>
              {favouriteAmount}
            </div>
          </NavLink>
        </div>
        <div className={styles.topbarIcons_icon}>
          <NavLink to="/bucket" className={getAdditionalButtonsClass}>
            <img
              className={styles.topbarIcons_icon_inside}
              src="../../img/icons/bucket_header.svg"
              alt="bucket_header"
            />
            <div className={styles.topbarIcons_icon__amountBucket}>
              {bucketAmount}
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.topbarIcons_menu}>
        <img src="../../img/icons/Menu.svg" alt="menu" />
      </div>
    </div>
  );
};
