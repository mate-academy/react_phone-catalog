import React from 'react';
import icons from '../../../icons/icons.svg';

type Props = {
  className: string;
  nameIcon: string;
};

/* eslint-disable max-len */
export const Icon: React.FC<Props> = ({ className, nameIcon }) => {
  return (
    <svg className={className}>
      <use href={`${icons}#${nameIcon}`}></use>
    </svg>
  );
};
