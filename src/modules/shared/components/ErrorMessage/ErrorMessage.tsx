import classNames from 'classnames';
import styles from './ErrorMessage.module.scss';

interface Props {
  onReload: () => void;
  className?: string;
}

export const ErrorMessage = ({ onReload, className }: Props) => (
  <div className={classNames(styles.error, className)}>
    <p>Something went wrong</p>

    <button type="button" className={styles.reload} onClick={onReload}>
      Reload
    </button>
  </div>
);
