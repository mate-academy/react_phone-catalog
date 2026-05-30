import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../components/ProductCarousel';

import './TabletPage.scss';
import { fetchProducts } from '../../services/api';
import { Catalog } from '../../components/Catalog';

export const TabletPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        const phones = data.filter(
          (product: Product) => product.category === 'tablets',
        );

        setProducts(phones);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  return (
    <>
      <div className="grid">
        <Breadcrumbs />
        <div className="tablet-header">
          <div className="tablet-header__title">Tablets</div>
          <div className="tablet-header__proucts-count">
            {products.length} models
          </div>
        </div>
        <Catalog products={products} showFilters={true} />
      </div>
    </>
  );
};
