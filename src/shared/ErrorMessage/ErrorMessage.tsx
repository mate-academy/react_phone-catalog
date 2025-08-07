import { useNavigate } from 'react-router-dom';
import styles from './ErrorMessage.module.scss';

export const ErrorMessage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>The page is not responding</h1>
      <button
        className={styles.button}
        onClick={() => {
          navigate('/');
        }}
      >
        Try again
      </button>
    </div>
  );
};
