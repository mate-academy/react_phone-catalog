import ProductSlider from '../../../../components/ProductSlider/ProductSlider';
import { useAppSelector } from '../../../../api/hooks';
import { useTranslation } from 'react-i18next';

const BrandNew = () => {
  const { t } = useTranslation();
  const products = useAppSelector(state => state.products.listOfproducts)
    .filter(el => el.year > 2020)
    .slice(0, 12);

  return <ProductSlider title={t('h2Brands')} products={products} />;
};

export default BrandNew;
