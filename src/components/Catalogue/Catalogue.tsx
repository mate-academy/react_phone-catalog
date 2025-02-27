import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { sortOptions } from '../../utils/sortOptions';
// import { sortOptions } from '../../utils/sortOptions';
import { perPageOptions } from '../../utils/perPageOptions';
import { getVisibleProducts } from '../../services/productHelper';
import { getSearchWith } from '../../services/searchHelper';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Selector } from '../Selector';

import './Catalogue.scss';

const defaultPerPage = perPageOptions[3].value;
const defaultSortField = sortOptions[0].value;
const defaultPage = 1;

type Props = {
  categoryProducts: Product[];
};

export const Catalogue: React.FC<Props> = ({ categoryProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const currentPage = +(searchParams.get('page') || 1) - 1;
  const productsPerPage = +(
    searchParams.get('perPage') || categoryProducts.length
  );
  const sortField = searchParams.get('sort') || defaultSortField;
  const pageCount = Math.ceil(categoryProducts.length / productsPerPage);

  const handleSetNewParams = (
    option: string,
    defaultValue: string,
    param: string,
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (option === defaultValue) {
      newParams.delete(param);
    } else {
      newParams.set(param, option.toString());
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  const handlePerPageChange = (option: string) => {
    handleSetNewParams(option, defaultPerPage, 'perPage');
  };

  const handleSortChange = (option: string) => {
    handleSetNewParams(option, defaultSortField, 'sort');
  };

  const handlePageClick = (data: { selected: number }) => {
    setSearchParams(
      getSearchWith(
        { page: (data.selected + 1).toString() },
        defaultPage.toString(),
        searchParams,
      ),
    );
  };

  const sortedProducts = useMemo(() => {
    return [
      ...categoryProducts.sort((prod1, prod2) => {
        switch (sortField) {
          case 'year':
            return prod2[sortField] - prod1[sortField];

          case 'price':
            return prod1[sortField] - prod2[sortField];

          case 'name':
            return prod1[sortField].localeCompare(prod2[sortField]);

          default:
            return prod2.year - prod1.year;
        }
      }),
    ];
  }, [sortField, categoryProducts]);

  useEffect(() => {
    setVisibleProducts(
      getVisibleProducts(sortedProducts, currentPage, productsPerPage),
    );
  }, [currentPage, productsPerPage, sortField, sortedProducts]);

  return (
    <section className="catalogue">
      <div className="catalogue__selectors">
        <Selector
          label="Sort by"
          options={sortOptions}
          selectedOption={sortField}
          onChangeOption={handleSortChange}
          defaultText={
            sortOptions.find(option => option.value === defaultSortField)
              ?.name || 'Newest'
          }
        />
        <Selector
          label="Items on page"
          options={perPageOptions}
          selectedOption={productsPerPage.toString()}
          onChangeOption={handlePerPageChange}
          defaultText={defaultPerPage}
        />
      </div>
      <div className="catalogue__products">
        {visibleProducts.map(product => (
          <ProductCard product={product} key={product.itemId} />
        ))}
      </div>
      {pageCount > 1 && (
        <Pagination onPageClick={handlePageClick} pageCount={pageCount} />
      )}
    </section>
  );
};
