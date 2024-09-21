import { FC } from 'react';
// eslint-disable-next-line
import { SkeletonProductList } from '../../components/SkeletonProductList/SkeletonProductList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
  return (
    <div className={styles.container}>
      <SkeletonProductList isLoading={true} />
    </div>
  );
};
