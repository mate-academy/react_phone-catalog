import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';
import logo from './imgs/Logo.svg';
import logoBlack from './imgs/LogoBlack.svg';
import fav from '../src/imgs/Favourites.svg';
import bag from './imgs/Cart.svg';
import { useContext, useState } from 'react';
import { LikedIdContext } from './utils/context';
import { handleButton } from './utils/generalFunctions';

export const App = () => {
  const [menu, setMenu] = useState(false);
  const { likedIds, cardIds } = useContext(LikedIdContext);

  const handleMenu = () => {
    setMenu(!menu);
  };

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
                {likedIds.length > 0 && (
                  <span className="navbar_buttons_link_counter">
                    {likedIds.length}
                  </span>
                )}
              </NavLink>
              <NavLink to="card" className="navbar_buttons_link">
                <img src={bag} alt="bag" />
                {cardIds.length > 0 && (
                  <span className="navbar_buttons_link_counter">
                    {cardIds.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
        <nav className="navbarPhone">
          <div className="navbarPhone_container">
            <img src={logo} alt="logo" className="navbarPhone_container_logo" />
            <div className="navbarPhone_container_menu">
              <button
                className="navbarPhone_container_menu_button"
                onClick={handleMenu}
              ></button>
            </div>
          </div>
        </nav>
        <aside>
          <div
            className="aside"
            style={{
              transform: menu ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <div className="aside_menu">
              <img src={logoBlack} alt="logo" className="aside_menu_logo" />
              <div className="aside_menu_container">
                <button
                  className="aside_menu_container_button"
                  onClick={handleMenu}
                ></button>
              </div>
            </div>
            <div className="aside_nav">
              <NavLink
                to="/home"
                onClick={handleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'navbar_links_text active navbar_links_text--phone active'
                    : 'navbar_links_text navbar_links_text--phone'
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/phones"
                onClick={handleMenu}
                className="navbar_links_text navbar_links_text--phone"
              >
                PHONES
              </NavLink>
              <NavLink
                to="/tablets"
                onClick={handleMenu}
                className="navbar_links_text navbar_links_text--phone"
              >
                TABLETS
              </NavLink>
              <NavLink
                to="/accessories"
                onClick={handleMenu}
                className="navbar_links_text navbar_links_text--phone"
              >
                ACCESSORIES
              </NavLink>
            </div>
            <div className="x">
              <NavLink
                to="liked"
                onClick={handleMenu}
                className={({ isActive }) => (isActive ? 'x_1 active' : 'x_1')}
              >
                {likedIds.length > 0 && (
                  <span className="x_1_counterPhone">{likedIds.length}</span>
                )}
              </NavLink>

              <NavLink
                to="card"
                onClick={handleMenu}
                className={({ isActive }) => (isActive ? 'x_2 active' : 'x_2')}
              >
                {cardIds.length > 0 && (
                  <span className="x_2_counterPhone">{cardIds.length}</span>
                )}
              </NavLink>
            </div>
          </div>
        </aside>
      </header>

      <div className="section">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer_logo">
          <img src={logo} alt="logo" className="footer_logo_img" />
        </div>
        <div className="footer_nav">
          <a
            href="https://github.com/MarkiMark3"
            target="_blank"
            className="footer_nav_links"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/markiyan-dmyterko-bb74021b7/"
            target="_blank"
            className="footer_nav_links"
            rel="noreferrer"
          >
            CONTACTS
          </a>
          <a href="" className="footer_nav_links">
            RIGHTS
          </a>
        </div>
        <div className="footer_misc">
          <p className="footer_misc_title">Back to top</p>
          <button className="footer_misc_button" onClick={handleButton.scrollTop}>
            &#10095;
          </button>
        </div>
      </footer>
    </div>
  );
};
