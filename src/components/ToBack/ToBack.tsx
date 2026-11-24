import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import { isCategory } from '../../utils/isCategory';

import styles from './ToBack.module.scss';

export const ToBack = () => {
  const { category } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (category && isCategory(category)) {
      navigate(state?.from ?? `/${category}`);

      return;
    }

    navigate(-1);
  };

  return (
    <button
      className={styles['to-back']}
      onClick={handleBack}
    >
      <IoIosArrowBack className={styles['to-back__arrow']} />
      <p className={styles['to-back__description']}>Back</p>
    </button>
  );
};
