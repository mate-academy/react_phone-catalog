/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import notFoundImg from '../../assets/img/ui/page-not-found.png';
import { GoBack } from '../../shared/components/ui/GoBack';

import styles from './NotFoundPage.module.scss';

type Props = {
  imageSrc?: string;
  message?: string;
};

export const NotFoundPage: React.FC<Props> = ({
  message = 'Page not found',
  imageSrc = notFoundImg,
}) => {
  return (
    <div className={styles.notFoundPage}>
      <GoBack message="Back to home" path="/" />

      <h1 className={styles.notFoundMessage}>{message}</h1>
      <img alt="Page not found" className={styles.notFoundImg} src={imageSrc} />
    </div>
  );
};
