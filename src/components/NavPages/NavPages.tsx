import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavPages.scss';

export const NavPages: React.FC = () => {
  const location = useLocation().pathname.split('/').slice(1);

  return (
    <div className="navpages">
      <NavLink to="/" className="navpages__link">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846
              8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667
              5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725
              14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667
              15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916
              14.7475C1.54409 14.3725 1.33337 13.8638 1.33337
              13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075
              5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671
              13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656
              14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381
              13.8047C13.2631 13.6797 13.3334 13.5101 13.3334
              13.3333V6.32605L8.00004
              2.1779L2.66671 6.32605Z"
            fill="#313237"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.33337 8.00001C5.33337
            7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667
            7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10
            15.3333C9.63185 15.3333 9.33337 15.0349 9.33337
            14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823
            15.3333 6.00004
            15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z"
            fill="#313237"
          />
        </svg>
      </NavLink>
      {location.slice(0, 2).map((x, i) => (
        <div key={x} className="navpages__wrapper">
          <div className="navpages__arrow" />
          {i === 1 ? (
            <div className="navpages__link">{x}</div>
          ) : (
            <NavLink to={`/${x}`} className="navpages__link" key={x}>
              {x}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
};
