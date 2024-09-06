import { FC } from 'react';

import styles from './errorMessage.module.scss';

export const ErrorMessage: FC = () => {
  return (
    <div className={styles.error}>
      Unfortunately, there aren’t that many products available.
    </div>
  );
};
