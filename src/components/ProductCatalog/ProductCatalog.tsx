import React, { useEffect } from 'react';
import './ProductCatalog.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../types/Product';
import { ProductFilter } from '../ProductFilter';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { useLocation, useSearchParams } from 'react-router-dom';
import { sortProducts } from '../../utils/productHelper';

//TODO: instead of using products we could use category as a prop
//      and use category for useProducts hook that return {data, isLoading}
type Props = {
  title: string;
  products: Product[];
  showFilter?: boolean;
  showPagination?: boolean;
};

export const ProductCatalog: React.FC<Props> = ({
  title,
  products,
  showFilter = true,
  showPagination = true,
}) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const sortField = queryParams?.get('sort') || 'age';
  const currentPage = Number(queryParams?.get('page')) || 1;
  const itemsPerPage = Number(queryParams?.get('perPage')) || products.length;
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set('perPage', e.target.value);
    setQueryParams(params);
  };

  const handleSortField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set('sort', e.target.value);
    setQueryParams(params);
  };

  const prdcts = sortProducts(products, sortField);
  const currentItems = prdcts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="product-catalog">
      <div className="container container--with-paddings">
        <Breadcrumbs />
        <h1 className="product__title">{title}</h1>

        <p className="product__count">{`${products.length} models`}</p>

        {showFilter && (
          <ProductFilter
            itemsPerPage={itemsPerPage}
            handlePerChange={handlePerChange}
            sortField={sortField}
            handleSortField={handleSortField}
          />
        )}

        <div className="product__container">
          {currentItems.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                fullPrice={true}
                basePath={`../${product.category}/`}
              />
            );
          })}
        </div>

        {showPagination && (
          <Pagination
            total={products.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};
