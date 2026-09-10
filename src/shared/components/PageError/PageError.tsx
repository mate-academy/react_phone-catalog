import { Button } from '@/shared/components/Button';
import styles from './PageError.module.scss';

interface Props {
  reloadFunction: () => void;
}

export const PageError = ({ reloadFunction }: Props) => {
  return (
    <div className={styles.pageError}>
      <h2 className={styles.errorMessage}>Something went wrong</h2>
      <Button
        text="Reload"
        onClick={reloadFunction}
        className={styles.reloadButton}
      />
    </div>
  );
};
