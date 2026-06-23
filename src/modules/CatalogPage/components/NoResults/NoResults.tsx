import React from 'react';

import styles from './NoResults.module.scss';

type Props = {
  text?: string;
};

export const NoResults: React.FC<Props> = ({ text }) => {
  const message = `There are no ${text} yet`;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{message}</h2>
    </div>
  );
};
