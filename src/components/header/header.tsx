import classNames from 'classnames';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AsideMenuPhone } from '../asideMenuPhone';
import logo from '/public/img/niceLogo.png';
import { FiShoppingBag } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { NavBar } from '../navBar';
import { Count } from '../countFavorite/cart/count';
import { useAppSelector } from '../../app/hooks';
import { getTotalItemsCart } from '../utils/getTotalItemsCart';

export const Header = () => {
  const cartItems = useAppSelector(state => state.cartItem.cartItems);
  const favouriteItems = useAppSelector(
    state => state.favourite.favouriteItems,
  );
  const cartItemsCount = getTotalItemsCart(cartItems);
  const [activeAsside, setActiveAsside] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, { [styles['is-active']]: isActive });

  return (
    <>
      <header className={styles.header} id="page-top">
        <div className={styles.header__content}>
          <NavLink to="/">
            <img
              className={styles.header__logo}
              src={logo}
              alt="NiceGadgetLogo"
            ></img>
          </NavLink>

          <NavBar getLinkClass={getLinkClass} types={'header'} />
        </div>
        <div className={styles.box}>
          {!activeAsside ? (
            <GiHamburgerMenu
              className={classNames(styles.box__icon, [
                styles['box__icon--burger'],
              ])}
              onClick={() => setActiveAsside(prev => !prev)}
            />
          ) : (
            <IoMdClose
              className={classNames(styles.box__icon, [
                styles['box__icon--close'],
              ])}
              onClick={() => setActiveAsside(prev => !prev)}
            />
          )}

          <NavLink to="/favourites" className={getLinkClass}>
            <FaRegHeart
              className={classNames(styles.box__icon, [
                styles['box__icon--visible'],
              ])}
            />
            {favouriteItems.length > 0 && (
              <Count count={favouriteItems.length} />
            )}
          </NavLink>
          <div className={styles.box__divider}></div>

          <NavLink to="/cart" className={getLinkClass}>
            <FiShoppingBag
              className={classNames(styles.box__icon, [
                styles['box__icon--visible'],
              ])}
            />
            {cartItemsCount > 0 && <Count count={cartItemsCount} />}
          </NavLink>
        </div>
      </header>
      {activeAsside && (
        <AsideMenuPhone
          setActiveAsside={setActiveAsside}
          cartItemsCount={cartItemsCount}
          favouriteItems={favouriteItems.length}
          getLinkClass={getLinkClass}
        />
      )}
    </>
  );
};
