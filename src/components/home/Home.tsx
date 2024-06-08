import React, { useContext } from 'react';
import styles from './Home.module.scss';
import { SectionDashSlider } from './sectionDashSlider';
import { Slider } from './slider';
import { ShopByCategory } from './shopByCategory/shopByCategory';
import { SkeletonMain } from '../../skeletons/SkeletonMain';
import { ContextApp } from '../../appContext/AppContext';

export const Home: React.FC = () => {
  const { isLoadingPoducts } = useContext(ContextApp);
  return (
    <div className={styles['home']}>
      {isLoadingPoducts && <SkeletonMain />}

      {!isLoadingPoducts && (
        <>
          <SectionDashSlider />
          <Slider title={'Brand new models'} />
          <ShopByCategory />
          <Slider title={'Hot prices'} discount={true} />
        </>
      )}
    </div>
  );
};
