import { useNavigate } from 'react-router-dom';
import styles from './BtnBack.module.scss';

export const BtnBack = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className={styles.btnBack}
      >
        <img src="./img/icons/arrowLeftBtn.svg" />
        <p>Back</p>
      </button>
    </>
  );
};
