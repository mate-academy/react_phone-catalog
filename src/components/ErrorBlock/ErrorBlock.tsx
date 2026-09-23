import styles from './ErrorBlock.module.scss';

type Props = {
  title?: string;
  buttonText?: string;
  onRetry?: () => void;
};

export const ErrorBlock = ({
  title = 'Something went wrong',
  buttonText = 'Reload',
  onRetry,
}: Props) => (
  <div className={styles.error}>
    <p className={styles.title}>{title}</p>

    {onRetry && (
      <button type="button" className={styles.button} onClick={onRetry}>
        {buttonText}
      </button>
    )}
  </div>
);
