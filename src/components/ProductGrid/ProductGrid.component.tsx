import { useEffect, useMemo, useState } from 'react';
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
function getVisibleProducts(
  products: ProductSummary[],
  page: number,
  perPage: number,
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return products.slice(start, end);
}

export const ProductGrid: React.FC<Props> = ({ category, pagination }) => {
  const [sort, setSort] = useState('age');
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [perPage, setPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = useMemo(
    () => getPageNumbers(products.length, perPage),
    [products, perPage],
  );
  const handleSortChange = () => {
    switch (sort) {
      case 'age':
        setProducts(category.products.sort((a, b) => b.year - a.year));
        break;
      case 'title':
        setProducts(
          category.products.sort((a, b) => b.name.localeCompare(a.name)),
        );
        break;
      case 'price':
        setProducts(category.products.sort((a, b) => b.price - a.price));
        break;
      default:
        setProducts(category.products.sort((a, b) => b.year - a.year));
    }
  };

  const onPageClick = (page: number) => {
    if (page !== 0 && page !== pageNumbers.length + 1) {
      setCurrentPage(page);
    }
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'all') {
      setPerPage(products.length);
    } else {
      setPerPage(+e.target.value);
    }
  };

  useEffect(() => {
    handleSortChange();
  }, [category, sort]);

  return (
    <>
      {pagination && (
        <SortOptions
          handlePerPage={handlePerPage}
          handleSortBy={handleSortBy}
          sort={sort}
        />
      )}
      <article className="productGrid">
        {getVisibleProducts(category.products, currentPage, perPage).map(
          product => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount={false}
            />
          ),
        )}
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
