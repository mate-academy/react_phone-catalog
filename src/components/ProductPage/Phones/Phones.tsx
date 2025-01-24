import { useAppSelector } from '../../../app/hooks';
import { ProductPage } from '../ProductPage';

const textContent = {
  title: {
    en: 'Mobile phones',
    ua: 'Мобільні телефони',
  },
};

export const Phones = () => {
  const { productList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  const phones = productList.filter(product => product.category === 'phones');

  return <ProductPage list={phones} pageTitle={textContent.title[language]} />;
};
