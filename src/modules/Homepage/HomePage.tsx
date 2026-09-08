import { ModelsListSlider } from '../../components/ModelsListSlider';
import { Header } from './components/Header';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { useProducts } from '../../context/ProductsContext';
import { Loader } from '../../components/Loader';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { products, isLoading } = useProducts();
  const { t } = useTranslation();

  const newModels = [...products]
    .sort((item1, item2) => item2.year - item1.year)
    .slice(0, 30);
  const hotPrices = [...products]
    .sort((item1, item2) => {
      const item1Discount =
        (item1.fullPrice - item1.price) / (item1.fullPrice / 100);
      const item2Discount =
        (item2.fullPrice - item2.price) / (item2.fullPrice / 100);

      return item2Discount - item1Discount;
    })
    .slice(0, 30);

  return (
    <div className={styles.home_page}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <ModelsListSlider
            title={t('newModels')}
            products={newModels}
            discount={false}
          />
          <Categories />
          <ModelsListSlider
            title={t('hotPrices')}
            products={hotPrices}
            discount={true}
          />
        </>
      )}
    </div>
  );
};
