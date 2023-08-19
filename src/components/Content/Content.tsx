import React from 'react';

import { List } from '../List';
import { Loader } from '../Loader';

import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoSearchResults } from '../NoSearchResults';

import { Phone } from '../../types/Phone';

type Props = {
  products: Phone[] | null;
  isLoading: boolean;
  title: string;
  isNoSearchResults: boolean;
};

export const Content: React.FC<Props> = ({
  products,
  isLoading,
  title,
  isNoSearchResults,
}) => (
  <div className="phones page__phones">
    {isLoading && (
      <Loader />
    )}

    {!isLoading && (
      <>
        <Breadcrumbs name="" />

        <h1 className="phones__title">
          {title}
        </h1>

        <p className="phones__count">
          {`${products?.length} model${products?.length === 1 ? '' : 's'}`}
        </p>

        {!isNoSearchResults && !products?.length && (
          <NoResults title={title} />
        )}

        {!isNoSearchResults && !!products?.length && (
          <List products={products} />
        )}

        {isNoSearchResults && (
          <NoSearchResults title={title} />
        )}
      </>
    )}
  </div>
);
