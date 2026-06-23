import { useNavigate } from 'react-router-dom';
import styles from './Back.module.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.back}>
      <img
        className={styles.back_arrow}
        src="img/Buttons/Icons/white left.svg"
        alt="arrow left"
      />
      <span
        className={styles.back_link}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </span>
    </div>
  );
};
