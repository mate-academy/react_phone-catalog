import type { Book } from '@/types/Book';
import { client } from './fetchClient';

export const booksQueryKeys = {
  paper: ['books', 'paperback'] as const,
  kindle: ['books', 'kindle'] as const,
  audio: ['books', 'audiobook'] as const,
  search: (query: string) => ['books', 'search', query] as const,
};

export const getPaperBooks = () => client.get<Book[]>('paperback');
export const getKindleBooks = () => client.get<Book[]>('kindle');
export const getAudioBooks = () => client.get<Book[]>('audiobook');
