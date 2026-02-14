/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { ErrorQueries } from '../../enums/ErrorsQueries';
import { LoadingError } from './components/LoadingError';
import { PageNotFound } from './components/PageNotFound';
import styles from './Error.module.scss';

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
