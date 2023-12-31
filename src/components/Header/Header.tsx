import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PageLinkType } from '../../types/PageLinkType';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { PageLink } from '../PageLink';
import { Counter } from '../Counter';
import { Search } from '../Search';

import './Header.scss';

const validSearchPathes = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favourites',
];

export const Header = () => {
  const { cartItems } = useAppSelector(state => state.cartItems);
  const cartQuantity = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const { favouriteItems } = useAppSelector(state => state.favouriteItems);
  const favouriteQuantity = useMemo(() => {
    return favouriteItems.length;
  }, [favouriteItems]);

  const location = useLocation();
  const isCartPage = useMemo(() => {
    return location.pathname === '/cart';
  }, [location]);

  const isVisibleSearch = useMemo(() => {
    return validSearchPathes.some(path => path === location.pathname);
  }, [location]);

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
          >
            <Counter quantity={favouriteQuantity} />
          </PageLink>
        )}

        <PageLink
          to="/cart"
          linkType={PageLinkType.CART}
        >
          <Counter quantity={cartQuantity} />
        </PageLink>
      </div>
    </header>
  );
};
