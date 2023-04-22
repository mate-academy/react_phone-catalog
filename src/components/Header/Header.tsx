import './Header.scss';

import Logo from '../Logo/Logo';
import Shopbar from './Shopbar/Shopbar';
import Navbar from './Navbar/Navbar';

const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__left">
        <Logo classNames="header__logo" />
        <Navbar />
      </div>

      <div className="header__right">
        <Shopbar />
      </div>
    </div>
  </header>
);

export default Header;
