import React from 'react';
import { NavLink } from 'react-router-dom';
import './BreadCrumbs.scss';

type Props = {
  url: string,
  page: string,
  title: string,
};

export const BreadCrumbs: React.FC<Props> = ({ url, page, title }) => {
  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <NavLink
        to="/home"
        className="BreadCrumbs__backToHome"
        data-cy="backButton"
      />
      <span className="BreadCrumbs__span">
        &#62;
      </span>
      {!title && (
        <p className="BreadCrumbs__activePage">{page}</p>
      )}
      {title && (
        <>
          <NavLink
            to={url}
            className="BreadCrumbs__linkPage"
          >
            {page}
          </NavLink>
          <span className="BreadCrumbs__span">
            &#62;
          </span>
          <p className="BreadCrumbs__activePage">{title}</p>
        </>
      )}
    </div>
  );
};
