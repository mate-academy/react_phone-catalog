import './Menu.scss';
import Navbar from '../Header/Navbar/Navbar';
import Shopbar from '../Header/Shopbar/Shopbar';

const Menu = () => (
  <div className="menu menu-active">
    <Navbar />
    <Shopbar />
  </div>
);

export default Menu;
