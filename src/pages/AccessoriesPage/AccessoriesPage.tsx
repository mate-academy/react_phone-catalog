import React from 'react';

import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';

import './AccessoriesPage.scss';

type Props = {
  accessories: Product[];
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => {
  return (
    <div className="AccessoriesPage">
      <div className="container">
        <div className="AccessoriesPage__content">
          {accessories.length === 0 ? (
            <NoResults category="Accessories" />
          ) : (
            // <div className="AccessoriesPage__content">
            <>
              <h1 className="AccessoriesPage__title">Accessories</h1>
              <div className="AccessoriesPage__list" data-cy="productList">
                {accessories.map((accessory) => (
                  <ProductCard product={accessory} key={accessory.id} />
                ))}
              </div>
            </>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};
