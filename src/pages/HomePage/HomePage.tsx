import { BigSlider } from '../../components/BigSlider';
import homePage from './HomePage.module.scss';
import classNames from 'classnames';
import { ProductsSlider } from '../../components/ProductSlider';
import { Categories, Category } from '../../components/Category';
import * as productService from '../../api/product';
import { useEffect, useState } from 'react';
import { Product } from '../../shared/types';

const prepareProductsInfo = (products: Product[]) => {
  const hotPrices = [...products]
    .filter(product => product.price < product.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNewModels = [...products].sort((a, b) => b.year - a.year);

  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;

  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;

  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return {
    hotPrices,
    brandNewModels,
    counts: {
      [Categories.Phones]: phonesCount,
      [Categories.Tablets]: tabletsCount,
      [Categories.Accessories]: accessoriesCount,
    },
  };
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    productService
      .getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const { hotPrices, brandNewModels, counts } = prepareProductsInfo(products);

  return (
    <div className={homePage.HomePage}>
      <div className="container">
        <h1 className={classNames('font-h1', homePage.HomePageTitle)}>
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <BigSlider />
      <ProductsSlider
        products={brandNewModels}
        title="Brand new models"
        isLoading={isLoading}
      />
      <Category counts={counts} />
      <ProductsSlider
        products={hotPrices}
        title="Hot prices"
        isLoading={isLoading}
      />
    </div>
  );
};
