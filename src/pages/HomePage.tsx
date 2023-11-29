import { useEffect, useState } from 'react';

import './styles/Page.scss';
import productsFromServer from '../helpers/api/products.json';
import { getDiscountAmount } from '../helpers/utils/getDiscount';
import { Product } from '../helpers/types/Product';

import { ProductsSlider } from '../components/ProductsSlider';
import { Banners } from '../components/Banners';
import { CategoriesList } from '../components/CategoriesList';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsFromServer as Product[]);
  }, []);

  const hotProducts = products
    .filter(product => product.discount)
    .sort((product1, product2) => {
      return getDiscountAmount(product2) - getDiscountAmount(product1);
    });

  const newProducts = products
    .filter(product => !product.discount)
    .sort((product1, product2) => {
      return product2.price - product1.price;
    });

  return (
    <div className="Page Page--bigger--intervals">
      <Banners />

      <section className="Page__section hot-prices">
        <h1 className="Page__title">Hot prices</h1>
        <ProductsSlider products={hotProducts} />
      </section>

      <section
        className="Page__section shop-by-category"
      >
        <h1 className="Page__title">Shop by category</h1>

        <CategoriesList products={products} />

      </section>

      <section className="Page__section brand-new">
        <h1 className="Page__title">Brand new models</h1>
        <ProductsSlider products={newProducts} />
      </section>
    </div>
  );
};
