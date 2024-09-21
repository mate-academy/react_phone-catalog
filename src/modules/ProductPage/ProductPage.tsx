import { FC } from 'react';
import styles from './ProductPage.module.scss';
import { SkeletonCard } from '../../components/SkeletonCard/SkeletonCard';

export const ProductPage: FC = () => {
  return (
    <div className={styles.red}>
      <SkeletonCard />
    </div>
  );
};
