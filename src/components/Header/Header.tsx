import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Favorites } from '../Favorites/Favorites';
import { Cart } from '../Cart/Cart';
// import { Icon } from '../Icon/Icon';
import { Search } from '../Search/Search';

import './Header.scss';
import { Button } from '../Button/Button';

type Props = {
  isMobile: boolean;
  windowWidth: number;
  onMobileClicked: (isMenuClicked: boolean) => void;
};

export const Header: FC<Props> = ({
  isMobile,
  windowWidth,
  onMobileClicked,
}) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { pathname } = useLocation();

  // const handleSearchClick = () => {
  //   setIsSearchClicked(curr => !curr);
  // };

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/shopping-cart') {
      setIsSearchBarVisible(true);
    } else {
      setIsSearchBarVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (windowWidth < 1024) {
      setIsSearchClicked(true);
    }
  }, [windowWidth]);

  const shouldRenderFavoritesAndCart
  = isSearchClicked || windowWidth > 1023 || !isSearchBarVisible;

  const shouldRenderMobileButton
  = isMobile && shouldRenderFavoritesAndCart;

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left-bar">
          <Logo />

          {!isMobile && <Nav />}
        </div>

        <div className="header__right-bar">
          {isSearchBarVisible && (
            <Search
              currentPage={pathname.slice(1)}
              isSearchClicked={isSearchClicked}
              onSearchClicked={setIsSearchClicked}
              isSearchBoxExpanded={windowWidth > 1023}
            />
          )}

          {shouldRenderFavoritesAndCart && !isMobile && (
            <>
              <Favorites />
              <Cart />
            </>
          )}

          {shouldRenderMobileButton && (
            <Button
              content="icon"
              iconType="burger-menu"
              className="burger-menu"
              event={() => onMobileClicked(true)}
            />
          )}
        </div>
      </div>
    </header>
  );
};
