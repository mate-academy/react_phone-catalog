import React, { useEffect } from 'react';

import './ListOfProducts.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';

type Props = {
  products: Product[];
  itemsPerPage: string;
};

export const ListOfProducts: React.FC<Props> = ({ products, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const currentPage = Number(searchParams.get("page")) || 0;
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / +itemsPerPage);
  // const startIndex = currentPage * +itemsPerPage;
  // const visibleProducts = products.slice(startIndex, startIndex + (+itemsPerPage));
  const startIndex = (currentPage - 1) * +itemsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + +itemsPerPage,
  );

  const handlePageChange = (selectedPage: number) => {
    const params = new URLSearchParams(searchParams);

    // params.set("page", String(selectedPage));
    params.set('page', String(selectedPage + 1));
    setSearchParams(params);
  };

  return (
    <div className="listOfProducts">
      <div className="listOfProducts__list">
        {visibleProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
