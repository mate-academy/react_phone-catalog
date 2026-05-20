import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  CollectionReference,
  Query,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import type { Book } from '@/types/Book';
import type { LanguageOption } from '@/types/LanguageOption';

export type SortOption = 'alphabetically' | 'cheapest' | 'newest';
export type BookTypeOption = 'kindle' | 'paperback' | 'audiobook' | null;

const booksCollection = collection(
  firestore,
  'books',
) as CollectionReference<Book>;

export const getBooks = async (
  language: LanguageOption = null,
  category: string | null = null,
  bookType: BookTypeOption = null,
  sortBy: SortOption = 'newest',
) => {
  try {
    let booksQuery: Query<Book> = query(booksCollection);

    if (language) {
      booksQuery = query(booksQuery, where('lang', '==', language));
    }

    if (bookType) {
      booksQuery = query(booksQuery, where('type', '==', bookType));
    }

    if (category) {
      booksQuery = query(
        booksQuery,
        where('category', 'array-contains', category),
      );
    }

    switch (sortBy) {
      case 'alphabetically':
        booksQuery = query(booksQuery, orderBy('name', 'asc'));
        break;
      case 'cheapest':
        booksQuery = query(booksQuery, orderBy('finalPrice', 'asc'));
        break;
      case 'newest':
      default:
        booksQuery = query(booksQuery, orderBy('publicationYear', 'desc'));
        break;
    }

    const querySnapshot = await getDocs(booksQuery);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Помилка Firestore:', error);
    throw error;
  }
};
