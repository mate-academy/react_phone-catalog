import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.scss';

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.backBtn}
    >
      <img
        className={styles['breadcrumbs-arrow']}
        src="img/icons/ChevronArrowLeft.svg"
        alt="icon"
      />
      Back
    </button>
  );
};
