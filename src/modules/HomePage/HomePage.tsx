import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroTitle } from '../../components/HeroTitle';
import { Slider } from '../../components/Slider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { CategoryPreview } from '../../components/CategoryPreview';
import { brandNewProducts, hotPricesProducts } from '../../data/products';

import styles from './HomePage.module.scss';

import img1 from '../../assets/images/Banner.svg';
import img2 from '../../assets/images/banner2.jpg';
import img3 from '../../assets/images/banner3.webp';
import img1Mobile from '../../assets/images/Banner1-mobi.svg';

export const HomePage = () => {
  const { t } = useTranslation();

  const [currentBanner, setCurrentBanner] = useState(img1);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 639px)');

    const updateBanner = () => {
      const isMobile = mobileQuery.matches;

      setCurrentBanner(isMobile ? img1Mobile : img1);

      if (isMobile) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 1199) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateBanner();
    mobileQuery.addEventListener('change', updateBanner);
    window.addEventListener('resize', updateBanner);

    return () => {
      mobileQuery.removeEventListener('change', updateBanner);
      window.removeEventListener('resize', updateBanner);
    };
  }, []);

  const images = [currentBanner, img2, img3];

  return (
    <div className={styles.homePage}>
      <HeroTitle
        title={t('home.heroTitle')}
        subtitle={t('home.heroSubtitle')}
      />

      <Slider images={images} autoPlay autoPlayDelay={4000} />

      <ProductsSlider
        title={t('home.brandNewModels')}
        products={brandNewProducts.map((p, index) => ({
          ...p,
          id: `brand-${index}`,
          originalId: p.id,
        }))}
        visibleCount={visibleCount}
      />

      <CategoryPreview
        phonesTitle={t('home.categories.phones')}
        tabletsTitle={t('home.categories.tablets')}
        accessoriesTitle={t('home.categories.accessories')}
      />
      <ProductsSlider
        title={t('home.hotPrices')}
        products={hotPricesProducts.map((p, index) => ({
          ...p,
          id: `hot-${index}`,
          originalId: p.originalId,
        }))}
        visibleCount={visibleCount}
      />
    </div>
  );
};
