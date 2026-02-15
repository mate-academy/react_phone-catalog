import { useNavigate } from 'react-router-dom';
import arrow from '/img/arrow-black.svg';
import styles from './BackButton.module.scss';

type Props = {
  mode: 'Back' | 'Home';
};

export const BackButton: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    switch (mode) {
      case 'Back':
        navigate(-1);
        break;
      case 'Home':
        navigate('/');
        break;

      default:
        break;
    }
  };

  return (
    <button className={styles.button_box} onClick={handleNavigateBack}>
      <img src={arrow} className={styles.icon} alt="cart icon"></img>

      <p className={styles.button_text}>{mode}</p>
    </button>
  );
};
