import { useEffect, useState } from 'react';

import productsFromServer from '../../helpers/api/products.json';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../helpers/types/Product';
import { Banners } from '../../components/Banners';
import { CategoriesList } from '../../components/CategoriesList';
import { getDiscountAmount } from '../../helpers/utils/getDiscount';
import './HomePage.scss';

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
    <div className="HomePage">
      <Banners />

      <section className="HomePage__hot-prices">
        <h1 className="HomePage__title">Hot prices</h1>
        <ProductsSlider products={hotProducts} />
      </section>

      <section
        className="HomePage__shop-by-category"
      >
        <h1 className="HomePage__title">Shop by category</h1>

        <CategoriesList products={products} />

      </section>

      <section className="HomePage__brand-new">
        <h1 className="HomePage__title">Brand new models</h1>
        <ProductsSlider products={newProducts} />
      </section>
    </div>
  );
};
