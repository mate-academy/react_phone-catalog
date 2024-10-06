import { NavLink } from 'react-router-dom';
import './Breadcrumbs.scss';
import React from 'react';

type Props = {
  paragraph: string;
  model?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ paragraph, model }) => (
  <div className="breadcrumbs">
    <NavLink to="/" className="home__icon"></NavLink>
    <div className="right__arrow"></div>
    {model ? (
      <>
        <NavLink
          to={`/${paragraph}`}
          className="breadcrumbs__paragraph breadcrumbs__paragraph--active"
        >
          {paragraph}
        </NavLink>
        <div className="right__arrow"></div>
        <p className="breadcrumbs__paragraph">{model}</p>
      </>
    ) : (
      <p className="breadcrumbs__paragraph">{paragraph}</p>
    )}
  </div>
);
