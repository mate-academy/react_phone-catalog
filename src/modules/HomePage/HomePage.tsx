import { useTranslation } from 'react-i18next';
import { HeroTitle } from '../../components/HeroTitle';
import { Slider } from '../../components/Slider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { CategoryPreview } from '../../components/CategoryPreview';

import styles from './HomePage.module.scss';

import img1 from '../../../public/_old/v2/img/banner-phones.png';
import img2 from '../../../public/_old/v2/img/banner-tablets.png';
import img3 from '../../../public/_old/v2/img/banner-accessories.png';

export const HomePage = () => {
  const { t } = useTranslation();

  const images = [img1, img2, img3];

  return (
    <div className={styles.homePage}>
      <HeroTitle title={t('home.heroTitle')} />

      <Slider images={images} autoPlay autoPlayDelay={4000} />

      <ProductsSlider title={t('home.brandNewModels')} category="phones" />

      <CategoryPreview
        phonesTitle={t('home.categories.phones')}
        tabletsTitle={t('home.categories.tablets')}
        accessoriesTitle={t('home.categories.accessories')}
      />

      <ProductsSlider title={t('home.hotPrices')} category="phones" />
    </div>
  );
};
