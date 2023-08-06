import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { NoSearchResults }
  from '../../components/NoSearchResults/NoSearchResults';

import './TabletsPage.scss';

type Props = {
  tablets: Product[];
};

export const TabletsPage: React.FC<Props> = React.memo(({ tablets }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredTablets = useMemo(() => {
    return tablets.filter(tablet => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = tablet.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [tablets, query]);

  return (
    <div className="TabletsPage">
      <div className="container">
        <div className="TabletsPage__content">
          {!filteredTablets.length && query && (
            <NoSearchResults />
          )}

          {!filteredTablets.length && !query ? (
            <NoResults category="Tablets" />
          ) : filteredTablets.length > 0 && (
            <div className="TabletsPage__content">
              <Breadcrumbs />
              <BackButton />

              <h1 className="TabletsPage__title">Tablets</h1>

              <div className="TabletsPage__list" data-cy="productList">
                {filteredTablets.map((tablet) => (
                  <ProductCard product={tablet} key={tablet.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
