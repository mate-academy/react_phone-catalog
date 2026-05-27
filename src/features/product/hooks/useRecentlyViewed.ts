import { useEffect } from 'react';
import { recentlyViewedService } from '@/shared/services/RecentlyViewed';

export const useRecentlyViewed = (itemId?: string) => {
  useEffect(() => {
    if (itemId) {
      recentlyViewedService.add(itemId);
    }
  }, [itemId]);
};
