import './homePage.scss';
import { useCallback } from 'react';

import { ProductsSlider } from '../../components/ProductsSlider';
import { BannerSlider } from '../../components/BannerSlider';
import { ShopByCategory } from '../../components/ShopByCategory';

import { Product } from '../../type/product';

type Props = {
  products: Product[],
  isLoading: boolean,
};

export const HomePage: React.FC<Props> = ({ products, isLoading }) => {
  const getHotPrice = useCallback(() => {
    return products.filter((product) => product.discount)
      .sort((a, b) => (b.price * ((100 - b.discount) / 100))
        - (a.price * ((100 - a.discount) / 100)));
  }, [products]);

  const getNewProducts = useCallback(() => {
    return products.filter((product) => !product.discount)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <section className="home">
      <BannerSlider />

      <ProductsSlider
        isLoading={isLoading}
        products={getHotPrice()}
        title="Hot prices"
      />

      <ShopByCategory />

      <ProductsSlider
        isLoading={isLoading}
        products={getNewProducts()}
        title="Brand new models"
      />
    </section>
  );
};
