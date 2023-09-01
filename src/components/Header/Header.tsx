import './Header.scss';
import { NavBar } from '@/components/NavBar';
import { NavLinkMain } from '@/components/NavLinkMain';
import { Search } from '@/components/Search';
import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';
import { IconWithCounter } from '../IconWithCounter';

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__navigation">
        <Logo />
        <NavBar />
      </div>

      <Search />

      <div className="Header__actions">
        <NavLinkMain
          to="favourites"
          type="icon"
          aria-label="favourites"
        >
          <IconWithCounter type='favourites' />
        </NavLinkMain>

        <NavLinkMain
          to="cart"
          type="icon"
          aria-label="cart"
        >
          <IconWithCounter type='cart' />
        </NavLinkMain>
      </div>

      <Menu />
    </header>
  );
};
