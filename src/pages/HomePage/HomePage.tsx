import { useContext, useMemo } from 'react';
import { Banner } from '../../components/HomePageComponent/Banner';
import { CategoryList } from '../../components/HomePageComponent/CategoryList';
import { ProductList } from '../../components/ProductList/ProductList';
import './HomePage.scss';
import { ApiContext } from '../../context/ApiContext';
import { ProductType } from '../../types/ProductType';

export const HomePage = () => {
  const products = useContext(ApiContext);
  const SALE = 100;

  const filteredLowestPrice = useMemo(
    () =>
      products.filter(
        (product: ProductType) => product.fullPrice - product.price > SALE,
      ),
    [products],
  );

  const filteredNewModels = useMemo(
    () => products.filter((product: ProductType) => product.year === 2022),
    [products],
  );

  return (
    <div className="container">
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <Banner />
      <br />
      <ProductList title={'Brand new models'} productList={filteredNewModels} />
      <br />
      <CategoryList />
      <br />
      <ProductList title={'Hot prices'} productList={filteredLowestPrice} />
    </div>
  );
};
