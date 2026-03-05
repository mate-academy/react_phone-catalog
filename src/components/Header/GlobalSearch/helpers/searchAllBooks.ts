import type { Book } from '@/types/Book.ts';
import { client } from '../../../../services/fetchClient.ts';

export const searchAllBooks = async (query: string): Promise<Book[]> => {
  if (!query.trim()) return [];

  const [paper, kindle, audio] = await Promise.all([
    client.get<Book[]>('paperback'),
    client.get<Book[]>('kindle'),
    client.get<Book[]>('audiobook'),
  ]);

  const allBooks = [...paper, ...kindle, ...audio];
  const lowQuery = query.toLowerCase();

  return allBooks.filter(
    (book) =>
      book.name.toLowerCase().includes(lowQuery) ||
      book.author.toLowerCase().includes(lowQuery),
  );
};
