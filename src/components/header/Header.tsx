import { useContext } from 'react';

import { Cart } from './image-link/Cart';
import { Favourites } from './image-link/Favourites';
import { Logo } from '../Logo';
import { Nav } from './Nav';
import { Search } from './Search';
import { isBigScreen } from '../../helpers/functions/Functions';
import { DropDownMenuContext } from '../../helpers/context/DropDownMenuContext';
import { ProductType } from '../../helpers/enums/ProductType';

type HeaderProps = {
  hasSearch: boolean
  currentPage?: string
  favoritesCount?: number
  cartCount?: number
  hasNav?: boolean
  hasFavorites?: boolean
  activeLink?: ProductType
};

export const Header = ({
  hasSearch,
  currentPage = '',
  favoritesCount,
  cartCount,
  hasNav,
  hasFavorites,
  activeLink,
}: HeaderProps) => {
  const { expandMenu } = useContext(DropDownMenuContext);

  return (
    <header id="header" className="header">
      <div className="header__part header__part--left">
        {isBigScreen() ? (
          <>
            <Logo imageExtraClass="header__logo logo" />

            {hasNav && <Nav activeLink={activeLink} />}
          </>
        ) : (
          <button
            className="header__dropdown-menu"
            onClick={expandMenu}
            type="button"
          >
            <img src="img/menu.svg" alt="menu" />
          </button>
        )}
      </div>

      <div className="header__part">
        {hasSearch && <Search currentPage={currentPage} />}

        {isBigScreen() && hasFavorites && <Favourites count={favoritesCount} />}

        {isBigScreen() && <Cart count={cartCount} />}
      </div>
    </header>
  );
};

Header.defaultProps = {
  favoritesCount: -1,
  cartCount: -1,
  currentPage: '',
  hasNav: true,
  hasFavorites: true,
  activeLink: ProductType.all,
};
