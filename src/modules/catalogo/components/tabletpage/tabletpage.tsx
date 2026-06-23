import React, { useEffect, useState } from 'react';
import productFromServer from '../../../../../public/api/products.json';
import { Catalog } from '../catalog/catalog';
import { Products } from '../../../../types';
import { Loader } from '../../../shared/Loader';
import { ErrorMessage } from '../../../shared/errorImport/errorimport';

export const TabletPage: React.FC = () => {
  const [tablets, setTablets] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const product = [...productFromServer].filter(
        p => p.category === 'tablets',
      );

      if (product.length === 0) {
        setHasError(true);
      } else {
        setTablets(product);
      }

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  const content = hasError ? (
    <ErrorMessage />
  ) : (
    <Catalog title={'tablets'} products={tablets} />
  );

  return <>{isLoading ? <Loader /> : content}</>;
};
