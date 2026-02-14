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

  const sort = searchParams.get('sort') || '';

  const perPageFromUrl = searchParams.get('perPage') || '';
  const [perPage, setPerPage] = useState(
    perPageFromUrl ? parseInt(perPageFromUrl) : products.length,
  );

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

  const handleSortBy = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);

    setSearchParams(params);
  };

  const handlePerPageChange = (val: string) => {
    const value = val === 'all' ? prod.length : parseInt(val);

    const params = new URLSearchParams(searchParams);

    setPerPage(value);
    setCurrentPage(1);

    if (value === prod.length) {
      params.delete('perPage');
    } else {
      params.set('perPage', value.toString());
    }

    params.delete('page');
    setSearchParams(params);
  };

  const totalPages = Math.ceil(prod.length / perPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    setCurrentPage(page);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    if (!params.has('perPage')) {
      params.set('perPage', perPage.toString());
    }

    setSearchParams(params);
  };

  useEffect(() => {
    handleSortChange();
    const perPageFromU = searchParams.get('perPage');

    if (!perPageFromU) {
      setPerPage(products.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, sort, perPage, searchParams]);

  return (
    <>
      <SortOptions
        handleSortBy={handleSortBy}
        sort={sort}
        handlePerPageChange={handlePerPageChange}
        perPage={perPage}
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
