import { useEffect, useState } from 'react';

import './styles/Page.scss';
import { useGetProductsQuery } from '../helpers/api/productsApi';
import { Product } from '../helpers/types/Product';
import {
  getHotProducts,
  getNewProducts,
} from '../helpers/utils/getSortedProducts';

import { ProductsSlider } from '../components/ProductsSlider';
import { Banners } from '../components/Banners';
import { CategoriesList } from '../components/CategoriesList';
import { Loader } from '../components/Loader';

export const HomePage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      setHotProducts(getHotProducts(products));
      setNewProducts(getNewProducts(products));
    }
  }, [products]);

  return (
    <div className="Page Page--gap--wider Page--padding--top--wider">
      <Banners />

      <section className="Page__section hot-prices">
        <h1 className="Page__title">Hot prices</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsSlider products={hotProducts} />
        )}
      </section>

      <section
        className="Page__section shop-by-category"
      >
        <h1 className="Page__title">Shop by category</h1>

        {!!products && (
          <CategoriesList products={products} />
        )}
      </section>

      <section className="Page__section brand-new">
        <h1 className="Page__title">Brand new models</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <ProductsSlider products={newProducts} />
        )}
      </section>
    </div>
  );
};
