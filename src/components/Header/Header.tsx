import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { Logo } from '../Logo';
import { SecondaryNavLink } from '../SecondaryNavLink';
import { NavigationLink } from '../NavigationLink';

import { NAVIGATION_LINKS } from '../../types/NavigationLinkType.ts';

import styles from './Header.module.scss';
const {
  header,
  header__content,
  header__logo,
  header__logo__block,
  header__burger,
  header__links,
  header__buttons,
  header__buttonWrapper,
} = styles;

export const Header = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.menu);
  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cart);

  const favItemsAmount = favoriteItems.length;
  const cartItemsAmount = cartItems.reduce(
    (totalAmount, current) => totalAmount + current.quantity,
    0,
  );

  const menuIcon = isOpen
    ? '/icons/icon-close.svg'
    : '/icons/header-burger-menu.svg';

  return (
    <header id="header" className={header}>
      <div className={header__content}>
        <div className={header__logo}>
          <div className={header__logo__block}>
            <Logo placement="header" />
          </div>
        </div>

        <button
          className={header__burger}
          onClick={() => dispatch(toggleMenu())}
        >
          <img src={menuIcon} alt="menu" />
        </button>

        <div className={header__links}>
          {NAVIGATION_LINKS.map((link, index) => (
            <NavigationLink key={index} url={link.url} name={link.name} />
          ))}
        </div>

        <div className={header__buttons}>
          <div className={header__buttonWrapper}>
            <SecondaryNavLink
              image="/icons/emty-heart.svg"
              url="/user/favourites"
              amount={favItemsAmount}
              name="favourites"
            />
          </div>

          <div className={header__buttonWrapper}>
            <SecondaryNavLink
              image="/icons/icon-cart.svg"
              url="/user/cart"
              amount={cartItemsAmount}
              name="cart"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
