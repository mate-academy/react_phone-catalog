import React, { memo } from 'react';
// import { SortQuery } from '../../api/products/server/types';
// import ProductsCarouselWithSortedProducts from '../../components/common/ProductsCarousel/ProductsCarouselWithSortedProducts';
import BannersSlider from '../../components/common/BannersSlider';

import './HomePage.scss';
import { useRequest } from '../../enhancers/hooks/request';
import { getBanners } from '../../api/products/client/banners';
// import CategoriesGallery from '../../components/common/CategoriesGallery';

export const HomePage: React.FC = memo(() => {
  const [banners, bannersLoading] = useRequest(getBanners, [], []);

  console.log(banners, bannersLoading);

  return (
    <div className='home-page'>
      <BannersSlider
        banners={banners}
        loading={bannersLoading}
      />

      {/* <ProductsCarouselWithSortedProducts
        name='Hot prices'
        sortQuery={SortQuery.Cheapest}
      />

      <CategoriesGallery />

      <ProductsCarouselWithSortedProducts
        name='Brand new models'
        sortQuery={SortQuery.Newest}
      /> */}
    </div>
  );
});
