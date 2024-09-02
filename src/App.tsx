// import classNames from 'classnames';
import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';
import logo from './imgs/Logo.svg';
import fav from '../src/imgs/Favourites.svg';
import bag from './imgs/Cart.svg';
import { useContext } from 'react';
import { LikedIdContext } from './utils/context';

export const App = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { likedIds, cardIds } = useContext(LikedIdContext);

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <div className="navbar_container">
            <div className="navbar_links">
              <img src={logo} alt="logo" className="navbar_logo" />
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? 'navbar_links_text active' : 'navbar_links_text'
                }
              >
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
              <NavLink
                to="liked"
                className={({ isActive }) =>
                  isActive
                    ? 'navbar_buttons_link active'
                    : 'navbar_buttons_link'
                }
              >
                <img src={fav} alt="heart" />
                <span className="navbar_buttons_link_counter">
                  {likedIds.length}
                </span>
              </NavLink>
              <NavLink to="card" className="navbar_buttons_link">
                <img src={bag} alt="bag" />
                <span className="navbar_buttons_link_counter">
                  {cardIds.length}
                </span>
              </NavLink>
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
