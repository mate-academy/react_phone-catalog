/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductCard.module.scss';
//#endregion

//#region STYLES
const {
  productCard,
  cardLink,
  cardImageBlock,
  cardTitle,
  cardPriceBlock,
  priceCurrent,
  cardDivider,
  cardSpecs,
  specItem,
  specTitle,
  specValue,
  cardActions,
  actionCart,
  actionFavourite,
} = styles;
//#endregion

export const ProductCardSkeleton = () => {
  //#region RENDER
  return (
    <div className={productCard}>
      <div className={cardLink}>
        <div className={cardImageBlock}>
          <Skeleton
            height="100%"
            width="80%"
            containerClassName={cardImageBlock}
          />
        </div>

        <h3 className={cardTitle} style={{ marginTop: '24px' }}>
          <Skeleton count={2} height={16} width="100%" />
        </h3>
      </div>

      <div className={cardPriceBlock}>
        <span className={priceCurrent}>
          <Skeleton height={28} width={75} />
        </span>
      </div>

      <div className={cardDivider} />

      <div className={cardSpecs}>
        <div className={specItem}>
          <span className={specTitle}>
            <Skeleton width={50} />
          </span>
          <span className={specValue}>
            <Skeleton width={45} />
          </span>
        </div>

        <div className={specItem}>
          <span className={specTitle}>
            <Skeleton width={65} />
          </span>
          <span className={specValue}>
            <Skeleton width={55} />
          </span>
        </div>

        <div className={specItem}>
          <span className={specTitle}>
            <Skeleton width={30} />
          </span>
          <span className={specValue}>
            <Skeleton width={35} />
          </span>
        </div>
      </div>

      <div className={cardActions}>
        <Skeleton
          height={40}
          containerClassName={actionCart}
          style={{ borderRadius: '20px' }}
        />

        <Skeleton
          height={40}
          width={40}
          containerClassName={actionFavourite}
          style={{ borderRadius: '50%' }}
        />
      </div>
    </div>
  );
  //#endregion
};
