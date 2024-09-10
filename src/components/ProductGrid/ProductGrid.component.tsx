import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { ProductCard } from '../base/ProductCard/ProductCard.component';
import { ProductSummary } from '../../types/ProductSummary';
import { getPageNumbers } from '../../utils/getPageNumbers';
import { Pagination } from '../Pagination/Pagination.component';
import { SortOptions } from '../SortOptions/SortOptions.component';

type Props = {
  category: Category;
  pagination?: boolean;
};

export const ProductGrid: React.FC<Props> = ({ category, pagination }) => {
  const [productsSortedBy, setProductsSortedBy] = useState<ProductSummary[]>(
    [],
  );
  let sortedProducts = [...category.products];
  const [perPage, setPerPage] = useState<number>(sortedProducts.length);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageNumbers: number[] = getPageNumbers(sortedProducts.length, perPage);
  const currentIndex = pageNumbers.indexOf(currentPage);
  const fromIndex = currentIndex * perPage;
  const toIndex =
    fromIndex + perPage <= sortedProducts.length
      ? fromIndex + perPage
      : sortedProducts.length;

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'newest':
        sortedProducts = sortedProducts.sort((a, b) => b.year - a.year);
        setProductsSortedBy(sortedProducts);
        break;
      case 'alphabetically':
        sortedProducts = sortedProducts.sort((a, b) =>
          b.name.localeCompare(a.name),
        );
        setProductsSortedBy(sortedProducts);
        break;
      case 'cheapest':
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
    switch (e.target.value) {
      case 'all':
        setPerPage(sortedProducts.length);
        setCurrentPage(1);
        break;
      default:
        setPerPage(+e.target.value);
        setCurrentPage(1);
    }
  };

  const onPageClick = (page: number) => {
    if (page !== 0 && page !== pageNumbers.length + 1) {
      setCurrentPage(page);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setProductsSortedBy(sortedProducts), [category]);

  return (
    <>
      {pagination && (
        <SortOptions
          handlePerPage={handlePerPage}
          handleSortBy={handleSortBy}
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
