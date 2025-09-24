import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = { categoryTitle: string; gadgetTitle?: string };

export const Breadcrumbs: React.FC<Props> = ({
  categoryTitle,
  gadgetTitle,
}) => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <span> / </span>
      {gadgetTitle ? (
        <>
          <NavLink to={`/${categoryTitle.toLowerCase()}`}>
            {categoryTitle}
          </NavLink>
          <span> / </span>
          <span>{gadgetTitle}</span>
        </>
      ) : (
        <span>{categoryTitle}</span>
      )}
    </nav>
  );
};
