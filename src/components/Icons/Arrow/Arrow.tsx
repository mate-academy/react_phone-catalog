import React from 'react';
import classNames from 'classnames';
import styles from './Arrow.module.scss';
import { ArrowDirection } from '../../../types/arrowDirection';

type Props = {
  direction: ArrowDirection;
  className?: string;
};

const Arrow: React.FC<Props> = ({ direction, className = '' }) => {
  return (
    <div className={classNames(styles.arrow)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={classNames('size-6', className)}
      >
        {direction === ArrowDirection.left && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        )}
        {direction === ArrowDirection.right && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        )}
        {direction === ArrowDirection.up && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        )}
        {direction === ArrowDirection.down && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        )}
      </svg>
    </div>
  );
};

export default Arrow;
