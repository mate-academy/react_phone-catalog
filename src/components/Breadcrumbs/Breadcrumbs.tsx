import React from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  name: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ name }) => {
  return (
    <>
      <div className="Breadcrumbs">
        <Link to="/home"><img src="img/Home.png" alt="home_icon" className="Breadcrumbs__icon" /></Link>
        <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
        <p className="Breadcrumbs__active">{name}</p>
      </div>
    </>
  );
};
