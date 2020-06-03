import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Phones from './phones/Phones';
import Tablets from './tablets/Tablets';
import Accessories from './accessories/Accessories';
import './Navigation.scss';

const Navigation = () => {
  //const navList = ['home', 'phones', 'tablets', 'accessories'];
  //const [navList, setNavList] = useState([]);

  // useEffect(() => {
  //   getNavList().then(setNavList)
  // }, []);

  return (
    <>
      <nav className="Nav_wrapper">
        <ul className="Nav_list">
          <li className="link">
            <NavLink
              to="/home"
              exact
              className="Nav_item link"
              activeClassName="Nav_item--active"
            >
              Home
              </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/phones"
              className="Nav_item link"
              activeClassName="Nav_item--active"
            >
              Phones
              </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/tablets"
              className="Nav_item link"
              activeClassName="Nav_item--active"
            >
              Tablets
              </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/accessories"
              className="Nav_item link"
              activeClassName="Nav_item--active"
            >
              Accessories
              </NavLink>
          </li>

        </ul>
      </nav>

      <Switch>
        <Route path="/home">  <Home />  </Route>
        <Route path="/phones" component={Phones} />
        <Route path="/tablets" component={Tablets} />
        <Route path="/accessories" component={Accessories} />
        <Route component={() => <h1>NOT FOUND</h1>} />
      </Switch>
    </>

  )

}
export default Navigation;




{/* <ul>{navList.map((listItem, index) => (
        <li>
          <NavLink to = '/listItem' exact
           key = {index}
           activeClassName = "nav_item--active"
           >
          {listItem}
          </NavLink>
        </li>
      ))
      }

    </ul> */}
