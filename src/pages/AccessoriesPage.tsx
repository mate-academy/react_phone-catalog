import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductsList } from '../components/ProductsList';
import { useProducts } from '../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage = () => {
  const { t } = useTranslation('accessoriespage');

  const accessories = useProducts().filter(
    product => product.category === 'accessories',
  );

  return (
    <div>
      <Breadcrumbs />

      <h2 className="mt-6 mb-2 tablet:mt-10">{t('title')}</h2>

      <ProductsList products={accessories} />
    </div>
  );
};
