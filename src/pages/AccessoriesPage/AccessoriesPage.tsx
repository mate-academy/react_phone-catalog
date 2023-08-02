import React from 'react';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

import './AccessoriesPage.scss';

type Props = {
  accessories: Product[];
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => (
  <div className="AccessoriesPage">
    <div className="container">
      <div className="AccessoriesPage__content">
        <Breadcrumbs />
        <BackButton />

        {accessories.length === 0 ? (
          <NoResults category="Accessories" />
        ) : (
          <>
            <h1 className="AccessoriesPage__title">Accessories</h1>
            <div className="AccessoriesPage__list" data-cy="productList">
              {accessories.map((accessory) => (
                <ProductCard product={accessory} key={accessory.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
