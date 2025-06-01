import { MenuUI } from './menu-ui';
import { Nav } from './navigation';
import { Logo } from '../../../shared/ui/components/Logo';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <div className="header__nav-container">
      <Logo />
      <Nav />
    </div>

    <MenuUI />
  </header>
);
