/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useState } from 'react';
import { Category, Product } from '../../types/Product';
import s from './CategoryPage.module.scss';
import { getProductList } from '../../api/products';
import { ProductList } from './components/ProductList';

interface Props {
  category: Category;
}

const categoryTitles = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CategoryPage: FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const count = products.length;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList(category);

        setProducts(productList); // should now log your data
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <main>
      <div className={s.container}>
        <div>Breadcrumps</div>
        <h1>{categoryTitles[category]}</h1>
        <div>{count && count} models</div>
        <div>Filter</div>
        <ProductList products={products} />
      </div>
    </main>
  );
};
