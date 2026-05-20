import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../../utils/api';
import { Product } from '../../types';
import styles from '../ProductsPage/ProductsPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';

type Category = 'phones' | 'tablets' | 'accessories';

const categoryNames = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = () => {
  const location = useLocation();
  const category = location.pathname.slice(1);
  const title = categoryNames[category as Category];

  const [products, setProducts] = useState<Product[]>([]);

  const countProducts = products.length;

  useEffect(() => {
    getData<Product[]>('products').then(data =>
      setProducts(data.filter(p => p.category === category)),
    );
  }, [category]);

  return (
    <div className={styles.productspage}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Home.svg"
            alt="home"
          />
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Chevron_(Arrow_Right).svg"
            alt=" to"
          />
          <p className={styles.breadcrumb_category}>{category}</p>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>{countProducts} models</p>
        <div className={styles.filters}>
          <div className={styles.sort_by}>
            <p className={styles.filters_title}>Sort by</p>
            <select className={styles.filters_select}>
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>
          <div className={styles.items_on_page}>
            <p className={styles.filters_title}>Items on page</p>
            <select className={styles.filters_select}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </div>
        </div>
      </header>
      <div className={styles.products}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
