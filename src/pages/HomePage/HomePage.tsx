import { useContext } from 'react';
import './HomePage.scss';
import { Banner } from '../../components/Banner/Banner';
import { ProductSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopBycategory';
import { GlobalContext } from '../../components/Context/Context';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);

  const hotPricesProducts = products.sort(
    (productA, productB) =>
      productB.fullPrice -
      productB.price -
      (productA.fullPrice - productA.price),
  );

  const newBrandProducts = products.sort(
    (productA, productB) => productB.year - productA.year,
  );

  return (
    <div className="home">
      <div className="container">
        <div className="home__content">
          <h1 hidden>Product Catalog</h1>
          <Banner />

          <ProductSlider title="Hot prices" products={hotPricesProducts} />

          <ShopByCategory />

          <ProductSlider title="Brand new models" products={newBrandProducts} />
        </div>
      </div>
    </div>
  );
};
