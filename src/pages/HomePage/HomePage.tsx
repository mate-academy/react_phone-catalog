import { useTranslation } from 'react-i18next';
import { ProductSwiper } from '../../components/ProductSwiper';
import { useHotPrices } from './useHotPrices';
import { useBrandNewModel } from './useBrandNewModels';
import styles from './HomePage.module.scss';
import { useCategoryTotal } from './useCategoryTotal';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types/RoutePath';
import { BannerSwiper } from '../../components/BannerSwiper';

export const HomePage = () => {
  const { t } = useTranslation();
  const { totalAccessories, totalPhones, totalTablets, error } =
    useCategoryTotal();

  const {
    products: hotPricesProducts,
    isLoading: isHotPricesLoading,
    error: hotPricesError,
  } = useHotPrices();

  const {
    products: brandNewModelProducts,
    isLoading: isBrandNewModeLoading,
    error: brandNewModeError,
  } = useBrandNewModel();

  return (
    <section className={styles.homePage}>
      <div>
        <h1 className={styles.homePage__title}>
          {t('Welcome to Nice Gadgets store!')}
        </h1>
        <BannerSwiper />
      </div>
      <section>
        {!brandNewModeError && (
          <ProductSwiper
            items={brandNewModelProducts}
            isLoading={isBrandNewModeLoading}
            title={t('Brand new models')}
          />
        )}
      </section>

      <section className={styles.homePage__categoriesSection}>
        <h2 className={styles.homePage__sectionTitle}>
          {t('Shop by category')}
        </h2>
        <div className={styles.categories}>
          <Link to={RoutePath.Phones} className={styles.categories__item}>
            <img
              className={styles.categories__image}
              src="img/category-phones.png"
              alt="phones"
            />
            <h4 className={styles.categories__title}>{t('phonesPage')}</h4>
            {!error && (
              <p className={styles.categories__modelsCount}>
                {t('modelsCount', { count: totalPhones })}
              </p>
            )}
          </Link>

          <Link to={RoutePath.Tablets} className={styles.categories__item}>
            <img
              className={styles.categories__image}
              src="img/category-tablets.png"
              alt="tablets"
            />
            <h4 className={styles.categories__title}>{t('tabletsPage')}</h4>
            {!error && (
              <p className={styles.categories__modelsCount}>
                {t('modelsCount', { count: totalTablets })}
              </p>
            )}
          </Link>

          <Link to={RoutePath.Accessories} className={styles.categories__item}>
            <img
              className={styles.categories__image}
              src="img/category-accessories.png"
              alt="accessories"
            />
            <h4 className={styles.categories__title}>{t('accessoriesPage')}</h4>
            {!error && (
              <p className={styles.categories__modelsCount}>
                {t('modelsCount', { count: totalAccessories })}
              </p>
            )}
          </Link>
        </div>
      </section>

      <section>
        {!hotPricesError && (
          <ProductSwiper
            items={hotPricesProducts}
            isLoading={isHotPricesLoading}
            title={t('Hot prices')}
          />
        )}
      </section>
    </section>
  );
};
