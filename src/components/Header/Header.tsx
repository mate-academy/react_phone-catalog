import '../../variable.scss';
import './Header.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import { useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <Link to="/" className="logo">
            <img src={Logo} alt="Logo" />
          </Link>

          <div className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">
                  HOME
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/phones" className="nav__link">
                  PHONES
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/tablets" className="nav__link">
                  TABLETS
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/accessories" className="nav__link">
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header__right">
          <div className="top-bar__icons">
            <Link to="/heart" className="icon icon--heart"></Link>
            <Link to="/heart" className="icon icon--basket"></Link>
            <button
              className="icon icon--menu"
              onClick={() => setIsMenuOpen(true)}
            ></button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
