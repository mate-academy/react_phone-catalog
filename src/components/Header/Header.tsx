import { useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { Nav } from '../Nav/Nav';
import { SearchBar } from '../SearchBar';

type Props = {
  isMenuActive: boolean;
  handleBurgerClick?: () => void;
};

export const Header: React.FC<Props> = ({
  isMenuActive,
  handleBurgerClick,
}) => {
  const location = useLocation();

  const isCatalogPage =
    location.pathname.includes('/phones') ||
    location.pathname.includes('/tablets') ||
    location.pathname.includes('/accessories');

  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo className="header__logo" />

        {isCatalogPage && <SearchBar className="header__search-bar" />}

        <Nav className="header__nav" />

        <button className="header__menu-btn" onClick={handleBurgerClick}>
          <span className="sr-only">
            {isMenuActive ? 'Close menu' : 'Open menu'}
          </span>

          <Icon iconName={isMenuActive ? 'icon-close' : 'icon-burger'} />
        </button>
      </div>
    </header>
  );
};
