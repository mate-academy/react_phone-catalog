import React from 'react';
import type { Book } from '@/types/Book';
import type { BookSpecification } from '../types/itemCard.types';
import { formatListeningLength } from '../helpers/formatListeningLength';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTranslation } from 'react-i18next';

interface ItemCardCharacteristicsProps {
  book: Book;
}

export const ItemCardCharacteristics: React.FC<
  ItemCardCharacteristicsProps
> = ({ book }) => {
  const { t } = useTranslation();

  const specifications: BookSpecification[] = [
    { label: t('bookDetails.author'), value: book.author },
    { label: t('bookDetails.coverType'), value: book.coverType },
    { label: t('bookDetails.numberOfPages'), value: book.numberOfPages },
    { label: t('bookDetails.publicationYear'), value: book.publicationYear },
    { label: t('bookDetails.publication'), value: book.publication },
    { label: t('bookDetails.format'), value: book.format },
    {
      label: t('bookDetails.duration'),
      value:
        book.listeningLength ?
          formatListeningLength(book.listeningLength, t)
        : null,
    },
    { label: t('bookDetails.narrator'), value: book.narrator },
    {
      label: t('bookDetails.language'),
      value: book.lang === 'uk' ? t('ui.ukrainian') : t('ui.english'),
    },
  ];

  const filteredSpecifications = specifications.filter(
    (specification) => specification.value != null,
  );

  return (
    <section className="w-full max-w-160 mx-auto lg:mx-0">
      <h2 className={`${TYPOGRAPHY.h2} text-foreground mb-4`}>
        {t('bookDetails.characteristics')}
      </h2>

      <div className="border-t border-border">
        {filteredSpecifications.map((specification, index) => (
          <div
            key={specification.label}
            className={`flex justify-between py-3 ${
              index !== filteredSpecifications.length - 1 ?
                'border-b border-border'
              : ''
            }`}
          >
            <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {specification.label}
            </span>
            <span
              className={`${TYPOGRAPHY.body} font-medium text-foreground text-right`}
            >
              {specification.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
