import React from 'react';

import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';

import './TabletsPage.scss';

type Props = {
  tablets: Product[];
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => (
  <div className="TabletsPage">
    <div className="container">
      {tablets.length === 0 ? (
        <NoResults category="Tablets" />
      ) : (
        <div className="TabletsPage__content">
          <h1 className="TabletsPage__title">Tablets</h1>

          <div className="TabletsPage__list" data-cy="productList">
            {tablets.map((tablet) => (
              <ProductCard product={tablet} key={tablet.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
