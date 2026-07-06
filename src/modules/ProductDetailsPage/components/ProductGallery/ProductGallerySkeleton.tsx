//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './ProductGallerySkeleton.module.scss';
//#endregion

export const ProductGallerySkeleton = () => (
  <div className={baseStyles.productGallery}>
    <ul className={baseStyles.allImages}>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <SkeletonItem additionalClass={baseStyles.smallImg} />
        </li>
      ))}
    </ul>

    <div className={baseStyles.imgWrapper}>
      <SkeletonItem additionalClass={styles.selectedImage} />
    </div>
  </div>
);
