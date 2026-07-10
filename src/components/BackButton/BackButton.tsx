import { Link } from 'react-router-dom';
import styles from './BackButton.module.scss';
import React from 'react';

type Props = {
  path: string;
};

export const BackButton: React.FC<Props> = ({ path }) => {
  return (
    <Link to={path} className={styles.backLink}>
      <img
        className={styles.icon}
        src="/img/icons/arrow-left.svg"
        alt="Arrow left"
      />

      <span className={styles.text}>Back</span>
    </Link>
  );
};
