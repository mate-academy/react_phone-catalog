import './Navbar.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
// import { GridContainer } from '../GridContainer/GridContainer';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'is-active': isActive,
    });

  return (
    <nav className="nav">
      <ul className="nav__list">
        <div className="nav-start">
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/phone">
              Phone
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/tables">
              Tables
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className={getLinkClass} to="/smart">
              Accessories
            </NavLink>
          </li>
        </div>
        <div className="nav-end">
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
        </div>
      </ul>
    </nav>
  );
};
// <nav
//   className="navbar hsa-shadow"
//   role="navigation"
//   aria-label="main navigation"
// >
//   <div className="container">
//     <div className="navbar-brand">
// <NavLink className={getLinkClass} to="/">
//   Home
// </NavLink>

// <NavLink className={getLinkClass} to="/phone">
//   Phone
// </NavLink>

// <NavLink className={getLinkClass} to="/tables">
//   Tables
// </NavLink>

// <NavLink className={getLinkClass} to="/smart">
//   Accessories
// </NavLink>
//     </div>
//     <div className="navbar-end">
//       <NavLink className={getLinkClass} to="/cart">
//         Cart
//       </NavLink>

//       <NavLink className={getLinkClass} to="/favorites">
//         Favorites
//       </NavLink>
//     </div>
//   </div>
// </nav>
