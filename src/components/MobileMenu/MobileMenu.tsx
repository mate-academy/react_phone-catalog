/* eslint-disable max-len */
import React, { MouseEventHandler, useContext } from 'react';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';
import '../../App.scss';
import { Navigation } from '../Navigation';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { CartContext, FavouriteContext } from '../../ContextProvider';
import { instantScroll } from '../../utils/instantScroll';
import { BtnType } from '../../types/BtnType';
import { getTotalProductsInCart } from '../../utils/getTotalProductsInCart';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const activeLink = (isActive: boolean, btnType: BtnType) => {
  return classNames(styles.mobileMenuBottomBtn, {
    buttonFavourite: btnType === BtnType.favorites,
    buttonCart: btnType === BtnType.cart,
    [styles.mobileMenuBottomBtnActive]: isActive,
  });
};

export const MobileMenu: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { cartProducts } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const totalNumOfProducts = getTotalProductsInCart(cartProducts);
  const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    instantScroll(e);
  };

  return (
    <aside
      className={classNames(styles.mobileMenuContainer, {
        [styles.mobileMenuContainerVisible]: isMobileMenuOpen,
      })}
    >
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className={styles.mobileMenuBottom}>
        <NavLink
          to="/favorites"
          className={({ isActive }) => activeLink(isActive, BtnType.favorites)}
          onClick={handleClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z" />
          </svg>
          {!!favouriteProducts.length && (
            <span className="buttonFavouriteWrapper">
              {favouriteProducts.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          state={{ search: searchParams.toString(), pathname }}
          className={({ isActive }) => activeLink(isActive, BtnType.cart)}
          onClick={handleClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
            <path d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
            <path d="M5.33366 6C5.70185 6 6.00033 6.29848 6.00033 6.66667C6.00033 7.1971 6.21104 7.70581 6.58611 8.08088C6.96118 8.45595 7.46989 8.66667 8.00033 8.66667C8.53076 8.66667 9.03947 8.45595 9.41454 8.08088C9.78961 7.70581 10.0003 7.1971 10.0003 6.66667C10.0003 6.29848 10.2988 6 10.667 6C11.0352 6 11.3337 6.29848 11.3337 6.66667C11.3337 7.55072 10.9825 8.39857 10.3573 9.02369C9.73223 9.64881 8.88438 10 8.00033 10C7.11627 10 6.26842 9.64881 5.6433 9.02369C5.01818 8.39857 4.66699 7.55072 4.66699 6.66667C4.66699 6.29848 4.96547 6 5.33366 6Z" />
          </svg>

          {!!totalNumOfProducts && (
            <span className="buttonCartWrapper">{totalNumOfProducts}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
