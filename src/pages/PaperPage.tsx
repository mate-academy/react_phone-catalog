import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useSortBooks } from '@/hooks/useSortBooks';
import { useTranslation } from 'react-i18next';

export const PaperPage = () => {
  const { t } = useTranslation();
  const { data: books = [], isLoading } = useSortBooks('paperback');

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.paper')}
      />
    </Loader>
  );
};
