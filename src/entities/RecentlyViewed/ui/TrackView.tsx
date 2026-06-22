'use client';

import { useEffect } from 'react';

import { Product } from '@/entities/Product';
import { useRecentlyViewedStore } from '@/entities/RecentlyViewed';

interface TrackViewProps {
  product: Product;
}

export const TrackView = ({ product }: TrackViewProps) => {
  const addItem = useRecentlyViewedStore((s) => s.addItem);

  useEffect(() => {
    addItem(product);
  }, [addItem, product, product.itemId]);

  return null;
};
