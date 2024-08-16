import { Link } from 'react-router-dom';
import { ArrowIcon } from '../Icons/ArrowIcon';
import styles from './BackBtn.module.scss';

export const BackBtn = () => (
  <Link className={styles.backBtn} to="..">
    <ArrowIcon />
    <p className="text-small">Back</p>
  </Link>
);
