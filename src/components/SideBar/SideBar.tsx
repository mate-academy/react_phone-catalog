import { useAppSelector } from '../../hooks';

import { Header } from '../Header';
import { SecondaryNavLink } from '../SecondaryNavLink';
import { SidebarNavLink } from '../SidebarNavLink';

import { NAVIGATION_LINKS } from '../../types/NavigationLinkType';

import styles from './SideBar.module.scss';
const {
  sidebar,
  sidebar__isOpen,
  sidebar__isClosed,
  sidebar__header,
  sidebar__content,
  sidebar__nav,
  sidebar__footer,
  sidebar__linkWrapper,
} = styles;

export const SideBar = () => {
  const { isOpen } = useAppSelector((state) => state.menu);
  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cart);

  const favItemsAmount = favoriteItems.length;
  const cartItemsAmount = cartItems.length;

  return (
    <aside
      className={`${sidebar} ${isOpen ? sidebar__isOpen : sidebar__isClosed}`}
    >
      <div className={sidebar__header}>
        <Header />
      </div>

      <div className={sidebar__content}>
        <nav className={sidebar__nav}>
          {NAVIGATION_LINKS.map((link, index) => (
            <SidebarNavLink key={index} url={link.url} name={link.name} />
          ))}
        </nav>

        <div className={sidebar__footer}>
          <div className={sidebar__linkWrapper}>
            <SecondaryNavLink
              image="/icons/emty-heart.svg"
              url="/user/favourites"
              name="favourites"
              amount={favItemsAmount}
            />
          </div>

          <div className={sidebar__linkWrapper}>
            <SecondaryNavLink
              image="/icons/icon-cart.svg"
              url="/user/cart"
              name="cart"
              amount={cartItemsAmount}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
