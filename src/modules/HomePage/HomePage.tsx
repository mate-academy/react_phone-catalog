import { useEffect, useState } from 'react';
import {
  useAccessories,
  usePhones,
  useProducts,
  useTablets,
} from '../../hooks/useProducts';
import { Category } from '../Category';
import { ProductsSlider } from '../shared/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import styles from './HomePage.module.scss';
// eslint-disable-next-line max-len
import { MobilePicturesSlider } from './components/MobilePicturesSlider/MobilePicturesSlider';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { t } = useTranslation();

  const products = useProducts();
  const phones = usePhones();
  const tablets = useTablets();
  const accessories = useAccessories();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const phoneSortByPrice = products.toSorted((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  const phoneSortByNew = products.toSorted((a, b) => {
    const discountA = a.year;
    const discountB = b.year;

    return discountB - discountA;
  });

  const arrayWithoutFullPrice = phoneSortByNew.map(
    ({ fullPrice, ...phone }) => phone,
  );

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>{t('Welcome')}</h1>

      {isMobile ? <MobilePicturesSlider /> : <PicturesSlider />}
      <ProductsSlider title={t('New')} products={arrayWithoutFullPrice} />
      <Category
        phoneQuantity={phones.length}
        tabletsQuantity={tablets.length}
        accessoriesQuantity={accessories.length}
      />
      <ProductsSlider title={t('Hot')} products={phoneSortByPrice} />
    </div>
  );
};
