import React, { useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/Catalog/Breadcrumbs';
import { Dropdowns } from '../components/Catalog/Dropdowns';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import phonesFromServer from '../../public/api/products.json';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';

export const PhonesPage = () => {


  const products: Product[] = useMemo(() => {
    return phonesFromServer.filter(product => product.category === 'phones');
  }, []);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);




  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Mobile phones</h1>
        <div className="catalog__counter">95 models</div>

        <Dropdowns />

        <div className="catalog__wrapper">
          {filteredProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  );
};
