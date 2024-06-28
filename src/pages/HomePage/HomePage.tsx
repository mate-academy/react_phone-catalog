import React, { useContext } from 'react';
import './HomePage.scss';
import Banner from '../../components/Banner/Banner';
import { StateProduct } from '../../context/ProductContext';
import { getBrandNewProducts, getHotPriceProducts } from '../../servises';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Categories from '../../components/Categories/Categories';

const HomePage: React.FC = () => {
  const { products } = useContext(StateProduct);

  const sortedByNew = getBrandNewProducts(products);
  const storedByPrice = getHotPriceProducts(products);

  return (
    <main className="homePage">
      <div className="homeTop">
        <h1 className="homeTop__title">Product Catalog</h1>
      </div>
      <Banner />
      <ProductSlider title="Brand new models" products={sortedByNew} />
      <Categories />
      <ProductSlider title="Hot prices" products={storedByPrice} />
    </main>
  );
};

export default HomePage;
