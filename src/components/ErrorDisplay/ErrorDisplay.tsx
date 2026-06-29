import { handleReloadPage } from '../../utils/handleReloadPage';
import styles from './ErrorDisplay.module.scss';

type Props = {
  errorMessage: string;
  buttonText: string;
};

export const ErrorDisplay: React.FC<Props> = ({ errorMessage, buttonText }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.message}>{errorMessage}</p>

      <button className={styles.reloadButton} onClick={handleReloadPage}>
        {buttonText}
      </button>
    </div>
  );
};
