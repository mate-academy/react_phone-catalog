import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useSortBooks } from '@/hooks/useSortBooks';

export const KindlePage = () => {
  const { t } = useTranslation();
  const { data: books = [], isLoading } = useSortBooks('kindle');

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.kindle')}
      />
    </Loader>
  );
};
