import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import styles from './ToBack.module.scss';

export const ToBack = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <button
      className={styles['to-back']}
      onClick={() => navigate(`/${category}`)}
    >
      <IoIosArrowBack className={styles['to-back__arrow']} />
      <p className={styles['to-back__description']}>Back</p>
    </button>
  );
};
