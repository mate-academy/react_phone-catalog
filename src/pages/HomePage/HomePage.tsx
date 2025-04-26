import './HomePage.scss';
import { FC, useContext, useMemo } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';

export const HomePage: FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const newestPhones = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.category === 'phones')
        .sort((phone1, phone2) => phone2.year - phone1.year)
        .slice(0, 20),
    [allProducts],
  );

  const hotPricesProducts = useMemo(
    () =>
      [...allProducts]
        .map(product => ({
          ...product,
          discount:
            ((product.fullPrice - product.price) / product.fullPrice) * 100,
        }))
        .sort((product1, product2) => product2.discount - product1.discount)
        .slice(0, 20),
    [allProducts],
  );

  return (
    <div className="homePage">
      <h1 className="visually-hidden">Product Catalog</h1>
      <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={newestPhones}
        displayType="fullPrice"
      />

      <ShopByCategory />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        displayType="with-discount"
      />
    </div>
  );
};
