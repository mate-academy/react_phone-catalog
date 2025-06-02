import { useAppSelector } from '../../app/hooks';
import { ProductCart } from '../../components/cardItem/ProductCart';
import { Container } from '../../components/container/Container';
import { TitlePages } from '../HomePage/components/title/TitlePages';
import { PageNav } from './components/pageNav/PageNav';
import styles from './PhonePage.module.scss';

export const PhonePage = () => {
  const phones = useAppSelector(store => store.products.products)
  console.log(phones)
 

  return (<>
    <Container>
      <PageNav />
      <TitlePages type={'phones'} />

        <ProductCart products={phones } />


 </Container>

    </>)
};
