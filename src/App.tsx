// import classNames from 'classnames';
import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';
import logo from './imgs/Logo.svg';
import fav from '../src/imgs/Favourites.svg';
import bag from './imgs/Cart.svg';

// interface Active {
//   isActive: boolean
// }

// const activeLink = ({ isActive }: Active) => classNames('navbar-item', {
//   'is-active': isActive,
// });

export const App = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <div className="navbar_container">
            <div className="navbar_links">
              <img src={logo} alt="logo" className="navbar_logo" />
              <NavLink to="/home" className="navbar_links_text">
                HOME
              </NavLink>
              <NavLink to="/phones" className="navbar_links_text">
                PHONES
              </NavLink>
              <NavLink to="/tablets" className="navbar_links_text">
                TABLETS
              </NavLink>
              <NavLink to="/accessories" className="navbar_links_text">
                ACCESSORIES
              </NavLink>
            </div>
            <div className="navbar_buttons">
              <a href="" className="navbar_buttons_link">
                <img src={fav} alt="heart" />
              </a>
              <a href="" className="navbar_buttons_link">
                <img src={bag} alt="bag" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className="section">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer_logo">
          <img src={logo} alt="logo" className="footer_logo_img" />
        </div>
        <div className="footer_nav">
          <a href="" className="footer_nav_links">
            GITHUB
          </a>
          <a href="" className="footer_nav_links">
            CONTACTS
          </a>
          <a href="" className="footer_nav_links">
            RIGHTS
          </a>
        </div>
        <div className="footer_misc">
          <p className="footer_misc_title">Back to top</p>
          <button className="footer_misc_button" onClick={scrollTop}>
            &#10095;
          </button>
        </div>
      </footer>
    </div>
  );
};
