import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { PAGE } from '../../../definitions/enums/Router';

import './BreadCrumbs.scss';
import { useBreadCrumbs } from '../../../enhancers/hooks/breadCrumbs';
import ArrowIcon from '../Icons/ArrowIcon';

interface Props {
  className?: string,
}

export const BreadCrumbs: React.FC<Props> = memo(({ className }) => {
  const breadCrumbs = useBreadCrumbs();

  if (!breadCrumbs.length) {
    return <></>;
  }

  return (
    <ul className={`bread-crumbs ${className || ''}`}>
      <li className='bread-crumbs__item'>
        <Link to={PAGE.Home} className='bread-crumbs__link'>
          <img src="./img/icons/home-icon.svg" alt="home icon" loading='lazy'/>
        </Link>

        <ArrowIcon className='bread-crumbs__arrow' fill='var(--c-tips)' />
      </li>

      {breadCrumbs.map(({ link, name, isActive }, index) => {
        const isLast = index === breadCrumbs.length - 1;
        const classes = 'bread-crumbs__item' +
          (isActive ? ' bread-crumbs__item--active' : '');

        return (
          <li className={classes} key={link}>
            <Link to={link}>{name}</Link>

            {!isLast && (
              <ArrowIcon className='bread-crumbs__arrow' fill='var(--c-tips)' />
            )}
          </li>
        );
      })}
    </ul >
  );
});
