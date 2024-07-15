import { Banner } from '../../components/Banner/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import './HomePage.scss';
// import products from '../../api/products.json';
import { getBrandNewProducts, getHotPriceProducts } from '../../servises';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/httpClient';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  const sortedByNew = getBrandNewProducts(products);
  const storedByPrice = getHotPriceProducts(products);

  return (
    <main className="homePage">
      <div className="homeTop">
        <h1 className="homeTop__title">Welcome to Nice Gadgets store!</h1>
      </div>
      <Banner />
      <ProductSlider title="Brand new models" products={sortedByNew} />
      <Categories />
      <ProductSlider title="Hot prices" products={storedByPrice} />
    </main>
  );
};
