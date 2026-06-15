/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductActions.module.scss';
//#endregion

//#region STYLES
const {
  actionsContainer,

  colorsBlock,
  colorsTitle,
  colorsList,
  colorBtn,

  capacityBlock,
  capacityTitle,
  capacityList,

  priceBlock,
  priceCurrent,
  priceDiscount,

  buttonsBlock,
  buttonCart,
  buttonFavourite,

  shortSpecsBlock,
  specBlock,
  specTitle,
  specValue,
} = styles;
//#endregion

export const ProductActionsSkeleton = () => {
  //#region RENDER
  return (
    <div className={actionsContainer}>
      <div className={colorsBlock}>
        <p className={colorsTitle}>
          <Skeleton width={125} height={'100%'} />
        </p>
        <div className={colorsList}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              width={'100%'}
              height={'100%'}
              style={{ borderRadius: '50%', top: '-1.5px' }}
              containerClassName={colorBtn}
            />
          ))}
        </div>
      </div>

      <div className={capacityBlock}>
        <p className={capacityTitle}>
          <Skeleton width={115} height={'100%'} />
        </p>

        <div className={capacityList}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              width={60}
              height={32}
              style={{ alignItems: 'center' }}
            />
          ))}
        </div>
      </div>

      <div className={priceBlock}>
        <span className={priceCurrent}>
          <Skeleton width={72} height={41} />
        </span>
        <span className={priceDiscount}>
          <Skeleton width={52} height={28} />
        </span>
      </div>

      <div className={buttonsBlock}>
        <Skeleton
          width={'100%'}
          height={48}
          style={{ borderRadius: '24px' }}
          containerClassName={buttonCart}
        />
        <Skeleton
          width={48}
          height={48}
          style={{ borderRadius: '50%' }}
          containerClassName={buttonFavourite}
        />
      </div>

      <div className={shortSpecsBlock}>
        {Array.from({ length: 4 }).map((_, index) => {
          const titleWidths = [41, 64, 60, 28]; // Для Screen, Capacity, RAM, Camera
          const valueWidths = [165, 55, 100, 25];

          return (
            <div key={index} className={specBlock}>
              <p className={specTitle}>
                <Skeleton width={titleWidths[index]} height={15} />
              </p>
              <p className={specValue}>
                <Skeleton width={valueWidths[index]} height={15} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
  //#endregion
};
