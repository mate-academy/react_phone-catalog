import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../images/icons/home.svg';
import { twJoin, twMerge } from 'tailwind-merge';
import arrowDisabledImg from '../images/icons/arrow-top-disabled.svg';
import React from 'react';
import { convertHyphenToSpace } from '../helpers/functions';

interface Props {
  className?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const routeArray = location.pathname.split('/').slice(1);

  return (
    <div
      className={twMerge(
        'flex h-4 items-center gap-2 overflow-hidden',
        className,
      )}
    >
      <Link className="aspect-square h-full" to="/">
        <img className="h-full w-full" src={homeIcon} alt="Home" />
      </Link>

      {routeArray.map((route, index) => (
        <React.Fragment key={route}>
          <img className="rotate-90" src={arrowDisabledImg} alt="Divider" />

          {routeArray.length - 1 !== index ? (
            <Link to={location.pathname.split(route)[0] + route}>
              <p
                className="font-semibold text-primary transition
              hover:text-secondary"
              >
                {convertHyphenToSpace(route)}
              </p>
            </Link>
          ) : (
            <p
              className={twJoin(
                'overflow-hidden text-ellipsis whitespace-nowrap',
                routeArray.length - 1 === index && 'text-secondary',
              )}
            >
              {convertHyphenToSpace(route)}
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
