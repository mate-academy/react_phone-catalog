import { BannerSlider } from '@components/BannerSlider';
import { BannerSliderItems } from '@data/bannerSliderData';
import { HotPrice } from '@components/HotPrice';
import { Categories } from '@components/Categories';
import { BrandNew } from '@components/BrandNew';

import styles from './HomePage.module.scss';
import cn from 'classnames';

export const HomePage = () => {
  return (
    <>
      <h1 className="sr-only">Product Catalog</h1>
      <h1 className={cn(styles.title, 'main-title')}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={styles.home__page}>
        <BannerSlider data={BannerSliderItems} />

        <BrandNew />

        <Categories />

        <HotPrice />
      </div>
    </>
  );
};
