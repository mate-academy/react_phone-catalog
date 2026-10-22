import { useNavigate } from 'react-router-dom';
import { asset } from '../../../../helper';
import styles from './ButtonBack.module.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles['back-link']}
      onClick={() => navigate(-1)}
    >
      <img src={asset('img/arrow-primary.svg')} alt="Back" />
      <span>Back</span>
    </button>
  );
};
