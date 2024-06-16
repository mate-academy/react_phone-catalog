import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector, useWindowDimensions } from '../../../hooks/hooks';
import heart from './../../../images/icons/favorite.svg';
import shop from './../../../images/icons/shop.svg';
import styles from './Tools.module.scss';
import { getTotalAmountOfItems } from '../../../helpers/helpers';
import classNames from 'classnames';
import { Product } from '../../../utils/types/Product';
import { HeaderSearch } from '../HeaderSearch';
import { TABLET_SIZE } from '../../../consts/consts';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Tools: React.FC<Props> = ({ setIsOpen }) => {
  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__tools__button, {
      [styles.header__tools__button_active]: isActive,
    });
  const { pathname } = useLocation();
  const favoritesItems: Product[] = useAppSelector(state => state.favorites);

  const cartItems: Product[] = useAppSelector(state => state.cart.items);

  const amountOfProducts: number = getTotalAmountOfItems(cartItems);
  const { width } = useWindowDimensions();
  const isShowSearch =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  return (
    <div className={styles.header__tools_wrapper}>
      {isShowSearch && width > TABLET_SIZE && <HeaderSearch />}
      <NavLink
        to="/favorites"
        className={activeLink}
        onClick={() => setIsOpen(false)}
      >
        <div className={styles.header__tools_tool}>
          <img src={heart} alt="Heart" />
          {favoritesItems.length > 0 && (
            <span className={styles.header__tools_count}>
              {favoritesItems.length}
            </span>
          )}
        </div>
      </NavLink>
      <NavLink
        to="/cart"
        className={activeLink}
        onClick={() => setIsOpen(false)}
      >
        <div className={styles.header__tools_tool}>
          <img src={shop} alt="Shop" />
          {amountOfProducts > 0 && (
            <span className={styles.header__tools_count}>
              {amountOfProducts}
            </span>
          )}
        </div>
      </NavLink>
    </div>
  );
};
