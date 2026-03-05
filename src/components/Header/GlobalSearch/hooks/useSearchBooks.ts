import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { GroupedResults } from '../search.types';
import { searchAllBooks } from '@/components/Header/GlobalSearch/helpers/searchAllBooks.ts';
import { booksQueryKeys } from '@/services/booksAPI';
import type { Book } from '@/types/Book';

export const useSearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQuery<Book[]>({
    queryKey: booksQueryKeys.search(debouncedTerm),
    queryFn: () => searchAllBooks(debouncedTerm),
    enabled: !!debouncedTerm.trim(),
    placeholderData: (previousData) => previousData,
  });

  const groupedResults = useMemo<GroupedResults>(() => {
    const query = debouncedTerm.toLowerCase().trim();

    if (!query || results.length === 0) {
      return { authors: [], publishers: [], titles: [] };
    }

    const allMatchedAuthors = results.filter((book) =>
      book.author.toLowerCase().includes(query),
    );
    const authors = Array.from(
      new Map(allMatchedAuthors.map((book) => [book.author, book])).values(),
    );

    const allMatchedPublishers = results.filter(
      (book) =>
        book.publication?.toLowerCase().includes(query) &&
        !authors.some((author) => author.id === book.id),
    );
    const publishers = Array.from(
      new Map(
        allMatchedPublishers.map((book) => [book.publication, book]),
      ).values(),
    );

    const titles = results.filter(
      (book) =>
        book.name.toLowerCase().includes(query) &&
        !authors.some((author) => author.id === book.id) &&
        !publishers.some((publisher) => publisher.id === book.id),
    );

    return { authors, publishers, titles };
  }, [results, debouncedTerm]);

  const isTyping = searchTerm !== debouncedTerm && searchTerm.length > 0;
  const isSearching = isLoading || isFetching;

  return {
    searchTerm,
    setSearchTerm,
    results,
    groupedResults,
    loading: isSearching || isTyping,
  };
};
