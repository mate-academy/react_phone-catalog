import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useLocation,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { MenuButton } from '../MenuButton';
import { PageNav } from '../PageNav';
import { TopActionButton } from '../TopActionButton';
import { SearchBar } from '../SearchBar';
import productCategory from '../../api/productCategory.json';
import './Header.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const { productId = '' } = useParams();

  const [isOpened, setIsOpened] = useState(false);

  const productCategoryList = productCategory.map(item => item.type);

  const searchBarCondition = productCategoryList.some(
    item => location.pathname.includes(item),
  ) && !productId.length;

  const cartCondition = location.pathname.includes('cart');
  const favoriteCondition = location.pathname.includes('favorite');

  const handleIsOpened = useCallback((menuStatus: boolean) => {
    setIsOpened(menuStatus);
  }, []);

  useEffect(() => {
    setIsOpened(false);
  }, [location]);

  return (
    <header className="page__header header">
      <div className="header__main-container">
        {!cartCondition && (
          <div
            className="
              header__menu
              top-actions__menu"
          >
            <MenuButton
              isOpened={isOpened}
              onClick={handleIsOpened}
            />
          </div>
        )}

        <div
          className={classNames(
            'header__logo',
            { 'header__logo--cart': cartCondition },
          )}
        >
          <Logo />
        </div>

        {!cartCondition && (
          <nav className="header__nav">
            <PageNav
              type="header"
            />
          </nav>
        )}

        <div
          className="
            header__actions
            top-actions"
        >
          {searchBarCondition
            && <SearchBar />}

          {favoriteCondition
            && <SearchBar />}

          {!cartCondition && (
            <TopActionButton
              type="favorite"
            />
          )}

          <TopActionButton
            type="cart"
          />
        </div>
      </div>

      {!cartCondition && (
        <div className="header__menu-list-container">
          <nav
            className={classNames(
              'header__menu-list',
              'menu',
              { page__menu: !isOpened },
              { 'page__menu--opened': isOpened },
            )}
          >
            <PageNav
              type="menu"
            />
          </nav>
        </div>
      )}
    </header>
  );
};
