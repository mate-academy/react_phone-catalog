import { useAppSelector } from '../../../app/hooks';
import { ProductPage, ProductPageOrigin } from '../ProductPage';

export const Accessories = () => {
  const { productList } = useAppSelector(st => st.products);

  const accessories = productList.filter(
    product => product.category === 'accessories',
  );

  return (
    <ProductPage origin={ProductPageOrigin.ACCESSORIES} list={accessories} />
  );
};
