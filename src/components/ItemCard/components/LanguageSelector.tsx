import React, { useState } from 'react';
import type { Book } from '@/types/Book';
import { LANGUAGE_LABEL } from '../constants/itemCard.constants';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  book: Book;
  bookVariants: Book[];
  onBookChange: (newBook: Book) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  book,
  bookVariants,
  onBookChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(book.lang);

  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === selectedLanguage) return;

    setSelectedLanguage(languageCode);

    const matchingVariant = bookVariants.find(
      (variant) => variant.lang === languageCode,
    );

    if (matchingVariant) {
      onBookChange(matchingVariant);
    }
  };

  return (
    <div className="flex gap-2">
      {book.langAvailable.map((language: string) => {
        const label = LANGUAGE_LABEL[language] ?? language.toUpperCase();
        const isSelected = selectedLanguage === language;

        return (
          <button
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={cn(
              TYPOGRAPHY.buttons,
              'w-11.25 h-8.75 px-0 py-0 rounded-md border cursor-pointer transition-colors',
              isSelected ?
                'bg-foreground text-background border-foreground'
              : 'bg-background text-foreground border-border hover:border-foreground',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
