import React from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProduct } from '../../hooks/useProduct';
import { useErrorHandling } from '../../hooks/errorHandling';

export const HomePage: React.FC = () => {
  const { setIsError } = useErrorHandling();
  const { product } = useProduct(() => setIsError(true));

  const brandNewProducts = [...product]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 8);

  const discountedProducts = [...product]
    .filter(prod => prod.priceRegular && prod.priceDiscount)
    .sort(
      (a, b) =>
        b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
    )
    .slice(0, 8);

  return (
    <div>
      <PicturesSlider />
      <ProductsSlider
        products={brandNewProducts}
        title="Brand new models"
        navigationPrevClass="brand-new-prev"
        navigationNextClass="brand-new-next"
        showFullPrice={false}
      />
      <ShopByCategory />
      <ProductsSlider
        products={discountedProducts}
        title="Hot prices"
        navigationPrevClass="hot-prices-prev"
        navigationNextClass="hot-prices-next"
        showFullPrice={true}
      />
    </div>
  );
};
