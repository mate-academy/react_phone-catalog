import { useEffect, useState } from 'react';
import './HomePage.scss';
import { Banner } from '../../components/Banner';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { BannerImage } from '../../types/BannerImage';
import { Product } from '../../types/Product';
import { ShopByCategory } from '../../components/ShopByCategory';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../services/products';

const images: BannerImage[] = [
  { name: 'phones', path: 'banner-phones.png' },
  { name: 'tablets', path: 'banner-tablets.png' },
  { name: 'accessories', path: 'banner-accessories.png' },
];

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [isHotPriceLoading, setIsHotPriceLoading] = useState(false);
  const [isBrandNewLoading, setIsBrandNewLoading] = useState(false);

  useEffect(() => {
    setIsHotPriceLoading(true);

    getHotPriceProducts()
      .then(items => setHotPriceProducts(items))
      .finally(() => setIsHotPriceLoading(false));
  }, []);

  useEffect(() => {
    setIsBrandNewLoading(true);

    getBrandNewProducts()
      .then(items => setBrandNewProducts(items))
      .finally(() => setIsBrandNewLoading(false));
  }, []);

  return (
    <div className="home-page">
      <Banner images={images} />

      <ProductSlider
        title="Hot prices"
        products={hotPriceProducts}
        isLoading={isHotPriceLoading}
      />

      <ShopByCategory />

      <ProductSlider
        title="Brand new"
        products={brandNewProducts}
        isLoading={isBrandNewLoading}
      />
    </div>
  );
};
