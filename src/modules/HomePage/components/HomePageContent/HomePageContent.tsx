//#region imports
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import { BannerSlider } from '../BannerSlider';
import { ProductSlider } from '../../../shared/components/ProductSlider';
import { useAppSelector } from '../../../../store/hooks';
import {
  selectHottestProducts,
  selectNewestProducts,
} from '../../../../store/selectors/products';
import { Categories } from '../Categories';
import baseStyles from './base.module.scss';
import styles from './HomePageContent.module.scss';
//#endregion

export const HomePageContent = () => {
  const { t } = useTranslation('homePage');

  const newestProducts = useAppSelector(selectNewestProducts);
  const hottestProducts = useAppSelector(selectHottestProducts);

  return (
    <section
      className={`${baseStyles.homePage} ${styles.homePage}`}
      aria-label={t('homePage')}
    >
      <h1 hidden>Product Catalog</h1>

      <h2 className={`${baseStyles.title} ${styles.title}`}>
        {capitalizeFirstWord(t('welcome'))}
      </h2>

      <div className={baseStyles.main}>
        <BannerSlider />

        <ProductSlider title={t('brandNewModels')} products={newestProducts} />

        <Categories />

        <ProductSlider title={t('hotPrices')} products={hottestProducts} />
      </div>
    </section>
  );
};
