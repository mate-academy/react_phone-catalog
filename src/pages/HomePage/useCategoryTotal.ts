import { useEffect, useState } from 'react';
import { ProductCategory } from '../../types/ProductCategory';
import { AppErrors } from '../../types/AppErrors';
import { getCachedProducts } from '../../utils/hooks/API/getCachedProducts';
import { ApiError } from '../../services/Errors';
import { cachesKey } from '../../utils/caches/constants';

export const useCategoryTotal = () => {
  const [totalTablets, setTotalTablets] = useState(0);
  const [totalPhones, setTotalPhones] = useState(0);
  const [totalAccessories, setTotalAccessories] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);

  useEffect(() => {
    setError(null);

    const cashheKey = cachesKey.categoriesTotal;

    getCachedProducts(cashheKey)
      .then(({ items }) => {
        const tablets = items.filter(
          item => item.category === ProductCategory.tablets,
        );
        const phones = items.filter(
          item => item.category === ProductCategory.phones,
        );
        const accessories = items.filter(
          item => item.category === ProductCategory.accessories,
        );

        setTotalTablets(tablets.length);
        setTotalPhones(phones.length);
        setTotalAccessories(accessories.length);
      })
      .catch(errorData => {
        if (errorData instanceof ApiError) {
          setError(errorData.code);
        } else {
          setError('UNKNOWN_ERROR');
        }
      });
  }, []);

  return { totalTablets, totalPhones, totalAccessories, error };
};
