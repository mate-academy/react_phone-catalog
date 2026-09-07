import { useEffect, useState } from 'react';
import { PhoneDetails } from '../types/PhoneDetails';
import { getPhones } from '../api/categories';

export const usePhoneDetails = (itemId: string | undefined) => {
  const [phoneDetails, setPhoneDetails] = useState<PhoneDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!itemId) {
      setPhoneDetails(null);

      return;
    }

    const loadDetails = async () => {
      try {
        const data: PhoneDetails[] = await getPhones();
        const found = data.find(phone => phone.id === itemId);

        setPhoneDetails(found || null);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [itemId]);

  return { phoneDetails, loading, error };
};
