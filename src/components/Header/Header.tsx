import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { Nav } from '../Nav/Nav';

type Props = {
  isMenuActive: boolean;
  handleBurgerClick?: () => void;
};

export const Header: React.FC<Props> = ({
  isMenuActive,
  handleBurgerClick,
}) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo className="header__logo" href="/" />

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
