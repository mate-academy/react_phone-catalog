import React from 'react';
import classNames from 'classnames';
import styles from './Arrow.module.scss';
import { ArrowDirection } from '../../../types/arrowDirection';

type Props = {
  className: string;
  direction: ArrowDirection;
  theme?: 'light' | 'dark';
};
const Arrow: React.FC<Props> = ({ className, direction, theme = 'dark' }) => {
  return (
    <button
      className={classNames(className, styles.arrow, {
        [styles['arrow--light']]: theme === 'light',
      })}
    >
      {direction === ArrowDirection.left && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      )}

      {direction === ArrowDirection.right && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
};

export default Arrow;
