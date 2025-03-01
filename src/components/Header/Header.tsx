import { Link } from 'react-router-dom';
import './Header.scss';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header__link-logo">
        <img src="./img/icons/Logo.png" alt="Nice gadgets" className="header__logo" />
      </Link>

      <BurgerMenu />

      <div className="header__links">
        <Link to="/favourites" className="header__link-favourites">
          <img src="./img/icons/Favourites.png" alt="Favourites" className="header__favourites" />
        </Link>
        <Link to="/cart" className="header__link-cart">
          <img src="./img/icons/Shopping bag (Cart).png" alt="Cart" className="header__cart" />
        </Link>
      </div>
    </header>
  );
};
