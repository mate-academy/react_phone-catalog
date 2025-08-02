import React from 'react';
import { Icon } from '../../shared/atoms/Icon';
import { HomeIcon } from '../../../assets/icons/home-icon';

type Props = {
  className?: string;
};

export const BreadcrumbHomeIcon: React.FC<Props> = ({ className }) => (
  <Icon className={className} color="inherit">
    <HomeIcon />
  </Icon>
);
