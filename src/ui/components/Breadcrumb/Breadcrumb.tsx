import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Icon, Typography } from '../../base';

import './Breadcrumb.scss';

type Props = {
  path: string;
  className?: string;
};

export const Breadcrumb: React.FC<Props> = ({ path, className }) => {
  const currentPath = path.split('/').filter(link => link !== '');
  const activeLink = currentPath[currentPath.length - 1];

  return (
    <ul className={clsx('breadcrumb', className)}>
      <li className="breadcrumb__item">
        <Link to="../../" className="breadcrumb__link">
          <Icon
            id="home"
            width={16}
            height={16}
            className="breadcrumb__icon home-icon"
          />
        </Link>
      </li>

      {currentPath.map(breadcrumb => (
        <li key={breadcrumb} className="breadcrumb__item">
          <Icon
            id="arrow-right"
            width={16}
            height={16}
            className="breadcrumb__icon arrow-icon"
          />
          <Link
            to={
              activeLink === breadcrumb
                ? `../${breadcrumb}`
                : `../../${breadcrumb}`
            }
            className={clsx(
              'breadcrumb__link',
              activeLink === breadcrumb && 'active',
            )}
          >
            <Typography type="text" size="sm" weight="600">
              {breadcrumb.replaceAll('-', ' ')}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
};
