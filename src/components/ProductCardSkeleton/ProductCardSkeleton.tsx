import productCardStyles from '../ProductCard/ProductCard.module.scss';
import classNames from 'classnames';
import skeletonStyles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={productCardStyles.productCard}>
      <div
        className={classNames(
          productCardStyles.productImage,
          skeletonStyles.skeleton,
          skeletonStyles.skeletonImage,
        )}
      />

      <div
        className={classNames(
          productCardStyles.title,
          skeletonStyles.skeleton,
          skeletonStyles.skeletonTitle,
        )}
      />

      <div className={productCardStyles.prices}>
        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.skeletonPrice,
          )}
        />
        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.skeletonPrice,
            skeletonStyles.small,
          )}
        />
      </div>

      <div className={productCardStyles.horizontalLine} />

      <div className={productCardStyles.details}>
        {[1, 2, 3].map(i => (
          <div key={i} className={productCardStyles.detailsInfo}>
            <div
              className={classNames(
                skeletonStyles.skeleton,
                skeletonStyles.skeletonDetailTitle,
              )}
            />
            <div
              className={classNames(
                skeletonStyles.skeleton,
                skeletonStyles.skeletonDetailText,
              )}
            />
          </div>
        ))}
      </div>

      <div className={productCardStyles.buttons}>
        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.skeletonButton,
          )}
        />
        <div
          className={classNames(
            skeletonStyles.skeleton,
            skeletonStyles.skeletonButton,
          )}
        />
      </div>
    </div>
  );
};
