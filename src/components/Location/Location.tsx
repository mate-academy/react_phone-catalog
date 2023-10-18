import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Location: React.FC = () => {
  const location = useLocation();

  return (
    <div className="location">
      {location.pathname.split('/').map((link, index) => {
        return index !== 0 ? (
          <Link
            key={link}
            to={`/${link}`}
            className={
              classNames(
                'location__link',
                {
                  location__you_location:
                  index === location.pathname.split('/').length - 1,
                },
              )
            }
          >
            {link.slice(0, 1).toUpperCase() + link.slice(1)}
          </Link>
        ) : (
          <Link to="/" key={link}>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.59087 0.807088C6.83161 0.619846 7.16872
                0.619846 7.40946 0.807088L13.4095 5.47375C13.5718
                5.60006 13.6668 5.79426 13.6668 5.99999V13.3333C13.6668
                13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226
                12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333
                1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496
                13.8638 0.333496 13.3333V5.99999C0.333496 5.79426 0.428478
                5.60006 0.590869 5.47375L6.59087 0.807088ZM1.66683
                6.32605V13.3333C1.66683 13.5101 1.73707 13.6797
                1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335
                14H11.6668C11.8436 14 12.0132 13.9298
                12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335
                13.3333V6.32605L7.00016 2.1779L1.66683 6.32605Z"
                fill="#313237"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.3335 8.00001C4.3335 7.63182 4.63197 7.33334
                5.00016 7.33334H9.00016C9.36835 7.33334 9.66683
                7.63182 9.66683 8.00001V14.6667C9.66683 15.0349 9.36835
                15.3333 9.00016 15.3333C8.63197 15.3333 8.3335 15.0349
                8.3335 14.6667V8.66668H5.66683V14.6667C5.66683 15.0349
                5.36835 15.3333 5.00016 15.3333C4.63197 15.3333 4.3335
                15.0349 4.3335 14.6667V8.00001Z"
                fill="#313237"
              />
            </svg>

          </Link>
        );
      })}
    </div>
  );
};
