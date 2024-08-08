import React, { useContext } from 'react';
import Styles from './Home.module.scss';
import { SectionDashSlider } from './sectionDashSlider';
import { ShopByCategory } from './shopByCategory/shopByCategory';
import { SkeletonMain } from '../../skeletons/SkeletonMain';
import { ContextApp } from '../../appContext/AppContext';
import { ItemSlider } from '../itemSlider';

export const Home: React.FC = () => {
  const { isLoadingPoducts } = useContext(ContextApp);
  const { tablets, phones, accessories } = useContext(ContextApp);

  return (
    <div className={Styles.home}>
      {isLoadingPoducts && <SkeletonMain />}

      {!isLoadingPoducts && (
        <>
          <SectionDashSlider />
          <ItemSlider
            list={[...tablets, ...phones, ...accessories]}
            title={'Brand new models'}
          />
          <ShopByCategory />
          <ItemSlider
            list={[...tablets, ...phones, ...accessories]}
            title={'Hot prices'}
            discount={true}
          />
        </>
      )}
    </div>
  );
};
