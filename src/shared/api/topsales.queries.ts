import { useQuery } from '@tanstack/react-query';

import { getTopSales } from '@/shared/api/topsales';

export const useTopSales = () => {
  return useQuery({
    queryKey: ['topSales'],
    queryFn: getTopSales,
  });
};
