import { Link } from 'react-router-dom';
import { CategoryUI } from '../../../shared/types/CategoryUI';

import styles from './CategoryCard.module.scss';
import classNames from 'classnames';
import { FC } from 'react';
import { Skeleton } from '@/modules/shared/components/Skeleton/Skeleton';

interface Props {
  category: CategoryUI;
  isLoading?: boolean;
}

export const CategoryCard: FC<Props> = ({ category, isLoading = false }) => {
  const { title, path, preview, type, count } = category;

  return (
    <Link to={path} className={styles.category}>
      <div
        className={classNames(
          styles.categoryPreview,
          styles[`category-${type}-preview`],
        )}
      >
        <img src={preview} alt={title} />
      </div>
      <div>
        <h4 className={styles.categoryTitle}>{title}</h4>
        {!isLoading ? (
          <p className={styles.categoryCount}>{count} models</p>
        ) : (
          <Skeleton width="25%" height="20px" />
        )}
      </div>
    </Link>
  );
};
