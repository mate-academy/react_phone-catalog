import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../components/ProductCarousel';

import './AccessoriesPage.scss';
import { fetchProducts } from '../../services/api';
import { Catalog } from '../../components/Catalog';

export const AccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        const accessories = data.filter(
          (product: Product) => product.category === 'accessories',
        );

        setProducts(accessories);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  return (
    <>
      <div className="grid">
        <Breadcrumbs />
        <div className="accessories-header">
          <div className="accessories-header__title">Accessories</div>
          <div className="accessories-header__proucts-count">
            {products.length} models
          </div>
        </div>
        <Catalog products={products} showFilters={true} />
      </div>
    </>
  );
};
