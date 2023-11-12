import { useNavigate } from 'react-router-dom';
import styles from './GoToBack.module.scss';
import arrowLeft from '../../img/icons/ArrowLeft.svg';

export const GoToBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.wrapper}
      onClick={() => navigate(-1)}
      type="button"
      data-cy="backButton"
    >
      <img src={arrowLeft} alt="arrowLeft" />
      <p className="smallText">
        Back
      </p>
    </button>
  );
};
