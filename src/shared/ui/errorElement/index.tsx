import styles from './errorElement.module.scss';
export const ErrorElement = ({
  message,
  className,
}: {
  message: string;
  className: string;
}) => {
  return (
    <div className={className}>
      <span className={styles.error}>{message}</span>
    </div>
  );
};
