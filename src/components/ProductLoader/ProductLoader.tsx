import { useEffect } from 'react';
import { init } from '../../store/products/productsSlice';
import { useAppDispatch } from '../../store/hooks';

export const ProductLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return null;
};
