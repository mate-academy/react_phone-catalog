import { Outlet, Link } from 'react-router-dom';
import { Menu } from '../../Components/Menu/Menu';
import { Tabs } from '../../Components/Tabs/Tabs';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  return (
    <>
      <div className="NavBar">
        <div className="NavBar__wrapper">
          <div className="NavBar__left">
            <Link to="/" className="NavBar__link">
              <img
                src="./assets/LOGO.svg"
                alt="logo"
                className="NavBar__logo"
              />
            </Link>
            <Menu />
          </div>
          <div className="NavBar__right">
            <Tabs />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
