import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Book } from '@/types/Book';
import { getBookAndVariants } from '../helpers/getBookAndVariants';
import { NOT_FOUND_ROUTE } from '../constants/itemCard.constants';
import type { BookType } from '../types/itemCard.types';

export const useBookData = (type: BookType) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', type, bookSlug],
    queryFn: () => getBookAndVariants(type, bookSlug!),
    enabled: !!bookSlug,
  });

  useEffect(() => {
    if (isError) navigate(NOT_FOUND_ROUTE, { replace: true });
  }, [isError, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [bookSlug]);

  const book = data?.current ?? null;
  const bookVariants = data?.variants ?? [];

  const handleBookChange = useCallback(
    (newBook: Book) => {
      navigate(`/item/${newBook.type}/${newBook.slug}`);
    },
    [navigate],
  );

  return { book, bookVariants, isLoading, handleBookChange };
};
