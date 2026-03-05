import type { CartItem } from '@/types/Book';
import { TYPOGRAPHY } from '@/constants/typography';

const VISIBLE_THUMBNAIL_COUNT = 3;

interface OrderItemThumbnailsProps {
  items: CartItem[];
}

export const OrderItemThumbnails = ({ items }: OrderItemThumbnailsProps) => {
  const visibleItems = items.slice(0, VISIBLE_THUMBNAIL_COUNT);
  const remainingCount = items.length - VISIBLE_THUMBNAIL_COUNT;

  return (
    <div className="flex -space-x-3">
      {visibleItems.map((item, index) => (
        <img
          key={item.id}
          src={item.images[0]}
          alt={item.name}
          className="w-10 h-14 object-cover rounded-sm border-2 border-background"
          style={{ zIndex: 10 - index }}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className="w-10 h-14 rounded-sm border-2 border-background bg-muted flex items-center justify-center"
          style={{ zIndex: 10 - VISIBLE_THUMBNAIL_COUNT }}
        >
          <span className={`${TYPOGRAPHY.small} text-muted-foreground`}>
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};
