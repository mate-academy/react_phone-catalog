import { useTranslation } from 'react-i18next';
import ProductList from '../../components/ProductList/ProductList';

const AccessoriesPage = () => {
  const { t } = useTranslation();

  return <ProductList filter="accessories" h1={t('accessors')} />;
};

export default AccessoriesPage;
