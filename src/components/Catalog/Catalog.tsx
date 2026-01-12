import { FC, useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import './Catalog.scss';
import { Dropdowns } from './Dropdowns';
import { ProductAllType, ProductType } from '../../types/Product';
import { nameCategory } from '../../types/NameProducts';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/Sort';
import { scrollToTop } from '../../utils/utils';

type Props = {
  products: ProductAllType[];
  dropdown?: boolean;
  pagination?: boolean;
  nameCategory: nameCategory;
};

export const Catalog: FC<Props> = ({
  products,
  dropdown = true,
  pagination = true,
  nameCategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams('');

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

  function infoObject(nameCategory: nameCategory): {
    name: nameCategory;
    quantity: number;
  } {
    let name = '';

    switch (nameCategory) {
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
      name: name as nameCategory,
      quantity: products.length | 0,
    };
  }

  const { name, quantity } = infoObject(nameCategory);

  // Pagination logic can be added here in the future

  const [perPage, setPerPage] = useState<number>(
    +(searchParams.get('sortPage') || '16'),
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setPerPage(+(searchParams.get('sortPage') || '16'));
  }, [searchParams, perPage]);

  console.log(perPage);

  const sortByName = searchParams.get('sortBy') || SortBy.Newest;

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

        <h1 className="catalog__title">{name}</h1>
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
