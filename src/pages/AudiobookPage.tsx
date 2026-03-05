import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useSortBooks } from '@/hooks/useSortBooks';

export const AudiobookPage = () => {
  const { t } = useTranslation();
  const { data: books = [], isLoading } = useSortBooks('audiobook');

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.audiobooks')}
      />
    </Loader>
  );
};
