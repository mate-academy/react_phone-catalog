import React, { useEffect, useState } from 'react';
import productsFromServer from '../../../../../public/api/products.json';
import { Catalog } from '../catalog/catalog';
import { Loader } from '../../../shared/Loader';
import { Products } from '../../../../types';
import { ErrorMessage } from '../../../shared/errorImport/errorimport';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const product = [...productsFromServer].filter(
        p => p.category === 'phones',
      );

      if (product.length === 0) {
        setHasError(true);
      } else {
        setPhones(product);
      }

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  const content = hasError ? (
    <ErrorMessage />
  ) : (
    <Catalog title={'Mobile fones'} products={phones} />
  );

  return <>{isLoading ? <Loader /> : content}</>;
};
