import './HomePage.scss';
import { FC, useContext, useMemo } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsSlider } from '../../shared/ProductsSlider';
import { Product } from '../../types/Product';

export const HomePage: FC = () => {
  const { allProducts } = useContext(GlobalContext);
  let newestProducts: Product[] = [];
  const newestPhones = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.category === 'phones')
        .sort((phone1, phone2) => phone2.year - phone1.year)
        .slice(0, 20),
    [allProducts],
  );

  const newestTablets = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.category === 'tablets')
        .sort((p1, p2) => p2.year - p1.year)
        .slice(0, 20),
    [allProducts],
  );

  const newestAccessories = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.category === 'accessories')
        .sort((p1, p2) => p2.year - p1.year)
        .slice(0, 20),
    [allProducts],
  );

  newestProducts = [
    ...newestPhones.slice(0, 5),
    ...newestTablets.slice(0, 5),
    ...newestAccessories.slice(0, 5),
  ];

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
      <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>

      <PicturesSlider allNewestProducts={newestProducts} />

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
