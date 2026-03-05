import React from 'react';
import { BooksSection } from '@/components/BooksSection';
import { Loader } from '@/components/ui/Loader';
import { useBooks } from '../../context/BooksContext';
import { TYPOGRAPHY } from '@/constants/typography';
import { DEFAULT_CATEGORY } from './constants/itemCard.constants';
import { useBookData } from './hooks/useBookData';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ItemCardAbout } from './components/ItemCardAbout';
import { ItemCardCharacteristics } from './components/ItemCardCharacteristics';
import { ItemCardDetails } from './components/ItemCardDetails';
import { ItemCardGallery } from './components/ItemCardGallery';
import type { BookType } from './types/itemCard.types';
import { useTranslation } from 'react-i18next';

interface ItemCardProps {
  type: BookType;
}

export const ItemCard: React.FC<ItemCardProps> = ({ type }) => {
  const { suggestedBooks } = useBooks();
  const { book, bookVariants, isLoading, handleBookChange } = useBookData(type);
  const { t } = useTranslation();

  const imageUrls = book?.images ?? [];
  const categoryName = book?.category?.[0] ?? DEFAULT_CATEGORY;

  return (
    <Loader isLoading={isLoading || !book}>
      {book && (
        <div className="w-full px-4 pt-14 sm:pt-24 pb-20">
          <article className="mx-auto w-full max-w-287.5 flex flex-col">
            <Breadcrumbs
              type={type}
              category={categoryName}
              bookName={book.name}
            />

            <header className="mb-10">
              <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-2`}>
                {book.name}
              </h1>
              <p
                className={`${TYPOGRAPHY.h4} text-muted-foreground font-medium`}
              >
                {book.author}
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 lg:gap-x-24 mb-20 items-start">
              <ItemCardGallery images={imageUrls} />
              <ItemCardDetails
                book={book}
                bookVariants={bookVariants}
                onBookChange={handleBookChange}
              />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 lg:gap-x-24 mb-20 items-start">
              <ItemCardAbout book={book} />
              <ItemCardCharacteristics book={book} />
            </section>
          </article>

          <BooksSection
            title={t('categories.youMayLike')}
            books={suggestedBooks}
          />
        </div>
      )}
    </Loader>
  );
};
