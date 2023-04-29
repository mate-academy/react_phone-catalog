import Navbar from '../Header/Navbar/Navbar';
import Shopbar from '../Header/Shopbar/Shopbar';
import './Menu.scss';

const Menu = () => (
  <div className="menu menu-active">
    <Navbar />
    <Shopbar />
  </div>
);

export default Menu;
