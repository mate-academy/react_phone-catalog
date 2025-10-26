import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useState } from 'react';

export const BackButton = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={goBack}
      className={styles.arrowLeft}
    >
      <img
        src={
          hover
            ? '/img/SliderImg/Arrow Left hover.svg'
            : '/img/SliderImg/Arrow Left.svg'
        }
        alt="ArrowLeft"
      />
      Back
    </button>
  );
};
