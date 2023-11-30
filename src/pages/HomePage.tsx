import { useEffect, useState } from 'react';

import './styles/Page.scss';
import productsFromServer from '../helpers/api/products.json';
import { Product } from '../helpers/types/Product';
import {
  getHotProducts,
  getNewProducts,
} from '../helpers/utils/getSortedProducts';

import { ProductsSlider } from '../components/ProductsSlider';
import { Banners } from '../components/Banners';
import { CategoriesList } from '../components/CategoriesList';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsFromServer as Product[]);
  }, []);

  const hotProducts = getHotProducts(products);

  const newProducts = getNewProducts(products);

  return (
    <div className="Page Page--gap--wider Page--padding--top--wider">
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
