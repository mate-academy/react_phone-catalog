import { FC, useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType, ProductType } from '../../types/Product';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/Sort';

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
  const [searchParams, setSearchParams] = useSearchParams('');
  const [sortProducts, setSortProducts] = useState<ProductAllType[]>([]);

  useEffect(() => {
    console.log(searchParams.get('sortBy'));
    if (
      searchParams.get('sortBy') === null ||
      searchParams.get('sortPage') === null
    ) {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.set('sortBy', SortBy.Newest);
        params.set('sortPage', '16');
        return params;
      });
    }

    setSortProducts(
      sortBy(searchParams.get('sortBy') || SortBy.Newest, products),
    );

  }, [searchParams]);

  function sortBy(searchParams: string, products: ProductAllType[]) {
    switch (searchParams) {
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheaper':
        return products.sort((a, b) => a.price - b.price);
      case 'newest':
        return products.sort((a, b) => b.year - a.year);
      default:
        return products;
    }
  }

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h1 className="catalog__title">Mobile phones</h1>
        <div className="catalog__counter">95 models</div>

        {dropdown && <Dropdowns />}

        <div className="catalog__wrapper">
          {sortProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {pagination && <Pagination />}
      </div>
    </section>
  );
};
