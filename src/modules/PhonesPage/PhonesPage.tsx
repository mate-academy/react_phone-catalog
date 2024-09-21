import { FC } from 'react';
import styles from './PhonesPage.module.scss';
import { SkeletonCard } from '../../components/SkeletonCard/SkeletonCard';

export const PhonesPage: FC = () => {
  return (
    <div className={styles.red}>
      <SkeletonCard />
    </div>
  );
};
