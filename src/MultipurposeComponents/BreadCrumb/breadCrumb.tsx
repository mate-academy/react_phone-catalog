import React, { FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './breadCrumb.scss';

type Params = {
  page: string;
  route?: string;
};

export const BreadCrumb: FC<Params> = ({ page, route }) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="breadcrumb">
        <NavLink to="/" className="breadcrumb__link">
          <img
            src="img/icons/home.svg"
            alt="home page"
            className="breadcrumb__link_home"
          />
        </NavLink>
        <img src="img/icons/arrow.svg" alt=" " className="breadcrumb__arrow" />
        <NavLink to={`/${page.toLocaleLowerCase()}`} className="breadcrumb__currentPage">{page}</NavLink>
        {route
        && (
          <>
            <img src="img/icons/arrow.svg" alt=" " className="breadcrumb__arrow" />
            <span className="breadcrumb__currentPage">{route}</span>
          </>
        )}
      </div>
      {route
      && (
        <>
          <div className="breadcrumb__back">
            <button type="button" onClick={goBack} className="breadcrumb__back_button">
              <img src="img/icons/arrow.svg" alt=" " className="breadcrumb__arrow breadcrumb__arrow_back" />
              <span className="breadcrumb__currentPage">Back</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};
