import React from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  const navList = ['home', 'phones', 'tablets', 'accessories'];
  //const [navList, setNavList] = useState([]);

  return (
    <>
      <nav className="Nav__wrapper">
        <ul className="Nav__list">
          <li>
            <NavLink to="/home"
              exact
              className="Logo"
            >
            </NavLink>
          </li>
          {navList.map((listItem) => (
            <li>
              <NavLink
                to={`${listItem}`}
                exact
                className="Nav__item link"
                activeClassName="Nav__item--active"
                key={listItem}
              >
                {listItem}
              </NavLink>
            </li>
          ))
          }

        </ul>
      </nav>
    </>
  )
}
export default Navigation;

