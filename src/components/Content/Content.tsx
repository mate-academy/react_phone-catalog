import React from 'react';

import { List } from '../List';
import { Loader } from '../Loader';

import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';

import { Phone } from '../../types/Phone';

type Props = {
  products: Phone[] | null;
  isLoading: boolean;
  title: string;
};

export const Content: React.FC<Props> = ({
  products,
  isLoading,
  title,
}) => (
  <div className="phones page__phones">
    {isLoading && (
      <Loader />
    )}

    {!isLoading && (
      <>
        <Breadcrumbs />

        <h1 className="phones__title">
          {title}
        </h1>

        <p className="phones__count">
          {`${products?.length} models`}
        </p>

        {!products?.length ? (
          <NoResults title={title} />
        ) : (
          <List products={products} />
        )}
      </>
    )}
  </div>
);
