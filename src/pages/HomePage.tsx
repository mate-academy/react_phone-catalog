import { Loader } from '../components/Loader';
import { ProductSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { TopSlider } from '../components/TopSlider';
import { useProducts } from '../context/ProductsContext';
import { useLanguage } from '../context/language/useLanguage';
import { homePageDictionary } from '../i18n/homePageDictionary';

export const HomePage = () => {
  //hook Context
  const products = useProducts();
  const { currentLanguage } = useLanguage();
  const translations = homePageDictionary[currentLanguage];

  const isLoading = !products || !Array.isArray(products);
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    ); // add loader?
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
    titleForBrand: translations.brandNewModels,
    marginTop: 'mt-21 tablet:mt-23 desktop:mt-27',
  };

  const hotPricesSliderConfig = {
    titleForBrand: translations.hotPrices,
    marginTop: 'mt-14 tablet:mt-16 desktop:mt-20',
  };

  return (
    <>
      <h1 className="text-primary dark:text-dark-primary my-6 tablet:my-8 desktop:my-14">
        {translations.welcomeTitle}
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
