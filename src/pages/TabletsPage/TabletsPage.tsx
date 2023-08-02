import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NoResults } from '../../components/NoResults/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

import './TabletsPage.scss';

type Props = {
  tablets: Product[];
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => {
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
        {tablets.length === 0 ? (
          <NoResults category="Tablets" />
        ) : (
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
  );
};
