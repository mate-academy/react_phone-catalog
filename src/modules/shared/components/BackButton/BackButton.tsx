import { useNavigate } from 'react-router-dom';
import { IconChevronLeft } from '../Icons';
import styles from './BackButton.module.scss';

export function BackButton(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label="Go back"
    >
      <IconChevronLeft className={styles.icon} />
      <span className={styles.text}>Back</span>
    </button>
  );
}
