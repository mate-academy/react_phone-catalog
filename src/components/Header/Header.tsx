import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarLogoAndButtons_buttons_isActive]: isActive });

  const getAdditionalButtonsClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarIcons_icon_isActive]: isActive });

  const favouriteAmount = useAppSelector(
    state => state.addedFavourites.items,
  ).length;

  const bucketProducts = useAppSelector(state => state.addedBucket.items);

  const bucketAmount = bucketProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Whenever the location changes, close the menu (except when on "/menu" route)
  useEffect(() => {
    if (location.pathname === '/menu') {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [location]);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarLogoAndButtons}>
        <Link to="/home">
          <img
            className={styles.topbarLogoAndButtons__logo}
            src="img/header/Logo.svg"
            alt="logoTop"
          />
        </Link>

        <nav className={styles.topbarLogoAndButtons_buttons}>
          <ul>
            <li>
              <NavLink to="/" className={getLinkClass}>
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
              src="img/icons/favourites.svg"
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
              src="img/icons/bucket_header.svg"
              alt="bucket_header"
            />
            <div className={styles.topbarIcons_icon__amountBucket}>
              {bucketAmount}
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.topbarIcons_menu} onClick={handleMenuToggle}>
        {isMenuOpen ? (
          <Link to="/home">
            <img
              className={styles.topbarIcons_menu_button}
              src="img/icons/Close-black.svg"
              alt="menu-close"
            />
          </Link>
        ) : (
          <Link to={'/menu'}>
            <img
              className={styles.topbarIcons_menu_button}
              src="img/icons/Menu.svg"
              alt="menu"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
