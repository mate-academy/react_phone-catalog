import React, { memo, useEffect, useState } from 'react';
import { SortQuery } from '../../api/products/server/types';
import ProductsCarouselWithSortedProducts from '../../components/common/ProductsCarousel/ProductsCarouselWithSortedProducts';
import BannersSlider from '../../components/common/BannersSlider';

import './HomePage.scss';
import { useRequest } from '../../enhancers/hooks/request';
import { getBanners } from '../../api/products/client/banners';
import CategoriesGallery from '../../components/common/CategoriesGallery';
import ErrorMessage from '../../components/common/ErrorMessage';

export const HomePage: React.FC = memo(() => {
  const [banners, bannersLoading, bannersError] = useRequest(getBanners, [], []);
  const [someError, setSomeError] = useState('');

  useEffect(() => {
    setSomeError(bannersError);
  }, [bannersError]);

  if (someError) {
    return <ErrorMessage message={someError} />
  }

  return (
    <div className='home-page'>
      <BannersSlider
        banners={banners}
        loading={bannersLoading}
      />

      <ProductsCarouselWithSortedProducts
        name='Hot prices'
        sortQuery={SortQuery.Cheapest}
        setError={setSomeError}
      />

      <CategoriesGallery setError={setSomeError}/>

      <ProductsCarouselWithSortedProducts
        name='Brand new models'
        sortQuery={SortQuery.Newest}
        setError={setSomeError}
      />
    </div>
  );
});
