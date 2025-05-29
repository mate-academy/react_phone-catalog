import { MenuUI } from '../../features/menu-ui';
import { Nav } from '../../features/navigation/';
import { Logo } from '../../store/ui/Logo';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <div className="header__nav-container">
      <div className="header__logo-wrapper">
        <Logo />
      </div>
      <div className="header__nav-wrapper">
        <Nav />
      </div>
    </div>

    <div className="header__ui">
      <MenuUI />
    </div>
  </header>
);
