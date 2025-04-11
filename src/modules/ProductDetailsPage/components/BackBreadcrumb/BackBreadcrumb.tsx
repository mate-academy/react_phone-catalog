import { useNavigate } from 'react-router-dom';
import Arrow from '../../../../components/Icons/Arrow/Arrow';
import { ArrowDirection } from '../../../../types/arrowDirection';
import styles from './BackBreadcrumb.module.scss';

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
