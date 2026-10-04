import styles from './ProductsSkeleton.module.scss';
import grid from '@/shared/styles/GridLayout.module.scss';

export const ProductsSkeleton = () => {
  return (
    <div className={grid.grid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className={`${styles.card} skeleton`} key={index} />
      ))}
    </div>
  );
};
