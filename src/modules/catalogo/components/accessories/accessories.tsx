import React, { useEffect, useState } from 'react';
import { Catalog } from '../catalog/catalog';
import productFromServer from '../../../../../public/api/products.json';
import { Products } from '../../../../types';
import { Loader } from '../../../shared/Loader';
import { ErrorMessage } from '../../../shared/errorImport/errorimport';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const product = [...productFromServer].filter(
        p => p.category === 'accessories',
      );

      if (product.length === 0) {
        setHasError(true);
      } else {
        setAccessories(product);
      }

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  const content = hasError ? (
    <ErrorMessage />
  ) : (
    <Catalog title={'accessories'} products={accessories} />
  );

  return <>{isLoading ? <Loader /> : content}</>;
};
