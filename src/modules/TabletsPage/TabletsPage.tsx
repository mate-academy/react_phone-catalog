import { useTranslation } from 'react-i18next';
import ProductList from '../../components/ProductList/ProductList';

const TabletsPage = () => {
  const { t } = useTranslation();

  return <ProductList filter="tablets" h1={t('tablets')} />;
};

export default TabletsPage;
