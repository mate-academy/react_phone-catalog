import { FC } from 'react';

import ErrorImage from '/img/error/page-not-found.png';

import styles from './errorsPage.module.scss';

export const NotFound: FC = () => (
  <div className={styles.image}>
    <img src={ErrorImage} alt="Page not found" />
  </div>
);
