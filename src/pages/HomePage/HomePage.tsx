import { Banner } from '../../components/Banner/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import './HomePage.scss';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../shared/servises';
import { useContext } from 'react';
import { ProductContext } from '../../shared/Context/ProductContext';

export const HomePage: React.FC = () => {
  const { products } = useContext(ProductContext);

  const sortedByNew = getBrandNewProducts(products);
  const storedByPrice = getHotPriceProducts(products);

  return (
    <main className="homePage">
      <div className="homeTop">
        <h1 className="homeTop__title--hidden">Product Catalog</h1>
        <header className="homeTop__title">
          Welcome to Nice Gadgets store!
        </header>
      </div>
      <Banner />
      <ProductSlider title="Brand new models" products={sortedByNew} />
      <Categories />
      <ProductSlider title="Hot prices" products={storedByPrice} />
    </main>
  );
};
