import { Cart } from './image-link/Cart';
import { Favourites } from './image-link/Favourites';
import { Logo } from '../Logo';
import { Nav } from './Nav';
import { Search } from './Search';
import { ProductType } from '../../helpers/enums/ProductType';

type HeaderProps = {
  hasSearch: boolean
  currentPage?: string
  favoritesCount?: number
  cartCount?: number
  hasNav?: boolean
  hasFavorites?: boolean
  activeCategory?: ProductType
};

export const Header = ({
  hasSearch,
  currentPage = '',
  favoritesCount,
  cartCount,
  hasNav,
  hasFavorites,
  activeCategory,
}: HeaderProps) => (
  <header id="header" className="header">
    <div className="header__part header__part--left">
      <Logo imageClasses="header__logo logo" />

      {hasNav && <Nav activeCategory={activeCategory} />}
    </div>

    <div className="header__part">
      {hasSearch && <Search currentPage={currentPage} />}

      {hasFavorites && <Favourites count={favoritesCount} />}

      <Cart count={cartCount} />
    </div>
  </header>
);

Header.defaultProps = {
  favoritesCount: -1,
  cartCount: -1,
  currentPage: '',
  hasNav: true,
  hasFavorites: true,
  activeCategory: ProductType.all,
};
