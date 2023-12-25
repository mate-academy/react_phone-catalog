import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PageLinkType } from '../../types/PageLinkType';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { PageLink } from '../PageLink';
import { Search } from '../Search';

import './Header.scss';

export const Header = () => {
  const { cartItems } = useAppSelector(state => state.cartItems);
  const cartQuantity = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const { favouriteItems } = useAppSelector(state => state.favouriteItems);
  const favouriteQuantity = favouriteItems.length;

  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  const validSearchPathes = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favourites',
  ];

  const isVisibleSearch = validSearchPathes
    .some(path => path === location.pathname);

  return (
    <header className="Page-Header Header">
      <div className="Header-Left">
        <Logo />

        <Nav />
      </div>

      <div className="Header-Right">
        {isVisibleSearch && <Search />}

        {!isCartPage && (
          <PageLink
            to="/favourites"
            linkType={PageLinkType.HEART}
            quantity={favouriteQuantity}
          />
        )}

        <PageLink
          to="/cart"
          linkType={PageLinkType.CART}
          quantity={cartQuantity}
        />
      </div>
    </header>
  );
};
