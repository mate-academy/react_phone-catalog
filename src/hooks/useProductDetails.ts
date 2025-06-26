import { useEffect, useState } from 'react';
import { PhoneDetails } from '../types/PhoneDetails';
import { getAccessories, getPhones, getTablets } from '../api/categories';

export const useProductDetails = (productId?: string, category?: string) => {
  const [productDetails, setProductDetails] = useState<PhoneDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!productId || !category) {
        return;
      }

      setIsLoading(true);

      let data: PhoneDetails[] = [];

      try {
        if (category === 'phones') {
          data = await getPhones();
        } else if (category === 'tablets') {
          data = await getTablets();
        } else if (category === 'accessories') {
          data = await getAccessories();
        }

        const found = data.find(item => item.id === productId);

        setProductDetails(found ?? null);
      } catch (error) {
        /* eslint-disable no-console */
        console.error('❌ Failed to fetch product details:', error);
        setProductDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [productId, category]);

  return { productDetails, isLoading };
};
