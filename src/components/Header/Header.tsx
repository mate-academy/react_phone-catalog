import '../../variable.scss';
import './Header.scss';
import Logo from '../../../public/img/Logo/Logo.png';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <a href="#" className="logo">
            <img src={Logo} alt="Logo" />
          </a>
          <div className="nav menu__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#" className="nav__link">
                  HOME
                </a>
              </li>
              <li className="nav__item">
                <a href="#phones" className="nav__link">
                  PHONES
                </a>
              </li>
              <li className="nav__item">
                <a href="#tablets" className="nav__link">
                  TABLETS
                </a>
              </li>
              <li className="nav__item">
                <a href="#accessories" className="nav__link">
                  ACCESSORIES
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header__right">
          <div className="top-bar__icons">
            <a href="" className="icon icon--heart"></a>
            <a href="" className="icon icon--basket"></a>
            <a href="#menu" className="icon icon--menu"></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
