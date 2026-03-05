import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getBooks, type SortOption } from '@/services/bookService';
import type { BookTypeOption } from '@/services/bookService';
import type { LanguageOption } from '@/types/LanguageOption';

export const useSortBooks = (bookType: BookTypeOption) => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const currentLang = i18n.language as LanguageOption;

  return useQuery({
    queryKey: ['books', bookType, currentLang, sort],
    queryFn: () => getBooks(currentLang, null, bookType, sort),
  });
};
