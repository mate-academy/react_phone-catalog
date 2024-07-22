import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { PicturesSlider } from '../components/PicturesSlider';
import { NewModels } from '../components/NewModels';
import { Categories } from '../components/Categories';
import { HotPrices } from '../components/HotPrices';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../utils/i18n/translations';
import gStyles from '../styles/general.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });

    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h1 hidden>Product Catalog</h1>
      <h2 className={`main-title ${gStyles.heroTitle}`}>
        {t(TRANSLATIONS.hero.title)}
      </h2>
      <PicturesSlider />
      <NewModels products={products} />
      <Categories products={products} />
      <HotPrices products={products} />
    </>
  );
};
