import { useTranslation } from 'react-i18next';
import styles from '../../modules/HomePage/HomePage.module.scss';
import PicturesSlider from '../../components/PicturesSlider/PicturesSlider';
import { PhonesSlider } from '../../components/PhonesSlider/PhonesSlider';
import { useEffect, useState } from 'react';
import { getNewProducts } from '../../services/getNewProducts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProducts } from '../../features/productsSlice';
import { Loader } from '../../components/Loader';
import { CategoriesSection } from '../../components/CategoriesSection';

export const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(resolve => {
        const newProducts = resolve.map(item => ({ ...item, quantity: 1 }));

        dispatch(setProducts(newProducts));
      })
      .catch(
        () =>
          // eslint-disable-next-line max-len
          'Oops! Something went wrong while loading data. Please try again later.',
      )
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch]);

  const brandNewModels = [...products]
    .filter(prod => prod.year === 2022)
    .sort((prod1, prod2) => prod1.year - prod2.year);

  const discountedModels = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .filter(prod => prod.fullPrice - prod.price > 80);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__title}>
        <h1 className={styles.homePage__title__text}>{t('homePage.title')}</h1>
      </div>
      <div className={styles.content}>
        <section className={styles.picturesSlider}>
          <PicturesSlider />
        </section>

        <section className={styles.phonesSlider}>
          <PhonesSlider
            title={t('homePage.brandNewModels')}
            products={brandNewModels}
          />
        </section>

        <section className={styles.categories}>
          <CategoriesSection />
        </section>

        <section className={styles.phonesSlider}>
          <PhonesSlider
            title={t('homePage.hotPrices')}
            products={discountedModels}
            discount
          />
        </section>
      </div>
    </div>
  );
};
