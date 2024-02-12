/* eslint-disable jsx-a11y/control-has-associated-label */
import { SectionHeader } from '../SectionHeader';
import { ProductCard } from '../ProductCard';
import { PagePagination } from '../PagePagination/PagePagination';

import { PageFilter } from '../PageFilter/PageFilter';
import { PageSmallNav } from '../PageSmallNav/PageSmallNav';
import './ProductsPage.scss';

const phonesPages = [1, 2, 3, 4, 5];

type Props = {
  classNames?: string,
};

export const ProductsPage: React.FC<Props> = () => {
  return (
    <div className="products-page">
      <PageSmallNav />
      <div className="products-page__title">
        <SectionHeader
          title="Mobile phones"
          subtitle="95 models"
        />
      </div>
      <PageFilter />
      <div className="products-page__cards">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <PagePagination pages={phonesPages} />
    </div>
  );
};
