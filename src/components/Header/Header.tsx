import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarLogoAndButtons_buttons_isActive]: isActive });

  const getAdditionalButtonsClass = ({ isActive }: { isActive: boolean }) =>
    classNames({ [styles.topbarIcons_icon_isActive]: isActive });

  const favouriteAmount = useAppSelector(
    state => state.addedFavorites.items,
  ).length;

  const bucketProducts = useAppSelector(state => state.addBucket.items);

  const bucketAmount = bucketProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            src="/img/logo.png"
            alt="Nice Gadgets"
          />
        </Link>

        <nav className={styles.topbarLogoAndButtons_buttons}>
          <ul>
            <li>
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>

            <li>
              <NavLink to="/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>

            <li>
              <NavLink to="/accessories" className={getLinkClass}>
                Accessories
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
              src="/img/icons/favourites.svg"
              alt="favourites"
            />
            <div className={styles.topbarIcons_icon__amountFav}>
              {favouriteAmount > 0 && <span>{favouriteAmount}</span>}
            </div>
          </NavLink>
        </div>
        <div className={styles.topbarIcons_icon}>
          <NavLink to="/bucket" className={getAdditionalButtonsClass}>
            <img
              className={styles.topbarIcons_icon_inside}
              src="/img/icons/shopping-bag.svg"
              alt="bucket_header"
            />
            <div className={styles.topbarIcons_icon__amountBucket}>
              {bucketAmount > 0 && <span>{bucketAmount}</span>}
            </div>
          </NavLink>
        </div>
      </div>

      <div className={styles.topbarIcons_menu} onClick={handleMenuToggle}>
        {isMenuOpen ? (
          <Link to="/home">
            <img
              className={styles.topbarIcons_menu_button}
              src="/img/icons/icon-close.svg"
              alt="menu-close"
            />
          </Link>
        ) : (
          <Link to={'/menu'}>
            <img
              className={styles.topbarIcons_menu_button}
              src="/img/icons/icon-menu.svg"
              alt="menu"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
