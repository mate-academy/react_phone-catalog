import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { CATEGORY_LABELS } from '../../utils/constants';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category?: Category;
  current?: string;
};

export const Breadcrumbs = ({ category, current }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">Home</Link>

      {category && (
        <>
          <span>/</span>
          <Link to={`/${category}`}>{CATEGORY_LABELS[category]}</Link>
        </>
      )}

      {current && (
        <>
          <span>/</span>
          <span>{current}</span>
        </>
      )}
    </div>
  );
};
