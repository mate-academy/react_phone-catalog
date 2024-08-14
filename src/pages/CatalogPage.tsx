// import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Pagination from '../components/Pagination/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';
// import { Product } from '../types/Product';
// import { getProducts } from '../services/products';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useProducts } from '../hooks/useProducts';

export const CatalogPage = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  const { products } = useProducts();
  const { pathname } = useLocation();
  const paramFromNavLink = pathname.slice(1);

  // useEffect(() => {
  //   getProducts().then(data => {
  //     setProducts(data);
  //   });
  // }, []);

  const filteredProducts = products.filter(
    d => d.category === paramFromNavLink,
  );

  type CategoryKey = 'phones' | 'tablets' | 'accessories';

  const TITLE: Record<CategoryKey, string> = {
    phones: 'Mobile Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  return (
    <div className="catalog-page">
      <Breadcrumbs />

      <div className="catalog-page__title-block">
        <h2>{TITLE[paramFromNavLink as CategoryKey]}</h2>
        <p className={classNames('small-text', 'catalog-page__description')}>
          {filteredProducts.length} models
        </p>
      </div>

      <ProductFilter />

      <ProductContent items={filteredProducts} />

      <Pagination />
    </div>
  );
};
