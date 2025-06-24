import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneDetails } from '../types/PhoneDetails';
import { getAccessories, getPhones, getTablets } from '../api/categories';

export const useProductDetails = (productId?: string) => {
  const { category } = useParams();
  const [productDetails, setProductDetails] = useState<PhoneDetails | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      if (!productId || !category) {
        return;
      }

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

        if (found) {
          setProductDetails(found);
        }
      } catch (error) {
        /* eslint-disable no-console */
        console.error('❌ Failed to fetch product details:', error);
      }
    };

    load();
  }, [productId, category]);

  return { productDetails };
};
