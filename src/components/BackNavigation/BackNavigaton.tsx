import { useNavigate } from 'react-router-dom';
import styles from './BackNavigation.module.scss';
import arrowBack from './img/buttons/arrow.svg';

interface Props {
  to?: string;
}

export const BackNavigation = ({ to }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={styles.backBlock}
    >
      <img className={styles.arrow} src={arrowBack} alt="arrow back" />
      Back
    </button>
  );
};
