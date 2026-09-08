import React from 'react';
import { Link } from 'react-router-dom';

import { ChevronIcon } from '../iconsSVG';
import styles from './BackLink.module.scss';

type Props = {
  to?: string;
  onClick?: () => void;
  label?: string;
};

export const BackLink: React.FC<Props> = ({ to, onClick, label = 'Back' }) => {
  const content = (
    <>
      <ChevronIcon direction="right" />
      {label}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={styles.backLink}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.backLink} onClick={onClick}>
      {content}
    </button>
  );
};
