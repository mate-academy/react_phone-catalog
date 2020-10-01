import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';


export const BreadCrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/");

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
