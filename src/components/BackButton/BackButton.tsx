import { useNavigate } from 'react-router-dom';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.backButton}>
      <span className={styles.breadcrumbs__separator}>/</span>
      <a
        href="#"
        onClick={handleBackClick}
        aria-label="Go back"
        className={styles.backButton__link}
      >
        <span className={styles.breadcrumbs__icon}>
          <img src={strokeLeft} alt="Stroke left" />
        </span>
        <span className={styles.breadcrumbs__text}>Back</span>
      </a>
    </div>
  );
};
