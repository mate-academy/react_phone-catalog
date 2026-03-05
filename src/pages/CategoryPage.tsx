import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { getBooks, type SortOption } from '@/services/bookService';
import type { LanguageOption } from '@/types/LanguageOption';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

export const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const currentLang = i18n.language as LanguageOption;

  const formattedCategory =
    categoryName ?
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : null;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', categoryName, currentLang, sort],
    queryFn: () => {
      return getBooks(currentLang, formattedCategory, null, sort);
    },
  });

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={formattedCategory}
      />
    </Loader>
  );
};
