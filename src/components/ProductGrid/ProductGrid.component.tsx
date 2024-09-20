import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../base/ProductCard/ProductCard.component';
import { ProductSummary } from '../../types/ProductSummary';
import { getPageNumbers } from '../../utils/getPageNumbers';
import { Pagination } from '../Pagination/Pagination.component';
import { SortOptions } from '../SortOptions/SortOptions.component';
import { useSearchParams } from 'react-router-dom';

type Props = {
  productsArray: ProductSummary[];
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

export const ProductGrid: React.FC<Props> = ({ productsArray, pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductSummary[]>([
    ...productsArray,
  ]);
  const sort = searchParams.get('sort') || '';
  const perPage = +(searchParams.get('perPage') || products.length);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = useMemo(
    () => getPageNumbers(products.length, perPage),
    [products, perPage],
  );
  const handleSortChange = () => {
    const sortedProducts = [...productsArray];

    switch (sort) {
      case 'age':
        setProducts(sortedProducts.sort((a, b) => b.year - a.year));
        break;
      case 'title':
        setProducts(
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name)),
        );
        break;
      case 'price':
        setProducts(sortedProducts.sort((a, b) => a.price - b.price));
        break;
      default:
        setProducts(sortedProducts.sort((a, b) => b.year - a.year));
    }
  };

  const onPageClick = (page: number) => {
    if (page !== 0 && page !== pageNumbers.length + 1) {
      setCurrentPage(page);
    }
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', e.target.value);
    }

    setSearchParams(params);
  };

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', e.target.value);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    handleSortChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsArray, sort]);

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
        {getVisibleProducts(products, currentPage, perPage).map(product => (
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
