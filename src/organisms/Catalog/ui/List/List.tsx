import { ItemCard } from '@/atoms';
import type { Good } from '@/types';
import { cn } from '@/utils/cn';
import type { Key, ReactNode } from 'react';
import { useMemo } from 'react';
import s from './LongList.module.scss';

type Props<T extends Good> = {
  items: readonly T[];
  itemsOnPage?: number;
  page?: number;
  className?: string;
  discount?: boolean;
  emptyState?: ReactNode;
  renderItem?: (item: T, index: number) => ReactNode;
  getItemKey?: (item: T, index: number) => Key;
};

const List = <T extends Good,>({
  items,
  itemsOnPage = 16,
  page = 1,
  className = '',
  discount = false,
  emptyState = null,
  renderItem,
  getItemKey,
}: Props<T>) => {
  const normalizedItemsOnPage = Math.max(1, Math.floor(itemsOnPage));
  const totalPages = Math.max(1, Math.ceil(items.length / normalizedItemsOnPage));
  const normalizedPage = Math.min(totalPages, Math.max(1, Math.floor(page)));

  const { firstItemIndex, visibleItems } = useMemo(() => {
    const startIndex = (normalizedPage - 1) * normalizedItemsOnPage;
    const endIndex = startIndex + normalizedItemsOnPage;

    return {
      firstItemIndex: startIndex,
      visibleItems: items.slice(startIndex, endIndex),
    };
  }, [items, normalizedItemsOnPage, normalizedPage]);

  if (visibleItems.length === 0) {
    return emptyState ? <div className={cn(s.empty, className)}>{emptyState}</div> : null;
  }

  return (
    <div className={cn(s.list, className)}>
      {visibleItems.map((item, index) => {
        const itemIndex = firstItemIndex + index;
        const key = getItemKey?.(item, itemIndex) ?? item.namespaceId;
        const content = renderItem?.(item, itemIndex) ?? (
          <ItemCard item={item} discount={discount} />
        );

        return (
          <div className={s.list__item} key={key}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default List;
