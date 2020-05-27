import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './breadCrumb.scss';

type Params = {
  page: string;
};

export const BreadCrumb: FC<Params> = ({ page }) => {
  return (
    <div className="breadcrumb">
      <NavLink to="/" className="breadcrumb__link">
        <img
          src="img/icons/home.svg"
          alt="home page"
          className="breadcrumb__link_home"
        />
      </NavLink>
      <img src="img/icons/arrow.svg" alt=" " className="breadcrumb__arrow" />
      <span className="breadcrumb__currentPage">{page}</span>
    </div>
  );
};
