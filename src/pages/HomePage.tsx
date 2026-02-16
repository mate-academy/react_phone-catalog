import { useTranslation } from 'react-i18next';
import { Loader } from '../components/Loader';
import { ProductSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { TopSlider } from '../components/TopSlider';
import { useProducts } from '../context/ProductsContext';

export const HomePage = () => {
  const { t } = useTranslation('homepage');

  const products = useProducts();

  const isLoading = !products || !Array.isArray(products);
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const brandNewProducts = products
    .filter(product => product.year >= 2021)
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const hotPriceProducts = products
    .filter(p => p.year < 2020)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  const productsSliderConfig = {
    titleForBrand: t('brandNewModels'),
    marginTop: 'mt-21 tablet:mt-23 desktop:mt-27',
  };

  const hotPricesSliderConfig = {
    titleForBrand: t('hotPrices'),
    marginTop: 'mt-14 tablet:mt-16 desktop:mt-20',
  };

  return (
    <>
      <h1 className="text-primary dark:text-dark-primary my-6 tablet:my-8 desktop:my-14">
        {t('welcomeTitle')}
      </h1>

      <TopSlider />

      <ProductSlider
        sliderConfig={productsSliderConfig}
        products={brandNewProducts}
      />

      <ShopByCategory />

      <ProductSlider
        sliderConfig={hotPricesSliderConfig}
        products={hotPriceProducts}
      />
    </>
  );
};
