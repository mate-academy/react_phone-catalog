import { useEffect, useState } from 'react';
import { getProducts } from '../services/getProducts';
import { getPromoProducts } from '../services/getPromoProducts';
import { Product } from '../types/Product';

type PromoProducts = Record<string, Product[]>;

export function useLoadPromoProducts(
  init: PromoProducts,
) {
  const [promoProducts, setPromoProducts] = useState<PromoProducts>(init);
  const [isLoadingPromoProducts, setIsLoadingPromoProducts] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [promoErrorMessage, setPromoErrorMessage] = useState('');

  const loadPromoProducts = async () => {
    try {
      setIsLoadingPromoProducts(true);

      const productsFromServer = await getProducts();
      const sortedPromoProducts: PromoProducts = { ...promoProducts };

      Object.keys(promoProducts).forEach(key => {
        sortedPromoProducts[key] = getPromoProducts[key](productsFromServer);
      });

      setPromoProducts(sortedPromoProducts);
    } catch {
      setHasError(true);
      setPromoErrorMessage('Error occured while loading promo products');
    } finally {
      setIsLoadingPromoProducts(false);
    }
  };

  useEffect(() => {
    loadPromoProducts();
  }, []);

  return [
    promoProducts,
    isLoadingPromoProducts,
    hasError,
    promoErrorMessage,
    setPromoErrorMessage,
  ] as const;
}
