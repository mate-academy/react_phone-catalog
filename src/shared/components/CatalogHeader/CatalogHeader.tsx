import React from 'react';
import { useProducts } from '@/shared/context/ProductsContext';
import { itemsText } from '@/utils';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

import cn from 'classnames';
import './CatalogHeader.scss';

type Props = {
  countProduct: number;
  catalogName: string;
  className?: string;
};
export const CatalogHeader: React.FC<Props> = ({
  countProduct,
  catalogName,

  className,
}) => {
  const isOnline = useOnlineStatus();

  const { isLoading, hasError } = useProducts();

  return (
    <div className={cn('catalog-header', className)}>
      <h1 className="catalog-header__title">{catalogName}</h1>

      {hasError || !isOnline ? null : isLoading ||
        countProduct === undefined ? (
        <div className="catalog-header__count-skeleton"></div>
      ) : (
        <div className="catalog-header__count">
          {countProduct} {itemsText(countProduct)}
        </div>
      )}
    </div>
  );
};
