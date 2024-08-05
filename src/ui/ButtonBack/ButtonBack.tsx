import { Link, useLocation } from 'react-router-dom';
import { IconLeft } from '../IconLeft';
import styles from './ButtonBack.module.scss';

export const ButtonBack = () => {
  const { state } = useLocation();

  return (
    <Link className={styles.LinkBack} to={state?.prevPath || '/'}>
      <IconLeft fill="#F1F2F9" />

      <p className={styles.Text}>Back</p>
    </Link>
  );
};
