import './Catalog.scss';
import React from 'react';
import { ProductItem } from '../types/Phone';
import { PaginationCatalog } from '../PaginationCatalog';
import { Product } from '../Product';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

interface Props {
  filteredItemsInPage: ProductItem[];
  filteredItems: ProductItem[];
  loading: boolean;
}

export const Catalog: React.FC<Props> = ({
  filteredItemsInPage,
  filteredItems,
  loading,
}) => {
  return (
    <div className="catalog-container">
      {loading ? (
        <Loader /> // тут показується скелетон
      ) : (
        <>
          <div className="catalog-grid">
            {filteredItemsInPage.map(product => (
              <Link to={product.itemId} key={product.id} className="card">
                <Product product={product} />
              </Link>
            ))}
          </div>
          <PaginationCatalog products={filteredItems} />
        </>
      )}
    </div>
  );
};
