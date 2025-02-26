/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './Error.module.scss';
import { ErrorQueries } from '../../enums/ErrorsQueries';
import { PageNotFound } from './components/PageNotFound';
import { LoadingError } from './components/LoadingError';

interface Props {
  query: ErrorQueries;
}

export const Error: React.FC<Props> = ({ query }) => {
  const getImg = () => {
    if (query === ErrorQueries.loading) {
      return <LoadingError />;
    }

    return <PageNotFound />;
  };

  return <div className={styles.background}>{getImg()}</div>;
};
