import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import './AccessoriesPage.scss';
import { NoResults } from '../../components/NoResults/NoResults';

type Props = {
  accessories: Product[];
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => {
  return (
    <div className="AccessoriesPage">
      <div className="container">
        {accessories.length === 0 ? (
          <NoResults category="Accessories" />
        ) : (
          <div className="AccessoriesPage__content">
            <h1 className="AccessoriesPage__title">Accessories</h1>
            <div className="AccessoriesPage__list" data-cy="productList">
              {accessories.map((accessory) => (
                <ProductCard product={accessory} key={accessory.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
