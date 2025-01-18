import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { SortOptions } from '../SortOptions/SortOptions';
import React, { useEffect, useState } from 'react';
import { PaginationNew } from '../PaginationNew/PaginationNew';

type Props = {
  products: Product[];
};

function getVisibleProducts(
  products: Product[],
  page: number,
  perPage: number,
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return products.slice(start, end);
}

export const CatalogGrid: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prod, setProd] = useState<Product[]>([...products]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(products.length);

  const sort = searchParams.get('sort') || '';

  const handleSortChange = () => {
    const sortedProducts = [...products];

    switch (sort) {
      case 'age':
        setProd(sortedProducts.sort((a, b) => b.year - a.year));
        break;

      case 'title':
        setProd(sortedProducts.sort((a, b) => b.name.localeCompare(a.name)));
        break;

      case 'price':
        setProd(sortedProducts.sort((a, b) => a.price - b.price));
        break;

      default:
        setProd(sortedProducts.sort((a, b) => b.year - a.year));
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

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value =
      e.target.value === 'all' ? prod.length : parseInt(e.target.value);

    setPerPage(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(prod.length / perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleSortChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, sort, perPage]);

  return (
    <>
      <SortOptions
        handleSortBy={handleSortBy}
        sort={sort}
        handlePerPageChange={handlePerPageChange}
      />
      <article className="catalogGrid">
        {getVisibleProducts(prod, currentPage, perPage).map(product => (
          <div className="catalogGrid__card" key={product.id}>
            <ProductCard prod={product} showDiscount={true} />
          </div>
        ))}
      </article>
      {totalPages > 1 && (
        <PaginationNew
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};
