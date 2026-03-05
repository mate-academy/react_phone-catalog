import React from 'react';
import type { Book } from '@/types/Book';
import { AddButton } from '@/components/ui/Buttons/AddButton';
import { HeartButton } from '@/components/ui/Buttons/HeartButton';
import { formatListeningLength } from '../helpers/formatListeningLength';
import { useBookCartActions } from '../hooks/useBookCartActions';
import { MAX_VISIBLE_CATEGORIES } from '../constants/itemCard.constants';
import { TYPOGRAPHY } from '@/constants/typography';
import { LanguageSelector } from './LanguageSelector';
import { QuantitySelector } from './QuantitySelector';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/context/CurrencyContext';

interface ItemCardDetailsProps {
  book: Book;
  bookVariants: Book[];
  onBookChange: (newBook: Book) => void;
}

export const ItemCardDetails: React.FC<ItemCardDetailsProps> = ({
  book,
  bookVariants,
  onBookChange,
}) => {
  const { t } = useTranslation();
  const {
    quantity,
    isInCart,
    isBookFavorite,
    handleToggleCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleFavorite,
  } = useBookCartActions(book);
  const { currency, rate } = useCurrency();

  const bookDetailsData: [string, string | number | null][] = [
    ['bookDetails.author', book.author],
    ['bookDetails.coverType', book.coverType ?? null],
    [
      'bookDetails.duration',
      book.listeningLength != null ?
        formatListeningLength(book.listeningLength, t)
      : null,
    ],
    ['bookDetails.narrator', book.narrator ?? null],
    ['bookDetails.pages', book.numberOfPages ?? null],
    ['bookDetails.year', book.publicationYear],
  ];

  const filteredDetails = bookDetailsData.filter(([, value]) => value !== null);
  const hasCategories = book.category && book.category.length > 0;
  const price = book.priceDiscount ?? book.priceRegular;
  const convertedPrice = currency === 'USD' ? price : Math.round(price * rate);
  const convertedPriceWithoutDiscount =
    currency === 'USD' && book.priceRegular ?
      book.priceRegular
    : Math.round(book.priceRegular * rate);
  const symbol = currency === 'USD' ? '$' : '₴';

  return (
    <div className="w-full max-w-100 mx-auto lg:mx-0 flex flex-col gap-6 text-foreground">
      <div>
        <p className={`${TYPOGRAPHY.h5} text-muted-foreground mb-2`}>
          {t('categories.category')}
        </p>
        {hasCategories && (
          <div className="flex flex-wrap gap-2">
            {book.category!.slice(0, MAX_VISIBLE_CATEGORIES).map((category) => (
              <span
                key={category}
                className={`${TYPOGRAPHY.body} px-3 py-1 border border-border rounded-md text-foreground`}
              >
                {t(`categories.${category.toLowerCase()}`)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <p className={`${TYPOGRAPHY.h5} text-muted-foreground mb-2`}>
          {t('bookDetails.language')}
        </p>
        <div className="mb-4">
          <LanguageSelector
            book={book}
            bookVariants={bookVariants}
            onBookChange={onBookChange}
          />
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-4">
            <p className={`${TYPOGRAPHY.h2} text-foreground`}>
              {symbol}
              {convertedPrice}
            </p>
            {book.priceDiscount && (
              <p
                className={`${TYPOGRAPHY.h3} text-muted-foreground line-through`}
              >
                {symbol}
                {convertedPriceWithoutDiscount}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 w-full overflow-hidden">
            <AddButton
              onClick={handleToggleCart}
              isSelected={isInCart}
              className="cursor-pointer"
            />

            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />

            <HeartButton
              onClick={handleToggleFavorite}
              isSelected={isBookFavorite}
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        {filteredDetails.map(([label, value], index) => (
          <div
            key={label}
            className={`flex justify-between py-2 ${
              index > 0 ? 'border-t border-border' : ''
            }`}
          >
            <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {t(label)}
            </span>
            <span
              className={`${TYPOGRAPHY.body} font-semibold text-foreground`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
