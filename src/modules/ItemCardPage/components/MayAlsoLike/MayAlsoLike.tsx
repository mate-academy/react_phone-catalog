import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../api/hooks';
import ProductSlider from '../../../../components/ProductSlider/ProductSlider';

const MayAlsoLike = () => {
  const products = useAppSelector(state => state.products.listOfproducts);
  const { t } = useTranslation();

  return (
    <ProductSlider
      title={t('h2AlsoLike')}
      products={[...products].sort(() => Math.random() - 0.5).slice(0, 12)}
    />
  );
};

export default MayAlsoLike;
