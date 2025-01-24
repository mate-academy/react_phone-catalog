import { useAppSelector } from '../../../app/hooks';
import { ProductPage } from '../ProductPage';

const textContent = {
  title: {
    en: 'Tablets',
    ua: 'Планшети',
  },
};

export const Tablets = () => {
  const { productList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  const tablets = productList.filter(product => product.category === 'tablets');

  return <ProductPage list={tablets} pageTitle={textContent.title[language]} />;
};
