import { Building2, User2, BookOpen, ArrowRight } from 'lucide-react';
import { CommandGroup, CommandItem } from '@/components/ui/Command';
import { HeartButton } from '@/components/ui/Buttons';
import { TextHighlighter } from './TextHighlighter';
import { useTranslation } from 'react-i18next';

import {
  COMMON_STYLES,
  getSearchTranslations,
  type SearchSectionsProps,
} from '../search.types';
import type { Book } from '@/types/Book';
import { AddSearchButton } from '@/components/ui/Buttons/AddSearchButton';

export const SearchSections = ({
  groupedResults,
  searchTerm,
  actions,
}: SearchSectionsProps) => {
  const { t } = useTranslation();
  const { ui } = getSearchTranslations(t);

  return (
    <div className="space-y-6">
      {groupedResults.publishers.length > 0 && (
        <CommandGroup
          heading={
            <div className="flex justify-between items-center w-full">
              <span className={COMMON_STYLES.sectionTitle}>
                {ui.sections.publishers}
              </span>
              <button
                className={COMMON_STYLES.viewAllBtn}
                onClick={actions.handleViewAll}
              >
                {ui.all} ({groupedResults.publishers.length})
                <ArrowRight
                  size={12}
                  className={COMMON_STYLES.arrow}
                />
              </button>
            </div>
          }
        >
          <div className={COMMON_STYLES.gridWrapper}>
            {groupedResults.publishers.slice(0, 3).map((pub: Book) => (
              <CommandItem
                key={`pub-${pub.id}`}
                value={`pub-${pub.publication}-${pub.id}`}
                onSelect={() => actions.handleBookChange(pub)}
                className={COMMON_STYLES.cardBase}
              >
                <div className={COMMON_STYLES.itemIconBox}>
                  <Building2
                    size={18}
                    className="text-foreground"
                  />
                </div>
                <span className="text-xs font-bold text-foreground uppercase truncate">
                  {pub.publication}
                </span>
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      )}

      {groupedResults.authors.length > 0 && (
        <CommandGroup
          heading={
            <div className="flex justify-between items-center w-full">
              <span className={COMMON_STYLES.sectionTitle}>
                {ui.sections.authors}
              </span>
              <button
                className={COMMON_STYLES.viewAllBtn}
                onClick={actions.handleViewAll}
              >
                {ui.all} ({groupedResults.authors.length})
                <ArrowRight
                  size={12}
                  className={COMMON_STYLES.arrow}
                />
              </button>
            </div>
          }
        >
          <div className={COMMON_STYLES.gridWrapper}>
            {groupedResults.authors.slice(0, 3).map((book: Book) => (
              <CommandItem
                key={`auth-${book.id}`}
                value={`auth-${book.author}-${book.id}`}
                onSelect={() => actions.handleBookChange(book)}
                className={COMMON_STYLES.cardBase}
              >
                <div className={COMMON_STYLES.itemIconBox}>
                  <User2
                    size={18}
                    className="text-foreground"
                  />
                </div>
                <span className="text-xs font-bold text-foreground truncate">
                  <TextHighlighter
                    text={book.author}
                    query={searchTerm}
                  />
                </span>
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      )}

      {groupedResults.titles.length > 0 && (
        <CommandGroup
          heading={
            <div className="flex justify-between items-center w-full">
              <span className={COMMON_STYLES.sectionTitle}>
                {ui.sections.titles}
              </span>
              <button
                className={COMMON_STYLES.viewAllBtn}
                onClick={actions.handleViewAll}
              >
                {ui.all} ({groupedResults.titles.length})
                <ArrowRight
                  size={12}
                  className={COMMON_STYLES.arrow}
                />
              </button>
            </div>
          }
        >
          <div className="space-y-3 mt-2">
            {groupedResults.titles.slice(0, 4).map((book: Book) => (
              <CommandItem
                key={`title-${book.id}`}
                value={`title-${book.name}-${book.id}`}
                onSelect={() => actions.handleBookChange(book)}
                className={COMMON_STYLES.bookCard}
              >
                <div className={COMMON_STYLES.bookImageWrapper}>
                  {book.images?.[0] ?
                    <img
                      src={book.images[0]}
                      className="w-full h-full object-cover"
                      alt={book.name}
                    />
                  : <BookOpen
                      size={20}
                      className="text-foreground"
                    />
                  }
                </div>

                <div className="flex flex-col justify-between py-0.5 flex-grow">
                  <div>
                    <p className="text-[10px] text-foreground font-medium mb-0.5 uppercase tracking-tighter">
                      {book.author}
                    </p>
                    <h4 className="text-sm text-foreground font-bold leading-tight line-clamp-2">
                      <TextHighlighter
                        text={book.name}
                        query={searchTerm}
                      />
                    </h4>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black text-foreground">
                      {book.priceRegular || book.priceDiscount} грн
                    </span>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 relative z-10"
                    >
                      <AddSearchButton
                        isSelected={actions.isInCart(book.id)}
                        onClick={() => actions.handleAddToCart(book)}
                      ></AddSearchButton>
                      <HeartButton
                        isSelected={actions.isFavorite(book.id)}
                        onClick={() => actions.handleToggleFavorite(book)}
                      />
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      )}
    </div>
  );
};
