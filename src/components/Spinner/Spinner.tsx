import React from 'react';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import styles from './Spinner.module.scss';

export const Spinner: React.FC = () => {
  const { spinnerUrl } = useIconSrc();

  return <img src={spinnerUrl} alt="" className={styles.skeletonSpinner} />;
};
