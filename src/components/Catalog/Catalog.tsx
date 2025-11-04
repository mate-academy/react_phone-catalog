import { FC } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const Catalog: FC<Props> = ({ products }) => {
  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Mobile phones</h1>
        <div className="catalog__counter">95 models</div>

        <Dropdowns />

        <div className="catalog__wrapper">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  );
};
