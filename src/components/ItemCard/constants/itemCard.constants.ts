import type { BookType } from '../types/itemCard.types';

export const DEFAULT_CATEGORY = 'General';
export const MAX_VISIBLE_CATEGORIES = 6;
export const NOT_FOUND_ROUTE = '*';

export const BOOK_TYPE_ROUTE: Record<BookType, string> = {
  paperback: 'paper',
  kindle: 'kindle',
  audiobook: 'audiobook',
};

export const BOOK_TYPE_DISPLAY_NAME: Record<BookType, string> = {
  paperback: 'Paper Books',
  kindle: 'Kindle',
  audiobook: 'Audiobook',
};

export const LANGUAGE_LABEL: Record<string, string> = {
  uk: 'УКР',
  en: 'ENG',
};
