import { useNavigate } from 'react-router-dom';
import styles from './ErrorMessage.module.scss';

type Props = {};

const ErrorMessage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const reloadPage = () => {
    navigate(0);
  };

  return (
    <div className={styles.errorMessage}>
      <h2 className={styles.title}>Something go wrong...</h2>
      <button className={styles.errorMessage__reload} onClick={reloadPage}>
        Reload Page
      </button>
    </div>
  );
};

export default ErrorMessage;
