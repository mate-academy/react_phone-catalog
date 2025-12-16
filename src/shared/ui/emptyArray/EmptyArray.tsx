import React from 'react';
import styles from './EmptyArray.module.scss';

type Props = {
  pathname: string;
};

export const EmptyArray: React.FC<Props> = ({ pathname }) => {
  const firstSegment = pathname.split('/')[1];

  return (
    <p className={`button-text ${styles.notification}`}>
      There are no {firstSegment} yet
    </p>
  );
};
