import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../images/icons/home.svg';
import { twMerge } from 'tailwind-merge';
import arrowDisabledImg from '../images/icons/arrow-top-disabled.svg';
import React from 'react';
import { convertHyphenToSpace } from '../helpers/functions';

interface Props {
  className?: string;
}

export const NavForm: React.FC<Props> = ({ className = '' }) => {
  const location = useLocation();
  const routeArray = location.pathname.split('/').slice(1);

  return (
    <div className={twMerge('flex h-4 items-center gap-2', className)}>
      <Link to="/">
        <img src={homeIcon} alt="Home" />
      </Link>

      {routeArray.map(route => (
        <React.Fragment key={route}>
          <img className="rotate-90" src={arrowDisabledImg} alt="Divider" />

          <Link to={location.pathname.split(route)[0] + route}>
            <p className="text-secondary hover:text-primary">
              {convertHyphenToSpace(route)}
            </p>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
