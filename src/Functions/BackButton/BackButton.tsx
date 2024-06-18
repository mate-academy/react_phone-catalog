import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <span>{`<`}</span>
      <button
        onClick={handleBackClick}
        className={styles.backButton}
      >{`Back`}</button>
    </div>
  );
};
