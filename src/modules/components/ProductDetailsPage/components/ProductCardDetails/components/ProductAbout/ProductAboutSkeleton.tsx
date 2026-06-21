/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductAbout.module.scss';
//#endregion

//#region STYLES
const {
  aboutContainer,
  aboutTitle,
  aboutSection,
  aboutSubTitle,
  aboutParagraph,
} = styles;
//#endregion

export const ProductAboutSkeleton = () => {
  //#region RENDER
  return (
    <div className={aboutContainer}>
      <h3 className={aboutTitle}>
        <Skeleton width={75} height={'100%'} />
      </h3>

      {Array.from({ length: 3 }).map((_, index) => {
        const subTitleWidths = [320, 350, 300];

        return (
          <div className={aboutSection} key={index}>
            <h4 className={aboutSubTitle}>
              <Skeleton width={subTitleWidths[index]} height={'100%'} />
            </h4>

            <div className={aboutParagraph}>
              <Skeleton width="100%" height={16} />
              <Skeleton width={index === 1 ? '65%' : '80%'} height={16} />
            </div>

            <div className={aboutParagraph}>
              <Skeleton width="100%" height={16} />
              <Skeleton width={index === 0 ? '45%' : '70%'} height={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
  //#endregion
};
