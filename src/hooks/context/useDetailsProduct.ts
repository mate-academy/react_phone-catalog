import { useContext } from 'react';
import { ProductDetailContext } from '../../store/ProviderProductDetails';

export const useDetailsProduct = () => {
  const ctx = useContext(ProductDetailContext);

  if (!ctx) {
    throw new Error('Detail Context Error');
  }
  return ctx;
};
