import React from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  message: string;
  setIsError: (isError: boolean) => void;
};
const ErrorMessage: React.FC<Props> = ({ message, setIsError }) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__message}>{message}</h2>
      <button
        onClick={() => setIsError(false)}
        className={styles.error__button}
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorMessage;
