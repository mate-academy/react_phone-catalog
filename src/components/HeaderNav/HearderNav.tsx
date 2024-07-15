import './Header.scss';
import { Link } from 'react-router-dom';

export const HeaderNav = () => {
  return (
    <div>
      <div className="container">
        <a href="/" target="_self" className="logo">
          <img src="./uploadedImg/logo.png" alt="Logo"></img>
        </a>
        <ul className="links">
          <li>
            <Link to="/" className="link">
              home
            </Link>
          </li>
          <li>
            <Link to="/phones" className="link">
              phones
            </Link>
          </li>
          <li>
            <Link to="/tablets" className="link">
              tablets
            </Link>
          </li>
          <li>
            <Link to="/accessories" className="link">
              accessories
            </Link>
          </li>
        </ul>
        <ul className="icons">
          <li className="icon">
            <Link to="/favorites" className="icon-link onTablet">
              <img src="./uploadedImg/like.png"></img>
            </Link>
          </li>
          <li className="icon">
            <Link to="/bucket" className="icon-link onTablet">
              <img src="./uploadedImg/shoppingBag.png"></img>
            </Link>
          </li>
          <li className="icon">
            <a href="/" className="icon-link onMobile">
              <img src="./uploadedImg/burger.png"></img>
            </a>
          </li>
        </ul>
      </div>
      {/* <aside id="menu" className="header-menu-box">
        <div className="header-menu-header">header</div>
        <div className="header-menu-main">Main</div>
        <div className="header-menu-footer">Footer</div>
      </aside> */}
    </div>
  );
};
