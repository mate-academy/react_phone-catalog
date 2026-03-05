import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Truck } from 'lucide-react';
import type { Book } from '@/types/Book';
import { AddButton } from '@/components/ui/Buttons/AddButton';
import { HeartButton } from '@/components/ui/Buttons/HeartButton';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import { Icon } from '@/components/ui/icons';
import { useCartFavorites } from '@/context/CartFavoritesContext';
import { animateToTarget } from '@/components/ProductCard/utils/animateToTarget';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { showInfo, showSuccess } from '@/lib/toast';
import { useBooks } from '@/context/BooksContext';
import { useCurrency } from '@/context/CurrencyContext';

type Props = {
  book: Book;
};

export const ProductCard: React.FC<Props> = ({ book }) => {
  const { t } = useTranslation();
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } =
    useCartFavorites();
  const { currency, rate } = useCurrency();

  const cardRef = useRef<HTMLDivElement>(null);

  const isBookInCart = isInCart(book.id);
  const isBookInFavorites = isFavorite(book.id);
  const price = book.priceDiscount ?? book.priceRegular;
  const { cartIconRef, favIconRef } = useBooks();

  const convertedPrice = currency === 'USD' ? price : Math.round(price * rate);

  const convertedPriceWithoutDiscount =
    currency === 'USD' && book.priceRegular ?
      book.priceRegular
    : Math.round(book.priceRegular * rate);

  const symbol = currency === 'USD' ? '$' : '₴';

  const handleAddToCart = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (isBookInCart) {
      removeFromCart(book.id);
      showInfo(t('toast.removedFromCart', { name: book.name }));
    } else {
      addToCart(book);
      showSuccess(t('toast.addedToCart', { name: book.name }));

      animateToTarget({
        sourceEl: event?.currentTarget,
        targetRef: cartIconRef,
        type: 'book',
      });
    }
  };

  const handleToggleFavorite = (
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    toggleFavorite(book);

    if (isBookInFavorites) {
      showInfo(t('toast.removedFromFavorites', { name: book.name }));
    } else {
      showSuccess(t('toast.addedToFavorites', { name: book.name }));

      animateToTarget({
        sourceEl: event?.currentTarget,
        targetRef: favIconRef,
        type: 'heart',
      });
    }
  };

  return (
    <div
      className="relative flex flex-col gap-4 flex-shrink-0 
    w-[214px] h-[400px] p-5 sm:w-[272px] sm:h-[506px] sm:p-8 
    rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
    >
      {book.type === 'audiobook' && (
        <div className="absolute top-8 right-6 w-10 h-10 flex items-center justify-center bg-muted-foreground rounded-full z-10">
          <Icon
            name="headphones"
            className="text-white"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      )}

      <Link
        to={`/item/${book.type}/${book.slug}`}
        className="relative flex-shrink-0 flex items-center justify-center w-full h-[185px] lg:w-[208px] sm:h-[263px]"
      >
        {book.type === 'kindle' ?
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <div className="relative h-full aspect-[3/4]">
              <ImageWithSkeleton
                src="https://ik.imagekit.io/ox4rssyih/img/audiobook/2.webp?updatedAt=1771496288464"
                alt="iPad"
                className="w-full h-full object-contain"
              />

              <ImageWithSkeleton
                src={book.images[0]}
                alt={book.name}
                className="absolute top-[8.7%] left-[10.5%] w-[79.5%] h-[82%] object-cover"
              />
            </div>
          </div>
        : <ImageWithSkeleton
            src={`${book.images[0]}`}
            alt={book.name}
            className="w-full h-full object-contain rounded-md"
          />
        }
      </Link>

      <Link
        to={`/item/${book.type}/${book.slug}`}
        className="flex flex-col gap-2 min-w-0"
      >
        <h5 className={cn(TYPOGRAPHY.h5, 'text-foreground truncate')}>
          {book.name}
        </h5>
        <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground truncate')}>
          {book.author}
        </p>

        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className={cn(TYPOGRAPHY.h3, 'text-foreground')}>
            {symbol}
            {convertedPrice}
          </span>
          {book.priceDiscount && (
            <span
              className={cn(
                TYPOGRAPHY.h4,
                'line-through text-muted-foreground',
              )}
            >
              {symbol}
              {convertedPriceWithoutDiscount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Truck className="text-primary w-4 h-4" />
          <span className={cn(TYPOGRAPHY.buttons, 'text-primary')}>
            {t('ui.inStock')}
          </span>
        </div>
      </Link>

      <div
        ref={cardRef}
        className="mt-auto flex gap-2 w-full"
      >
        <AddButton
          onClick={handleAddToCart}
          isSelected={isBookInCart}
          className="flex-1"
        />
        <HeartButton
          onClick={handleToggleFavorite}
          isSelected={isBookInFavorites}
        />
      </div>
    </div>
  );
};
