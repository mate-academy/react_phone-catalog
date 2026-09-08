import React from 'react';
import classNames from 'classnames';
import styles from './CloseIco.module.scss';

const CloseIco: React.FC = () => {
  return (
    <div className={styles.CloseIco}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={classNames('size-6')}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default CloseIco;
