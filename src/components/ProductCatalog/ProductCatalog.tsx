import React from 'react';
import './ProductCatalog.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../types/Product';
import { ProductFilter } from '../ProductFilter';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  products: Product[];
};

export const ProductCatalog: React.FC<Props> = ({ title, products }) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const currentPage = Number(queryParams?.get('page')) || 1;
  const itemsPerPage =
    Number(queryParams?.get('itemsCount')) || products.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams(`itemsCount=${e.target.value}`);
  };

  return (
    <div className="product-catalog">
      <div className="container container--with-paddings">
        <Breadcrumbs />
        <h1 className="product__title">{title}</h1>

        <p className="product__count">{`${products.length} models`}</p>
        <ProductFilter
          handlePerChange={handlePerChange}
          itemsPerPage={itemsPerPage}
        />

        <div className="product__container">
          {currentItems.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                fullPrice={true}
              />
            );
          })}
        </div>

        <Pagination
          total={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
