import { FC, useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType } from '../../types/Product';
import { NameCategory } from '../../types/NameProducts';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/Sort';
import { scrollToTop } from '../../utils/utils';

type Props = {
  products: ProductAllType[];
  dropdown?: boolean;
  pagination?: boolean;
  categoryName: NameCategory;
};

export const Catalog: FC<Props> = ({
  products,
  dropdown = true,
  pagination = true,
  categoryName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const sortByParam = searchParams.get('sortBy');
  const sortPageParam = searchParams.get('sortPage');

  function sortBy(parametrs: string, sortItems: ProductAllType[]) {
    switch (parametrs) {
      case 'name':
        return sortItems.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheaper':
        return sortItems.sort((a, b) => a.price - b.price);
      case 'newest':
        return sortItems.sort((a, b) => b.year - a.year);
      default:
        return sortItems;
    }
  }

  function infoObject(categoryItem: NameCategory): {
    name: NameCategory;
    quantity: number;
  } {
    let name = '';

    switch (categoryItem) {
      case 'phones':
        name = 'Mobile phones';
        break;
      case 'tablets':
        name = 'Tablets';
        break;
      case 'accessories':
        name = 'Accessories';
        break;
      default:
        break;
    }

    return {
      name: name as NameCategory,
      quantity: products.length | 0,
    };
  }

  const { name, quantity } = infoObject(categoryName);

  // Pagination logic can be added here in the future

  const [perPage, setPerPage] = useState<number>(
    +(searchParams.get('sortPage') || '16'),
  );
  const [currentPage, setCurrentPage] = useState(
    +(searchParams.get('currentPage') || 1),
  );

  const [sortByName, setSortByName] = useState(
    searchParams.get('sortBy') || SortBy.Newest,
  );

  useEffect(() => {
    setCurrentPage(+(searchParams.get('currentPage') || 1));
    setPerPage(+(searchParams.get('sortPage') || '16'));
    setSortByName(searchParams.get('sortBy') || SortBy.Newest);
  }, [sortPageParam, sortByParam]);
  useEffect(() => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('currentPage', currentPage.toString());
      return params;
    });
  }, [currentPage]);

  /* eslint-disable @typescript-eslint/indent */

  const filteredPage =
    currentPage === 1
      ? sortBy(sortByName, products.slice(0, perPage))
      : sortBy(
          sortByName,
          products.slice(
            perPage * currentPage - perPage,
            perPage * currentPage,
          ),
        );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <Breadcrumbs />

        <h2 className="catalog__title">{name}</h2>
        <div className="catalog__counter">
          {quantity} model{quantity !== 1 ? 's' : ''}
        </div>

        {dropdown && <Dropdowns />}

        <div className="catalog__wrapper">
          {filteredPage.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {pagination && (
          <Pagination
            total={products.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={page => onPageChange(page)}
          />
        )}
      </div>
    </section>
  );
};
