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
          {!!totalNumOfProducts && (
            <span className="buttonCartWrapper">{totalNumOfProducts}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
