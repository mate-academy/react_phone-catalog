// .. Error.tsx
import styles from './ErrorItem.module.scss';

interface ErrorItemProps {
  message?: string;
}

export const ErrorItem = ({ message }: ErrorItemProps) => {
  return (
    <div className={styles.error}>
      <div className="error__container">
        <p>{message}</p>
      </div>
    </div>
  );
};
