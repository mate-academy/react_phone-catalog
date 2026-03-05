import React from 'react';
import type { Book } from '@/types/Book';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTranslation } from 'react-i18next';

interface ItemCardAboutProps {
  book: Book;
}

export const ItemCardAbout: React.FC<ItemCardAboutProps> = ({ book }) => {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-160 mx-auto lg:mx-0">
      <h2 className={`${TYPOGRAPHY.h2} text-foreground dark:text-white mb-4`}>
        {t('bookDetails.about')}
      </h2>

      <div
        className={`border-t border-border pt-4 flex flex-col gap-4 ${TYPOGRAPHY.body} text-foreground dark:text-[#ad9c89]`}
      >
        {book.description.map((paragraph, index) => (
          <p
            key={index}
            className={index === 0 ? 'font-bold' : ''}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};
