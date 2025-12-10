import { FC } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType, ProductType } from '../../types/Product';

type Props = {
  products: ProductAllType[];
  dropdown?: boolean;
  pagination?: boolean;
};

export const Catalog: FC<Props> = ({
  products,
  dropdown = true,
  pagination = true,
}) => {
  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Mobile phones</h1>
        <div className="catalog__counter">95 models</div>

        {dropdown && <Dropdowns />}

        <div className="catalog__wrapper">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {pagination && <Pagination />}
      </div>
    </section>
  );
};
