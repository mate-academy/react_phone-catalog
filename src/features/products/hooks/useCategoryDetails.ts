import { useQuery } from '@tanstack/react-query';
import { fetchPhoneDetails } from '@/api/phoneDetails';
import { fetchTabletDetails } from '@/api/tabletDetails';
import { fetchAccessoriesDetails } from '@/api/accessoriesDetails';
import { QUERY_KEYS } from '@/api/queryKeys';

export const usePhoneDetails = () =>
  useQuery({
    queryKey: QUERY_KEYS.phones,
    queryFn: fetchPhoneDetails,
    staleTime: Infinity,
  });

export const useTabletDetails = () =>
  useQuery({
    queryKey: QUERY_KEYS.tablets,
    queryFn: fetchTabletDetails,
    staleTime: Infinity,
  });

export const useAccessoriesDetails = () =>
  useQuery({
    queryKey: QUERY_KEYS.accessories,
    queryFn: fetchAccessoriesDetails,
    staleTime: Infinity,
  });

export const useAllCategoryDetails = () => {
  const phones = usePhoneDetails();
  const tablets = useTabletDetails();
  const accessories = useAccessoriesDetails();

  return {
    counts: {
      phones: phones.data?.length ?? 0,
      tablets: tablets.data?.length ?? 0,
      accessories: accessories.data?.length ?? 0,
    },
    isLoading: phones.isLoading || tablets.isLoading || accessories.isLoading,
  };
};
