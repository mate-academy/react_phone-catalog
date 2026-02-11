import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../Icon';

interface Props {
  additionalClass?: string;
}

export const BackLink: React.FC<Props> = ({ additionalClass = '' }) => {
  return (
    <Link to=".." className={cn('backLink', additionalClass)}>
      <Icon iconSlug="ChevronLeft" />
      <span className="backLink__text">Back</span>
    </Link>
  );
};
