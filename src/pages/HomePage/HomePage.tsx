import {
  FC,
  useEffect,
  useState,
} from 'react';

import { ShopByCategories } from '../../components/ShopByCategories';
import { ProductsSlider } from '../../components/ProductSlider/ProductSlider';
import { InfiniteSlider } from '../../components/InfiniteSlider/InfiniteSlider';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getProducts } from '../../utils/fetchData';

import './HomePage.scss';

const carouselImagesUrl = [
  './_new/img/banner-phones.png',
  './_new/img/banner-tablets.png',
  './_new/img/banner-accessories.png',
];

export const HomePage: FC = () => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);

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
    <div className="home-page main__page">
      <InfiniteSlider carouselImagesUrl={carouselImagesUrl} />

      <ProductsSlider title="Hot prices" products={getHotPricesProducts()} />

      <ShopByCategories />

      <ProductsSlider title="Brand new models" products={getBrandNewModels()} />
    </div>
  );
};
