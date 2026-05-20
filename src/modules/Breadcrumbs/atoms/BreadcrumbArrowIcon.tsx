import React from 'react';
import { Icon } from '../../shared/atoms/Icon';
import { ArrowIcon } from '../../../assets/icons/arrow-icon';

type Props = {
  className?: string;
};

export const BreadcrumbArrowIcon: React.FC<Props> = ({ className }) => (
  <Icon direction="right" color="inherit" className={className}>
    <ArrowIcon />
  </Icon>
);
