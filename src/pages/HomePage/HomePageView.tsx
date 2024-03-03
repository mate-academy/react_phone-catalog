import { memo } from 'react';
import { HomePageViewProps } from './types';
import { Slider } from '../../components/Slider';
import { ProductSlider } from '../../components/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCaregory';

import './HomePage.scss';

export const HomePageView = memo<HomePageViewProps>(({
  hotPricesProducts,
  phonesCount,
  tabletsCount,
  accessoriesCount,
  newestProducts,
}) => (
  <div className="home-page">
    <Slider />
    <section className="home-page__section">
      <ProductSlider title="Hot Prices" products={hotPricesProducts || []} />
    </section>
    <section className="home-page__section">
      <ShopByCategory
        phonesCount={phonesCount}
        tabletsCount={tabletsCount}
        accessoriesCount={accessoriesCount}
      />
    </section>
    <section className="home-page__section">
      <ProductSlider
        title="Brand new models"
        products={newestProducts}
      />
    </section>

  </div>
));
