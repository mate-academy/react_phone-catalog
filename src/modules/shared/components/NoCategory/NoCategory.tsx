import { useParams } from 'react-router-dom';
import styles from './NoCategory.module.scss';

export const NoCategory = () => {
  const { category } = useParams();

  return <div className={styles.status}>There are no {category} yet</div>;
};
