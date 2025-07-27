import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useProducts } from '../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const TabletsPage = () => {
  const { t } = useTranslation('tabletpage');

  const tablets = useProducts().filter(
    product => product.category === 'tablets',
  );

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{t('title')}</h2>

      <ProductsList products={tablets} />
    </div>
  );
};
