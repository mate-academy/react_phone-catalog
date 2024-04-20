// import { NavLink } from 'react-router-dom';
import { Navbar } from '../NavBar/Navbar';
import './Header.scss';
// import classNames from 'classnames';

export const Header = () => {
  // const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   classNames('navbar-item', {
  //     'is-active': isActive,
  //   });

  return (
    <div className="header-container">
      <div className="logo">
        <img src="img/Logo.png" alt="" className="logo-img" />
      </div>
      {/* <div className="header-nav"> */}
      <Navbar />
      {/* <div className="nav-end">
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/cart">
              Cart
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/favorites">
              {`<3`}
            </NavLink>
          </li>
        </div> */}
      {/* </div> */}
    </div>
  );
};
