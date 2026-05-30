import { useEffect, useState } from 'react';
import { PhoneDetails } from '../types/PhoneDetails';
import { getPhones } from '../api/categories';

export const useVariantsByNamespace = (namespaceId?: string) => {
  const [variants, setVariants] = useState<PhoneDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadVariants = async () => {
      if (!namespaceId) {
        return;
      }

      try {
        const data: PhoneDetails[] = await getPhones();
        const filtered = data.filter(p => p.namespaceId === namespaceId);

        setVariants(filtered);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadVariants();
  }, [namespaceId]);

  return { variants, loading, error };
};
