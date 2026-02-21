import { Link } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="App_menu">
      <nav className="menu">
        <div className="menu_list">
          <Link to="/" className="menu_link">
            Home
          </Link>
          <Link to="/phones" className="menu_link">
            Phones
          </Link>
          <Link to="/tablets" className="menu_link">
            Tablets
          </Link>
          <Link to="/accessories" className="menu_link">
            Accessories
          </Link>
        </div>
      </nav>
      <div className="menu_buttons-wrapper">
        <Link to="favorites" className="menu_bottom_icon">
          <div className="menu_icon-wrapper">
            <img src="img/Favourites(Heart Like).svg" alt="Favorites icon" />
          </div>
        </Link>
        <Link to="shoppingcart" className="menu_bottom_icon">
          <div className="menu_icon-wrapper">
            <img src="img/Shoppingbag(Cart).svg" alt="Schopping icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};
