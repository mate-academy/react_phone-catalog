import Logo from '../../assets/logo.svg';
import Cart from '../../assets/Icons/Cart.svg';
import Favorites from '../../assets/Icons/Favourites.svg';

export const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="header__logo">
          <img src={Logo} alt="logo" />
        </div>

        <nav className="header__nav">
          <ul>
            <li>Phones</li>
            <li>Tablets</li>
            <li>Accessories</li>
          </ul>
        </nav>

        <div className="header__cart">
          <img src={Cart} alt="cart" />
        </div>
        <div className="favorites">
          <img src={Favorites} alt="favorites" />
        </div>
      </div>
    </header>
  );
};
