/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useState } from 'react';
import { Category, Product } from '../../types/Product';
import { getProductList } from '../../api/products';
import { ProductList } from './components/ProductList';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Filter } from './components/Filter';
import s from './CategoryPage.module.scss';

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

  const breadcrumbs = [{ link: null, label: categoryTitles[category] }];

  return (
    <main>
      <div className={s.container}>
        <Breadcrumbs paths={breadcrumbs} />
        <h1>{categoryTitles[category]}</h1>
        <div className={s.count}>{count && count} models</div>
        <Filter />
        <ProductList products={products} />
      </div>
    </main>
  );
};
