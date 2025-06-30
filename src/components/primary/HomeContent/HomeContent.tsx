import { Category } from '../../secondary/HomePageComponents/category';
import { HotPrice } from '../../secondary/HomePageComponents/HotPrice';
import { Header } from '../../secondary/HomePageComponents/Header';
import { Brand } from '../../secondary/HomePageComponents/Brand';
import { getPhonesData } from '../../../api/ProductApi';
import { ErrorBlock } from '../../secondary/messageError';
import { Product } from '../../../types/Product';
import { useEffect, useState } from 'react';
import { Spiner } from '../../secondary/spiner';

export const HomeContent = () => {
  const [initialList, setInitialList] = useState<Product[]>([]);
  const [hasError, SetHasError] = useState<boolean>(false);

  useEffect(() => {
    getPhonesData('phones.json')
      .then(response => {
        setInitialList(response);
      })
      .catch(() => {
        SetHasError(true);
      });
  }, []);

  if (initialList.length === 0) {
    return <Spiner />;
  }

  return (
    <>
      {hasError ? (
        <ErrorBlock />
      ) : (
        <div>
          <Header />
          <Brand phones={initialList} />
          <Category />
          <HotPrice phones={initialList} />
        </div>
      )}
    </>
  );
};
