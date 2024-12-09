import { Link, useNavigate } from 'react-router-dom';
import arrowLeft from '../../images/icons/arrow_left.svg';
import styles from './BackLink.module.scss';

export const BackLink = () => {
  const navigate = useNavigate();

  const handleBack = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.back}>
      <div className={styles.back__arrow}>
        <img src={arrowLeft} alt="arrow" className={styles.back__img} />
      </div>

      <Link to={''} className={styles.back__link} onClick={handleBack}>
        Back
      </Link>
    </div>
  );
};
