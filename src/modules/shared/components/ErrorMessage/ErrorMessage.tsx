import { FC } from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  onRetry: () => void;
};

export const ErrorMessage: FC<Props> = ({ onRetry }) => {
  return (
    <div className={styles.errorMessage}>
      <h2 className={styles.errorMessage__title}>Something went wrong</h2>

      <button
        type="button"
        className={styles.errorMessage__button}
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
};
