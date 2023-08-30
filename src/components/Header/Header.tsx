import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Favorites } from '../Favorites/Favorites';
import { Cart } from '../Cart/Cart';
import { Search } from '../Search/Search';
import { Button } from '../Button/Button';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';

import './Header.scss';

export const Header: FC = () => {
  const {
    isMobile,
    windowWidth,
    setIsMenuClicked,
  } = useContext(PhoneCatalogContext);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isSearchButtonClicked, setisSearchButtonClicked] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/cart') {
      setIsSearchBarVisible(true);
    } else {
      setIsSearchBarVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (windowWidth < 1024) {
      setisSearchButtonClicked(true);
    }
  }, [windowWidth]);

  const shouldRenderFavoritesAndCart
  = isSearchButtonClicked || windowWidth > 1023 || !isSearchBarVisible;

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
              isSearchButtonClicked={isSearchButtonClicked}
              onSearchButtonClicked={setisSearchButtonClicked}
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
              className="burger-menu"
              iconType="burger-menu"
              onClick={() => setIsMenuClicked(true)}
            />
          )}
        </div>
      </div>
    </header>
  );
};
