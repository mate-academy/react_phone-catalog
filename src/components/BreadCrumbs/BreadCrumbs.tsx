import { Link, useLocation } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';
import React from 'react';
import { HomeIcon } from '../Icons/HomeIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';

interface Props {
  className?: string;
  productName?: string;
}

export const BreadCrumbs: React.FC<Props> = ({ className, productName }) => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter(x => x);

  return (
    <nav className={`${style.breadCrumbs} ${className}`}>
      <Link to="/" className={style.breadCrumbs__link}>
        <HomeIcon />
      </Link>
      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNames.length - 1;

        return (
          <React.Fragment key={name}>
            <span className={style.breadCrumbs__separator}>
              {<ArrowRightIcon />}
            </span>
            {isLast && productName ? (
              <span className={style.breadCrumbs__text}>{productName}</span>
            ) : isLast ? (
              <span className={style.breadCrumbs__text}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={routeTo} className={style.breadCrumbs__link}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
