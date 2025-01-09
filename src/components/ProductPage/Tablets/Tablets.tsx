import { useAppSelector } from '../../../app/hooks';
import { ProductPage, ProductPageOrigin } from '../ProductPage';

export const Tablets = () => {
  const { productList } = useAppSelector(st => st.products);

  const tablets = productList.filter(product => product.category === 'tablets');

  return <ProductPage origin={ProductPageOrigin.TABLETS} list={tablets} />;
};
