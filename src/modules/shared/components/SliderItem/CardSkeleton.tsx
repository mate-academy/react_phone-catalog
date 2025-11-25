import styles from '../../../../modules/HomePage/components/SliderComponent.module.scss';
import classNames from 'classnames'; // Якщо є, або використовуйте шаблоні рядки

export const CardSkeleton = () => {
  return (
    <div
      className={classNames(
        styles.SliderComponent__item,
        styles.SliderComponent__skeleton,
      )}
    >
      {/* Image Skeleton */}
      <div className={styles.SliderComponent__item__imageContainer}></div>

      <div className={styles.SliderComponent__item__infoContainer}>
        {/* Name Skeleton */}
        <span className={styles.SliderComponent__item__itemName}>
          Loading Product Name
        </span>

        {/* Price Skeleton */}
        <div className={styles.SliderComponent__item__priceContainer}>
          <div className={styles.SliderComponent__item__fullPrice}>$000</div>
        </div>

        <div className={styles.SliderComponent__item__divider}></div>

        {/* Specs Skeleton */}
        <div className={styles.SliderComponent__item__specContainer}>
          {[1, 2, 3].map(i => (
            <div key={i}>
              <span className={styles.SliderComponent__item__infoName}>
                Spec
              </span>
              <span className={styles.SliderComponent__item__infoValue}>
                Value
              </span>
            </div>
          ))}
        </div>

        {/* Buttons Skeleton */}
        <div className={styles.SliderComponent__item__buttonContainer}>
          <button className={styles.SliderComponent__item__cartButton}>
            Add
          </button>
          <button
            className={styles.SliderComponent__item__favoriteButton}
          ></button>
        </div>
      </div>
    </div>
  );
};
