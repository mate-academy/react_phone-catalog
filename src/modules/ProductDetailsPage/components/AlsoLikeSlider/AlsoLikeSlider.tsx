import { useTranslation } from 'react-i18next';
import { useProducts } from '../../../../hooks/context/useProducts';
import { ProductSlider } from '../../../shared/components/ProductSlider';
import { useGetProductDetails } from '../../hooks/useGetProductDetails';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';

export const AlsoLikeSlider = () => {
  const { products, loading } = useProducts();
  const { product } = useGetProductDetails();
  const { t } = useTranslation();

  let recomendetProduct = products;

  if (product) {
    recomendetProduct = getSuggestedProducts(products, product);
  }

  return (
    <ProductSlider
      title={t('details_page.also_like_title')}
      products={recomendetProduct}
      cardCount={20}
      saleVisidle={true}
      loading={loading}
    />
  );
};
