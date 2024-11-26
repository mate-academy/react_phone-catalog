import { Link } from 'react-router-dom';
import arrowLeft from '../../images/icons/arrow_left.svg';
import styles from './BackLink.module.scss';

export const BackLink = () => {
  return (
    <div className={styles.back}>
      <div className={styles.back__arrow}>
        <img src={arrowLeft} alt="arrow" className={styles.back__img} />
      </div>

      <Link to=".." className={styles.back__link}>
        Back
      </Link>
    </div>
  );
};
