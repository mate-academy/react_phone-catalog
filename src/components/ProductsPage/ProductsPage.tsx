import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { ProductsList } from '../ProductsList';
import { Product } from '../../types/Product';
import { getPhones, getTablets, getAccessories } from '../../api/api';
import { PageHeader } from '../PageHeader';
import './ProductsPage.scss';

type Props = {
  type: string;
  title: string;
};

export const ProductsPage: React.FC<Props> = ({ type, title }) => {
  const [isLoad, setIsLoad] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    switch (type) {
      case 'Phones':
        getPhones().then(setProducts).then(() => setIsLoad(false));
        break;
      case 'Tablets':
        getTablets().then(setProducts).then(() => setIsLoad(false));
        break;
      case 'Accessories':
        getAccessories().then(setProducts).then(() => setIsLoad(false));
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className="products-page">
      <div className="products-page__top">
        <PageHeader title={type} />
      </div>

      <section className="products-page__content">
        <div className="container">
          <div className="page-title-block products-page__page-title-block">
            <h2 className="page-title-block__title">
              {title}
            </h2>
            <span className="page-title-block__item-quantity">
              {products && (
                `${products.length} ${products.length > 1 ? ' models' : ' model'}`
              )}
            </span>
          </div>
          {isLoad && <Loader />}
          {products.length > 0 && <ProductsList products={products} />}
        </div>
      </section>
    </div>
  );
};
