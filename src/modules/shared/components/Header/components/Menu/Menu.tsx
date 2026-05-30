/* eslint-disable max-len */
import classNames from 'classnames';
import { useAppSelector } from '../../../../../../api/hooks';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import favorIcon from '../../../../../../assets/images/header/Favourites (Heart Like).png';
import shopBag from '../../../../../../assets/images/header/Shopping bag (Cart).png';
import { useTranslation } from 'react-i18next';

type Props = {
  onMenuClosed: () => void;
};

const Menu: React.FC<Props> = ({ onMenuClosed }) => {
  const lengthOfFavourites =
    useAppSelector(state => state.favourites.listOfDevices).length || 0;
  const lengthOfCart = useAppSelector(state => state.cart.cartList).length || 0;
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <div>
        <ul className={styles.nav__list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
              onClick={() => onMenuClosed()}
            >
              {t('home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
              onClick={() => onMenuClosed()}
            >
              {t('phones')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
              onClick={() => onMenuClosed()}
            >
              {t('tablets')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
              onClick={() => onMenuClosed()}
            >
              {t('accessors')}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.nav__icon__links}>
        <NavLink
          to="/favourites"
          className={({ isActive }) => {
            return classNames(styles.nav__icon__link, {
              [styles.nav__link__active]: isActive,
            });
          }}
          onClick={() => onMenuClosed()}
        >
          <img src={favorIcon} alt="icon-favour" className={styles.favourite} />
          {!!lengthOfFavourites && (
            <div className={styles.count}>{lengthOfFavourites}</div>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => {
            return classNames(styles.nav__icon__link, {
              [styles.nav__link__active]: isActive,
            });
          }}
          onClick={() => onMenuClosed()}
        >
          <img src={shopBag} alt="shopBag" className={styles.shopBag} />
          {!!lengthOfCart && <div className={styles.count}>{lengthOfCart}</div>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Menu;
