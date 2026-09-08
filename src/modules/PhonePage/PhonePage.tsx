import { useTranslation } from 'react-i18next';
import ProductList from '../../components/ProductList/ProductList';

const PhonePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <ProductList filter="phones" h1={t('mobiles')} />
    </>
  );
};

export default PhonePage;
