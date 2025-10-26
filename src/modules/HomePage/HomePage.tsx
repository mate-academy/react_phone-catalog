import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDiscountedProducts, getNewestProducts } from '../../api/products';
import { HeroSection } from './components/HeroSection';
import { Product } from '../../types/Product';
import { ProductSlider, ShopByCategory } from '../shared';

export const HomePage = () => {
  const { t } = useTranslation();
  const imageUrls = [
    'img/phones/apple-iphone-14/midnight/00.webp',
    'img/phones/apple-iphone-14/purple/00.webp',
    'img/phones/apple-iphone-14/yellow/00.webp',
  ];

  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getNewestProducts().then(setNewestProducts);
    getDiscountedProducts().then(setDiscountedProducts);
  }, []);


  return (
    <>
      <HeroSection imageUrls={imageUrls} />

      <ProductSlider products={newestProducts} title={t('home.brandNew')} />

      <ShopByCategory />

      <ProductSlider products={discountedProducts} title={t('home.hotPrices')} />
    </>
  );
}
