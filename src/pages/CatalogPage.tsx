import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Pagination from '../components/Pagination/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const paramFromNavLink = 'phones';

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
    });
  }, []);

  const filteredProducts = products.filter(
    d => d.category === paramFromNavLink,
  );

  return (
    <div className="catalog-page">
      <Breadcrumbs />

      <ProductFilter />

      <ProductContent items={filteredProducts} />

      <Pagination />
    </div>
  );
};
