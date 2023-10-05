import {
  FC,
  useEffect,
  useState,
} from 'react';

import { ShopByCategories } from '../../components/ShopByCategories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { getProducts } from '../../utils/fetchData';
import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel/Carousel';

export const HomePage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((productsFromServer) => {
        setProducts(productsFromServer);
      });
  }, []);

  const getHotPricesProducts = () => {
    const hotPriceProducts = products
      .filter(product => product.price > 0)
      .sort((productOne, productTwo) => {
        const productOnePrice = productOne.fullPrice - productOne.price;
        const productTwoPrice = productTwo.fullPrice - productTwo.price;

        return productOnePrice - productTwoPrice;
      });

    return hotPriceProducts;
  };

  const getBrandNewModels = () => {
    const brandNewModels = products
      .filter(product => product.price > 0)
      .sort((productOne, productTwo) => {
        return productTwo.year - productOne.year;
      });

    return brandNewModels;
  };

  return (
    <div className="home-page">
      <h1>Slider</h1>
      <Carousel />

      <h1>Hot prices</h1>
      <ProductSlider title="Hot prices" products={getHotPricesProducts()} />

      <h1>Categories</h1>
      <ShopByCategories />

      <h1>New models</h1>
      <ProductSlider title="Hot prices" products={getBrandNewModels()} />
    </div>
  );
};
