import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../components/ProductCarousel';

import './PhonePage.scss';
import { fetchProducts } from '../../services/api';
import { Catalog } from '../../components/Catalog';

export const PhonePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        const phones = data.filter(
          (product: Product) => product.category === 'phones',
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
        <div className="phone-header">
          <div className="phone-header__title">Mobile Phones</div>
          <div className="phone-header__proucts-count">
            {products.length} models
          </div>
        </div>
        <Catalog products={products} showFilters={true} />
      </div>
    </>
  );
};
