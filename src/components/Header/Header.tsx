import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { useLocation, useParams } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { Logo } from '../Logo';
import { TopActionsBar } from '../TopActionsBar';
import { Search } from '../Search';
import { MenuButton } from '../MenuButton';
import productCategory from '../../api/productCategories.json';
import './Header.scss';

export const Header: React.FC = () => {
  const { productId = '' } = useParams();
  const location = useLocation();

  const isFavoritePage = location.pathname.includes('favorites');
  const isCartPage = location.pathname.includes('cart');

  const productCategoryList = productCategory.map(item => item.type);
  const isSearchPanel = productCategoryList.find(
    item => location.pathname.includes(item) && !productId,
  );

  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(prevStatus => !prevStatus);
  }, []);

  useEffect(() => {
    setIsOpened(false);
  }, [location]);

  return (
    <header className="
      page__header
      header"
    >
      <div className="header__container">
        {!isCartPage && (
          <div className="
            header__menu
            top-actions__menu"
          >
            <MenuButton
              isOpened={isOpened}
              onClick={handleOpen}
            />
          </div>
        )}

        <div
          className={classNames(
            'header__logo',
            { 'header__logo--cart': isCartPage },
          )}
        >
          <Logo />
        </div>

        {!isCartPage && (
          <nav className="header__nav">
            <NavBar type="header" />
          </nav>
        )}

        <div className="
          header__actions
          top-actions"
        >
          {isSearchPanel && (
            <Search
              isMenuOpened={isOpened}
              handleOpenMenu={handleOpen}
            />
          )}

          {isFavoritePage && (
            <Search
              isMenuOpened={isOpened}
              handleOpenMenu={handleOpen}
            />
          )}

          {!isCartPage && (
            <TopActionsBar type="favorites" />
          )}

          <TopActionsBar type="cart" />
        </div>
      </div>

      {!isCartPage && (
        <div className="header__menu-list-container">
          <nav
            className={classNames(
              'header__menu-list',
              'menu',
              {
                page__menu: !isOpened,
                'page__menu--opened': isOpened,
              },
            )}
          >
            <NavBar type="menu" />
          </nav>
        </div>
      )}
    </header>
  );
};
