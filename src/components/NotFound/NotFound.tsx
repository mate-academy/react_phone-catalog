import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <h1 className={styles.text}>Page not found</h1>
        <button className={styles.backbutton} onClick={() => navigate(-1)}>
          <img
            src="./img/icons/arrowLeft.svg"
            alt="Back"
            className={styles.arrowimg}
          />
          Back
        </button>
      </div>
    </main>
  );
};
