import { useAppSelector } from '../../../app/hooks';
import { ProductPage } from '../ProductPage';

const textContent = {
  title: {
    en: 'Accessories',
    ua: 'Аксесуари',
  },
};

export const Accessories = () => {
  const { productList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  const accessories = productList.filter(
    product => product.category === 'accessories',
  );

  return (
    <ProductPage list={accessories} pageTitle={textContent.title[language]} />
  );
};
