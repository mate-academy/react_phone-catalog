import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import { Skeleton } from '@/shared/components/Skeleton';
import { toRem } from '@/shared/utils/toRem';

interface Props {
  linkURL: string;
  imgURL: string;
  title: string;
  modelsCount: number;
  isLoading?: boolean;
}

export const CategoryCard = ({
  linkURL,
  imgURL,
  title,
  modelsCount,
  isLoading = false,
}: Props) => {
  return (
    <Link to={linkURL} className={styles.categoryCard}>
      <img
        src={imgURL}
        alt={`${title} category `}
        className={styles.categoryImg}
      />

      <div className={styles.descr}>
        <h4 className={styles.title}>{title}</h4>

        {isLoading ? (
          <Skeleton width={toRem(80)} height={toRem(21)} />
        ) : (
          <p className={styles.modelsCount}>{modelsCount} models</p>
        )}
      </div>
    </Link>
  );
};
