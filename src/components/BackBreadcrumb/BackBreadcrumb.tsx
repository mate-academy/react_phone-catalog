import { useNavigate } from 'react-router-dom';
import styles from './BackBreadcrumb.module.scss';
import Arrow from '../Icons/Arrow/Arrow';
import { ArrowDirection } from '../../types/arrowDirection';

export const BackBreadcrumb = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.BackBreadcrumb} onClick={handleClick}>
      <Arrow
        className={styles.BackBreadcrumb__arrow}
        direction={ArrowDirection.left}
      />

      <p className={styles.BackBreadcrumb__name}>Back</p>
    </div>
  );
};
