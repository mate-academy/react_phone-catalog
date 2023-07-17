import { useContext } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { Context } from '../../context/Context';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

export const HomePage: React.FC = () => {
  const { products } = useContext(Context);

  const getHotPriceProducts = (items: Product[]) => {
    return items
      .filter(item => item.discount > 0)
      .sort((product1, product2) => (
        (product2.price * ((100 - product2.discount) / 100))
        - (product1.price * ((100 - product1.discount) / 100))
      ));
  };

  const getBrandNewProducts = (items: Product[]) => {
    return items
      .filter(item => item.discount === 0)
      .sort((product1, product2) => product2.price - product1.price);
  };

  return (
    <>
      <BannerSlider />

      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts(products)}
      />

      <ShopByCategory />

      <ProductsSlider
        title="Brand new"
        products={getBrandNewProducts(products)}
      />
    </>
  );
};
