import ProductSlider from '../../../../components/ProductSlider/ProductSlider';
import { useAppSelector } from '../../../../api/hooks';
import { useTranslation } from 'react-i18next';

const HotPrices = () => {
  const products = useAppSelector(state => state.products.listOfproducts);
  const { t } = useTranslation();

  return (
    <ProductSlider
      title={t('h2Hot')}
      products={[...products]
        .sort(
          (el1, el2) => el2.fullPrice - el2.price - (el1.fullPrice - el1.price),
        )
        .slice(0, 12)}
    />
  );
};

export default HotPrices;
