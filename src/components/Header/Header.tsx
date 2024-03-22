import { Logo } from '../Logo/Logo';
import { Navbar } from './elements/Navbar/Navbar';
import { UserActions } from './elements/UserActions/UserActions';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Logo className="header__logo" />

        <Navbar />
      </div>
      <div className="header__right">
        <UserActions />
      </div>
    </header>
  );
};
