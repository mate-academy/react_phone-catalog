import type { Book } from '@/types/Book';
import { getPaperBooks, getKindleBooks, getAudioBooks } from './booksAPI';

export type SortOption = 'alphabetically' | 'cheapest' | 'newest';
export type BookTypeOption = 'kindle' | 'paperback' | 'audiobook' | null;
export type LanguageOption = string | null;

export const getBooks = async (
  language: LanguageOption = null,
  category: string | null = null,
  bookType: BookTypeOption = null,
  sortBy: SortOption = 'newest',
) => {
  let books: Book[] = [];

  if (bookType === 'paperback') {
    books = await getPaperBooks();
  } else if (bookType === 'kindle') {
    books = await getKindleBooks();
  } else if (bookType === 'audiobook') {
    books = await getAudioBooks();
  } else {
    const [paper, kindle, audio] = await Promise.all([
      getPaperBooks(),
      getKindleBooks(),
      getAudioBooks(),
    ]);
    books = [...paper, ...kindle, ...audio];
  }

  if (language) {
    books = books.filter((b) => b.lang === language);
  }

  if (category) {
    books = books.filter((b) => b.category?.includes(category));
  }

  switch (sortBy) {
    case 'alphabetically':
      books.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
    default:
      books.sort((a, b) => b.publicationYear - a.publicationYear);
      break;
  }

  return books;
};
