import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [item, setItem] = useState<Product | null>(null);

  const load = async () => {
    try {
      const res = await get.product(productId as string);

      setItem(res);
    } catch (e) {
      setItem(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return <div>{item ? item.id : ''}</div>;
};
