import { useLocation, useParams } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { SearchBar } from '../SearchBar/SearchBar';
import { HeaderButtons } from '../HeaderButtons/HeaderButtons';
import CategoriesList from '../../api/CategoriesList.json';
import './Header.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const { productId = '' } = useParams();

  const cartCondition = location.pathname.includes('cart');
  const favoriteCondition = location.pathname.includes('favorite');

  const productCategoriesList = CategoriesList.map(item => item.type).some(
    item => location.pathname.includes(item),
  ) && !productId;

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <Logo />
          </div>
          {!cartCondition && <Nav />}
        </div>
        <div className="header__right">
          {(favoriteCondition || productCategoriesList) && <SearchBar />}
          {!cartCondition && (
            <HeaderButtons
              type="favorite"
            />
          )}
          <HeaderButtons
            type="cart"
          />
        </div>
      </div>
    </div>
  );
};
