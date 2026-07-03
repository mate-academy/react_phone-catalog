//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { TechSpecsSkeleton } from '../TechSpecsList';
import baseStyles from './base.module.scss';
import styles from './TechSpecsBlockSkeleton.module.scss';
//#endregion

export const TechSpecsBlockSkeleton = () => (
  <div className={baseStyles.techSpecs}>
    <SkeletonItem additionalClass={`${baseStyles.title} ${styles.title}`} />

    <TechSpecsSkeleton />
  </div>
);
