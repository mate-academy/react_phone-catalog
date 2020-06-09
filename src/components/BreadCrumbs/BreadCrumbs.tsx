import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';


/*const routes = [
  {
    path: '/',
    component: () => <Home />,
  },
  {
    path: "/phones",
    component: () => <Catalog />,
  }
]*/



export const BreadCrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/");
  console.log(paths)
  return(
  <section className="bread-crumbs">
    {paths.map((path, index) => {
      const linkPath = paths.slice(0, index + 1).join('/');
      return (
        <React.Fragment key={path}>
          <NavLink
            to={linkPath}
            className = "bread-crumbs__link"
          >
            {path}
          </NavLink>
          <span className="bread-crumbs__link-arrow"></span>
        </React.Fragment>
      )}
    )}
  </section>
)
}

