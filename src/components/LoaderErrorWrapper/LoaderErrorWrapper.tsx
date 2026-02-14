import React from 'react';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error';
import styles from './LoaderErrorWrapper.module.scss';
import { LoadingStatus } from '../../types/LoadingStatus';

type Props = {
  children: React.ReactNode;
  loading: LoadingStatus;
  error: string | null;
  reload: () => void;
};

export const LoaderErrorWrapper: React.FC<Props> = ({
  children,
  error,
  loading,
  reload,
}) => {
  if (loading === 'pending') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapper__container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div
          className={`${styles.wrapper__container} ${styles['wrapper__container--error']}`}
        >
          <Error error={error} reload={reload} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
