import type { Book } from '@/types/Book';
import { client } from '@/services/fetchClient';
import type { BookType } from '../types/itemCard.types';

export const getBookAndVariants = async (
  type: BookType,
  slug: string,
): Promise<{ current: Book; variants: Book[] }> => {
  const books = await client.get<Book[]>(type);

  const current = books.find((book) => book.slug === slug);
  if (!current) {
    throw new Error('Book not found');
  }

  const variants = books.filter(
    (book) => book.namespaceId === current.namespaceId,
  );

  return { current, variants };
};
