import type { TFunction } from 'i18next';
import type { Book } from '@/types/Book';
import type React from 'react';

export interface GroupedResults {
  authors: Book[];
  publishers: Book[];
  titles: Book[];
}
export interface SearchActions {
  handleBookChange: (book: Book) => void;
  handleAddToCart: (book: Book, event?: React.MouseEvent) => void;
  handleToggleFavorite: (book: Book, event?: React.MouseEvent) => void;
  handleViewAll: () => void;
  isFavorite: (id: string | number) => boolean;
  isInCart: (id: string | number) => boolean;
}
export interface SearchSectionsProps {
  groupedResults: GroupedResults;
  searchTerm: string;
  actions: SearchActions;
}
export interface SearchDialogContentProps {
  onClose: () => void;
  onSelect?: () => void;
}
export interface SearchTranslations {
  texts: {
    placeholder: string;
    searching: string;
    noResults: string;
  };
  ui: {
    all: string;
    sections: {
      publishers: string;
      authors: string;
      titles: string;
    };
  };
}

export const getSearchTranslations = (t: TFunction): SearchTranslations => ({
  texts: {
    placeholder: t('search.placeholder'),
    searching: t('search.searching'),
    noResults: t('search.noResults'),
  },
  ui: {
    all: t('search.all'),
    sections: {
      publishers: t('search.publishers'),
      authors: t('search.authors'),
      titles: t('search.titles'),
    },
  },
});

export const COMMON_STYLES = {
  viewAllBtn:
    'text-[10px] text-foreground hover:text-black cursor-pointer uppercase tracking-widest flex items-center gap-1 group/all transition-colors font-bold',
  arrow: 'transition-transform group-hover/all:translate-x-0.5',
  itemIconBox:
    'w-10 h-10 bg-card rounded-lg flex items-center justify-center flex-shrink-0',
  sectionTitle: 'text-foreground font-bold text-sm',
  gridWrapper: 'grid grid-cols-1 md:grid-cols-3 gap-3 pt-2',
  cardBase:
    'flex items-center gap-3 bg-card p-3 rounded-xl border border-gray-100 shadow-sm transition-all cursor-pointer hover:bg-gray-50 hover:border-gray-200',
  bookCard:
    'flex gap-4 p-3 rounded-2xl bg-card border border-gray-100 shadow-sm transition-all cursor-pointer group hover:bg-gray-50 hover:border-gray-300',
  bookImageWrapper:
    'w-16 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm flex items-center justify-center border border-gray-100',
};
