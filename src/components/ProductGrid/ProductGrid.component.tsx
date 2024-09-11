import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { ProductCard } from '../base/ProductCard/ProductCard.component';
import { ProductSummary } from '../../types/ProductSummary';
import { getPageNumbers } from '../../utils/getPageNumbers';
import { Pagination } from '../Pagination/Pagination.component';
import { SortOptions } from '../SortOptions/SortOptions.component';
import { useSearchParams } from 'react-router-dom';

type Props = {
  category: Category;
  pagination?: boolean;
};

export const ProductGrid: React.FC<Props> = ({ category, pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const [productsSortedBy, setProductsSortedBy] = useState<ProductSummary[]>(
    [],
  );
  let sortedProducts = [...category.products];
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    sortedProducts.length,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageNumbers: number[] = getPageNumbers(
    sortedProducts.length,
    itemsPerPage,
  );
  const currentIndex = pageNumbers.indexOf(currentPage);
  const fromIndex = currentIndex * itemsPerPage;
  const toIndex =
    fromIndex + itemsPerPage <= sortedProducts.length
      ? fromIndex + itemsPerPage
      : sortedProducts.length;

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);

    setSearchParams(params);

    switch (sort) {
      case 'age':
        sortedProducts = sortedProducts.sort((a, b) => b.year - a.year);
        setProductsSortedBy(sortedProducts);
        break;
      case 'title':
        sortedProducts = sortedProducts.sort((a, b) =>
          b.name.localeCompare(a.name),
        );
        setProductsSortedBy(sortedProducts);
        break;
      case 'price':
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        setProductsSortedBy(sortedProducts);
        break;
      default:
        sortedProducts = sortedProducts.sort((a, b) => b.year - a.year);
        setProductsSortedBy(sortedProducts);
        break;
    }

    return sortedProducts;
  };

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', e.target.value);

    setSearchParams(params);

    switch (perPage) {
      case 'all':
        setItemsPerPage(sortedProducts.length);
        setCurrentPage(1);
        break;
      default:
        setItemsPerPage(+e.target.value);
        setCurrentPage(1);
    }
  };

  const onPageClick = (page: number) => {
    if (page !== 0 && page !== pageNumbers.length + 1) {
      setCurrentPage(page);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setProductsSortedBy(sortedProducts);
  }, [category, sort, perPage]);

  return (
    <>
      {pagination && (
        <SortOptions
          handlePerPage={handlePerPage}
          handleSortBy={handleSortBy}
          sort={sort}
          perPage={perPage}
        />
      )}
      <article className="productGrid">
        {productsSortedBy.slice(fromIndex, toIndex).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={false}
          />
        ))}
        {pagination && (
          <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            onPageClick={onPageClick}
          />
        )}
      </article>
    </>
  );
};
