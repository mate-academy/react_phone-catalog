import { useNavigate, Link } from 'react-router-dom';
import styles from './BackLink.module.scss';
import ArrowLeft from '../../../images/icons/Arrow Left.png';

export const BackLink = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate(-1);
  };

  return (
    <Link to={''} className={styles['back-link']} onClick={clickHandle}>
      <img src={ArrowLeft} />
      <p className={styles['back-link__text']}>Back</p>
    </Link>
  );
};
