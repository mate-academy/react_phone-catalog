import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Home from './Home';

const Breadcrumbs = (props: { title: React.ReactNode; subtitle: string }) => {
  return (
    <div className="breadcrumbs">
      <NavLink to="/" exact className="breadcrumbs__home">
        <img
          src="img/icons/home.svg"
          alt="home icon"
        />
      </NavLink>
      <img
        src="img/icons/breadcrumbs-arrow.svg"
        alt="arrow icon"
        className="breadcrumbs__arrow"
      />
      <NavLink to={`/${props.title}`} className="breadcrumbs__title">
        {props.title}
      </NavLink>
      {
        props.subtitle
          ? (
            <>
              <img
                src="img/icons/breadcrumbs-arrow.svg"
                alt="arrow icon"
                className="breadcrumbs__arrow"
              />
              <p className="breadcrumbs__subtitle">
                {props.subtitle}
              </p>
            </>
          )
          : ''
      }
      <Route path="/" exact component={Home} />
    </div>
  );
};

export default Breadcrumbs;
