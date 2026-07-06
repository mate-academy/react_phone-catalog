//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { categories } from '../../../shared/constants/categories';
import baseStyles from './base.module.scss';
import styles from './CategoriesSkeleton.module.scss';
//#endregion

export const CategoriesSkeleton = () => (
  <div className={baseStyles.categories}>
    <SkeletonItem additionalClass={styles.title} />

    <ul className={baseStyles.categoriesList}>
      {Array.from({ length: categories.length }).map((_, i) => (
        <li key={i} className={baseStyles.category}>
          <SkeletonItem additionalClass={baseStyles.categoryImg} />

          <SkeletonItem additionalClass={styles.categoryName} />

          <SkeletonItem additionalClass={styles.modelsAmount} />
        </li>
      ))}
    </ul>
  </div>
);
