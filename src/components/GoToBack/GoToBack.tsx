/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import styles from './GoToBack.module.scss';
import arrowLeft from '../../img/icons/ArrowLeft.svg';

export const GoToBack = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img src={arrowLeft} alt="arrowLeft" />
      <p
        className="smallText"
        onClick={() => navigate('../')}
      >
        Back
      </p>
    </div>
  );
};
