import { useLanguage } from '../../context/LanguageContext';

import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <section>
      <h1 className="visually-hidden">{t('productCatalog')}</h1>

      <PicturesSlider />

      <ProductsSlider title={t('hotPrices')} type="hot" />

      <ShopByCategory />

      <ProductsSlider title={t('newestProducts')} type="newest" />
    </section>
  );
};
