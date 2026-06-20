/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductTechSpecs.module.scss';
//#endregion

//#region STYLES
const {
  specsContainer,
  specsTitle,
  specsList,
  specsItem,
  specsLabel,
  specsValue,
} = styles;
//#endregion

export const ProductTechSpecsSkeleton = () => {
  //#region RENDER
  return (
    <div className={specsContainer}>
      <h3 className={specsTitle}>
        <Skeleton width={105} height={'100%'} />
      </h3>

      <div className={specsList}>
        {Array.from({ length: 8 }).map((_, index) => {
          const labelWidths = [50, 75, 70, 30, 110, 60, 40, 30];
          const valueWidths = [65, 65, 115, 30, 40, 190, 75, 110];

          return (
            <div key={index} className={specsItem}>
              <p className={specsLabel}>
                <Skeleton width={labelWidths[index]} height={21} />
              </p>
              <p className={specsValue}>
                <Skeleton width={valueWidths[index]} height={21} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
  //#endregion
};
