import { useNavigate } from 'react-router-dom';
import styles from './HistoryBackButton.module.scss';
import IconButtonLeft from '../../components/IconButtonLeft/index';
import buttonStyles from '../../components/Button/Button.module.scss';
import Button from '../../components/Button';

export const HistoryBackButton: React.FC = ({}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      className={`${buttonStyles.button} ${styles.button} ${buttonStyles['button--history-back']}`}
      type="button"
      aria-label="Back"
    >
      <IconButtonLeft
        className={`${styles.icon} ${styles['icon--button-left']}`}
        handleClick={handleBack}
      />
      Back
    </Button>
  );
};
