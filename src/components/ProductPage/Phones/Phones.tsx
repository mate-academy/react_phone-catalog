import { useAppSelector } from '../../../app/hooks';
import { ProductPage, ProductPageOrigin } from '../ProductPage';

export const Phones = () => {
  const { productList } = useAppSelector(st => st.products);

  const phones = productList.filter(product => product.category === 'phones');

  return <ProductPage origin={ProductPageOrigin.PHONES} list={phones} />;
};
