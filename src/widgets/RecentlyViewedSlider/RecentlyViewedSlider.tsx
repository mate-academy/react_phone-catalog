'use client';

import { useRecentlyViewedStore } from '@/entities/RecentlyViewed';
import { ProductsSlider } from '@/widgets/ProductsSlider';

interface RecentlyViewedSliderProps {
  currentItemId?: string;
}

export const RecentlyViewedSlider = ({
  currentItemId,
}: RecentlyViewedSliderProps) => {
  const items = useRecentlyViewedStore((s) => s.items);

  const filtered = currentItemId
    ? items.filter((p) => p.itemId !== currentItemId)
    : items;

  if (!filtered.length) return null;

  return <ProductsSlider titleKey="recentlyViewed" products={filtered} />;
};
