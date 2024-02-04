import React, { memo } from 'react';
import { SortQuery } from '../../api/products/server/types';
import ProductsCarouselWithSortedProducts from '../../components/common/ProductsCarousel/ProductsCarouselWithSortedProducts';
import PromotionsSlider from '../../components/common/PromotionsSlider';

import './HomePage.scss';
import { useRequest } from '../../enhancers/hooks/request';
import { getPromotions } from '../../api/products/client/promotions';

export const HomePage: React.FC = memo(() => {
  const [promotions, promotionsLoading] = useRequest(getPromotions, [], []);

  return (
    <div className='home-page'>
      <PromotionsSlider
        promotions={promotions}
        loading={promotionsLoading}
      />

      <ProductsCarouselWithSortedProducts
        name='Hot prices'
        sortQuery={SortQuery.Cheapest}
      />

      <ProductsCarouselWithSortedProducts
        name='Brand new models'
        sortQuery={SortQuery.Newest}
      />
    </div>
  );
});
