import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { Book } from './../types/Book';
import { getBooks } from '@/services/bookService';
import type { LanguageOption } from '@/types/LanguageOption';

interface BooksContextType {
  books: Book[];
  newBooks: Book[];
  suggestedBooks: Book[];
  isLoading: boolean;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  favIconRef: React.RefObject<HTMLDivElement | null>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const cartIconRef = useRef<HTMLDivElement>(null);
  const favIconRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language as LanguageOption;

  const results = useQueries({
    queries: [
      {
        queryKey: ['books', 'paperback', currentLang],
        queryFn: () => getBooks(currentLang, null, 'paperback', 'newest'),
      },
      {
        queryKey: ['books', 'kindle', currentLang],
        queryFn: () => getBooks(currentLang, null, 'kindle', 'newest'),
      },
      {
        queryKey: ['books', 'audiobook', currentLang],
        queryFn: () => getBooks(currentLang, null, 'audiobook', 'newest'),
      },
    ],
  });

  const books = results.flatMap((r) => r.data ?? []);
  const isLoading = results.some((r) => r.isLoading);

  const newBooks = useMemo(() => {
    return [...books].sort((a, b) => b.publicationYear - a.publicationYear);
  }, [books]);

  const suggestedBooks = useMemo(() => {
    return [...books].sort((a, b) => a.author.localeCompare(b.author));
  }, [books]);

  return (
    <BooksContext.Provider
      value={{
        books,
        newBooks,
        suggestedBooks,
        isLoading,
        cartIconRef,
        favIconRef,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBooks must be used within BooksProvider');
  return context;
};
