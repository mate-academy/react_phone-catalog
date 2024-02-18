import React, { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { PAGE } from '../../../definitions/enums/Router';

import './Logo.scss';

interface Props extends Omit<LinkProps, 'to' | 'className'> {
  className?: string
}

export const Logo: React.FC<Props> = memo(({ className, ...props }) => (
  <Link
    to={PAGE.Home}
    className={`logo ${className}`}
    {...props}
  >
    <img src="./img/logos/logo.svg" alt="" />
  </Link>
));
